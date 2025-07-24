// src/components/Hero.jsx
import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import ScrambledText from "./ScrambledText";
import GlassHeader from "./GlassHeader";
import TargetCursor from "./TargetCursor";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const isIOS = () =>
  typeof window !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
  !window.MSStream;

const Hero = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const headlineRef = useRef(null);

  const [videoReady, setVideoReady] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(videoRef.current, { scale: 1.5, ease: "none", transformOrigin: "center center" }, 0)
        .to(headlineRef.current, { yPercent: -20, opacity: 0, ease: "none" }, 0.1)
        .to(containerRef.current, { opacity: 0, ease: "none" }, 0.9);

      gsap.from("#next-section", {
        scrollTrigger: { trigger: "#next-section", start: "top 80%" },
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "easeOut",
        clearProps: "all",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (isIOS()) {
      v.setAttribute("playsinline", "");
      v.setAttribute("webkit-playsinline", "true");
      v.removeAttribute("controls");
    }

    const onCanPlay = () => {
      setVideoReady(true);
      v.play().catch(() => setNeedsTap(true));
    };
    const onError = (e) => {
      console.error("Video error:", e);
      setVideoReady(false);
      setNeedsTap(true);
    };

    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("error", onError);

    v.play().catch(() => setNeedsTap(true));

    return () => {
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("error", onError);
    };
  }, []);

  const handleTapToPlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play()
      .then(() => {
        setNeedsTap(false);
        setVideoReady(true);
      })
      .catch((e) => {
        console.error("Play error:", e);
        setVideoReady(false);
      });
  };

  return (
    <div ref={containerRef} className="hero relative w-full min-h-screen overflow-hidden text-white">
      <TargetCursor spinDuration={2} hideDefaultCursor={false} />
      <GlassHeader />

      {/* Fallback BG while video loads */}
      <div
        className={`absolute inset-0 -z-10 transition-opacity duration-500 ${
          videoReady ? "opacity-0" : "opacity-100"
        }`}
        style={{ background: "black" }}
      />

      {/* Video background */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover -z-10 pointer-events-none will-change-transform transition-opacity duration-500 ${
          videoReady ? "opacity-100" : "opacity-0"
        }`}
        preload="auto"
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/video/poster.jpg"
        webkit-playsinline="true"
        crossOrigin="anonymous"
      >
        <source src="/assets/video/bg.mp4" type="video/mp4" />
      </video>

      {/* Tap to play overlay for iOS */}
      {needsTap && (
        <div
          className="absolute inset-0 z-0 flex items-center justify-center bg-black/50"
          onClick={handleTapToPlay}
        >
          <button className="text-white text-lg">Tap to Play</button>
        </div>
      )}

      {/* Headline */}
      <section className="relative z-10 flex flex-col justify-center min-h-screen px-4 -mt-10 md:px-12">
        <ScrambledText
          ref={headlineRef}
          className="scrambled-text-demo mb-8 max-w-4xl text-base md:text-xl leading-snug will-change-transform"
          radius={100}
          duration={1.2}
          speed={0.5}
          scrambleChars=".:"
        >
          <h1
            className="
              font-bold uppercase !text-white/90
              leading-[0.85] md:leading-[0.9]
              text-[24vw] sm:text-[20vw] md:text-[12vw] lg:text-[9rem]
              text-left break-normal md:break-words hyphens-none
            "
          >
            <span
              className="
                cursor-target
                flex md:inline
                items-baseline
                gap-0
                mb-0 md:mb-14
                whitespace-nowrap
              "
            >
              <span className="hidden md:inline">DREAM STAGE</span>
              <span className="hidden md:inline"> </span>
            </span>
            <span className="md:hidden sm:block">DREAM</span>
            <span className="md:hidden sm:block pb-10">STAGE</span>
            <span className="block md:inline whitespace-nowrap cursor-target">WHERE</span>{" "}
            <span className="block md:inline whitespace-nowrap cursor-target">DREAMS</span>{" "}
            <span className="block md:inline whitespace-nowrap cursor-target">COME</span>{" "}
            <span className="block md:inline whitespace-nowrap cursor-target">TRUE</span>
          </h1>
        </ScrambledText>
      </section>
    </div>
  );
};

export default Hero;