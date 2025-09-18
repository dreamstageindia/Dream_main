import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import GridGlowDistort from "./GridGlowDistort";

const isIOS = () =>
  typeof window !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
  !window.MSStream;

const VideoSection = ({
  videoSrc,   // e.g. "/assets/video/1.webm"
  imageSrc,
  words = [],
  pos = "lt",
  baseColor = "#fff",
}) => {
  const sectionRef = useRef(null);
  const blockRef = useRef(null);
  const videoRef = useRef(null);

  const ios = isIOS();
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  // play/pause intent (set by IO)
  const [shouldPlay, setShouldPlay] = useState(false);

  // loading state + fallback
  const [isLoaded, setIsLoaded] = useState(false);
  const [useImageFallback, setUseImageFallback] = useState(false);

  // derive mp4 alt path if available (same name, .mp4). If you don’t have mp4s, keep only webm <source>.
  const mp4Src = videoSrc.replace(/\.webm(\?.*)?$/i, ".mp4$1");

  // --- Visibility / fade-in animation (text + section) ---
  useEffect(() => {
    const section = sectionRef.current;
    const text = blockRef.current;

    gsap.set(section, { autoAlpha: 0 });
    gsap.set(text, { autoAlpha: 0, y: 10 });

    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setShouldPlay(visible);

        if (visible) {
          gsap.to(section, { autoAlpha: 1, duration: 0.35, ease: "power2.out" });
          gsap.to(text, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out", delay: 0.06 });
        } else {
          gsap.to(section, { autoAlpha: 0, duration: 0.25, ease: "power2.in" });
          gsap.to(text, { autoAlpha: 0, y: 10, duration: 0.25, ease: "power2.in" });
        }
      },
      { threshold: 0.55, rootMargin: isMobile ? "-10% 0px" : "0px" }
    );

    io.observe(section);
    return () => io.disconnect();
  }, [isMobile]);

  // --- Media control with watchdog/retry ---
  const playLock = useRef(false);
  const watchdogId = useRef(0);
  const retries = useRef(0);

  useEffect(() => {
    if (ios || useImageFallback) return;
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "true");

    // event handlers
    const onLoadedData = () => {
      setIsLoaded(true);
      retries.current = 0;
      if (shouldPlay) tryPlay();
    };
    const onCanPlay = () => setIsLoaded(true);
    const onStalled = () => kickRetry("stalled");
    const onError = () => kickRetry("error");
    const onEmptied = () => kickRetry("emptied");

    v.addEventListener("loadeddata", onLoadedData);
    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("stalled", onStalled);
    v.addEventListener("error", onError);
    v.addEventListener("emptied", onEmptied);

    // visibility tab swaps sometimes suspend decode
    const onVisibility = () => {
      if (document.visibilityState === "visible" && shouldPlay) {
        kickRetry("visibility");
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // watchdog: if we intend to play but nothing is visible in time, fallback to image
    const armWatchdog = () => {
      clearTimeout(watchdogId.current);
      if (!shouldPlay) return;
      watchdogId.current = window.setTimeout(() => {
        if (!isLoaded || v.readyState < 2) {
          if (retries.current >= 2) {
            setUseImageFallback(true); // graceful degrade
          } else {
            kickRetry("watchdog");
          }
        }
      }, 2500); // 2.5s is a good compromise
    };

    const tryPlay = async () => {
      if (!shouldPlay) return;
      if (playLock.current) return;
      if (v.readyState < 2) v.load(); // ensure buffers
      playLock.current = true;
      try {
        await v.play(); // may throw on autoplay policy—safe to ignore
      } catch (_) {
        // ignore; user gesture or retry will fix
      } finally {
        playLock.current = false;
      }
    };

    function kickRetry(reason) {
      if (useImageFallback) return;
      // small capped retry loop
      if (retries.current < 2) {
        retries.current += 1;
        // reload same sources & seek a tiny offset (nudges decoder)
        const t = Math.min(v.currentTime + 0.001, 0.001);
        v.load();
        v.currentTime = t;
        setIsLoaded(false);
        if (shouldPlay) tryPlay();
        armWatchdog();
      } else {
        setUseImageFallback(true);
      }
    }

    // act on current intent
    if (shouldPlay) {
      if (v.readyState >= 2) {
        setIsLoaded(true);
        tryPlay();
      } else {
        v.load();
        armWatchdog();
      }
    } else {
      clearTimeout(watchdogId.current);
      if (!playLock.current && !v.paused) v.pause();
    }

    return () => {
      clearTimeout(watchdogId.current);
      document.removeEventListener("visibilitychange", onVisibility);
      v.removeEventListener("loadeddata", onLoadedData);
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("stalled", onStalled);
      v.removeEventListener("error", onError);
      v.removeEventListener("emptied", onEmptied);
    };
  }, [shouldPlay, ios, useImageFallback, isLoaded]);

  const alignments = {
    lt: { place: "top-6 left-6", textAlign: "left" },
    rb: { place: "bottom-6 right-6", textAlign: "right" },
    lb: { place: "bottom-6 left-6", textAlign: "left" },
    rt: { place: "top-6 right-6", textAlign: "right" },
  };
  const { place, textAlign } = alignments[pos] || alignments.lt;

  return (
    <section ref={sectionRef} className="relative w-screen h-screen shrink-0 overflow-hidden text-white bg-black snap-start">
      {/* Media layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {ios || useImageFallback ? (
          <img src={imageSrc} alt="" className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <video
            ref={videoRef}
            className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            loop
            muted
            playsInline
            preload="auto"
            poster={imageSrc}            // visible until frames decode
            crossOrigin="anonymous"
          >
            {/* Prefer WebM, fall back to MP4 (if present) */}
            <source src={videoSrc} type="video/webm" />
            {/* comment this line if you don't have mp4 assets */}
            <source src={mp4Src} type="video/mp4" />
          </video>
        )}
      </div>

      {/* FX + tint */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <GridGlowDistort glowCount={4} glowDur={1} />
      </div>
      <div className="absolute inset-0 z-15 bg-black/30 pointer-events-none" />

      {/* Copy */}
      <div className="relative z-20 w-full h-full">
        <div
          ref={blockRef}
          className={`absolute ${place} px-6`}
          style={{ color: baseColor, textAlign, textShadow: "0 0 6px rgba(0,0,0,0.5)" }}
        >
          <div
            className="font-semibold uppercase whitespace-nowrap"
            style={{ fontSize: "clamp(1rem, 6vw, 4rem)", letterSpacing: "0.03em", wordSpacing: "0.08em" }}
          >
            {words.map((w, i) => (
              <div key={i} className="mb-1 whitespace-nowrap">{w}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
