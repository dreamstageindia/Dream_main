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

  const ios = isIOS();
  const fallbackImage = "/assets/image/cover.png";

  // GSAP pin + scrub with fade-in/fade-out
  useLayoutEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const ctx = gsap.context(() => {
      gsap.set(containerRef.current, { autoAlpha: 0 });
      gsap.to(containerRef.current, { autoAlpha: 1, duration: 0.6, ease: "power2.out" });

      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: isMobile ? "+=30%" : "+=200%",
            scrub: true,
            pin: true,
            anticipatePin: 1,
            onLeave: () => {
              gsap.to(containerRef.current, { autoAlpha: 0, duration: 0.4, ease: "power2.in" });
            },
            onEnterBack: () => {
              gsap.to(containerRef.current, { autoAlpha: 1, duration: 0.6, ease: "power2.out" });
            },
          },
        })
        .to(
          !ios ? videoRef.current : {},
          { scale: 1.5, ease: "none", transformOrigin: "center center" },
          0
        )
        .to(headlineRef.current, { yPercent: -20, opacity: 0, ease: "none" }, 0.1)
        .to(containerRef.current, { opacity: 0, ease: "none" }, 0.9);

        gsap.from("#next-section", {
          scrollTrigger: {
            trigger: "#next-section",
            start: "top 60%",
          },
          opacity: 0,
          y: 30,
          duration: 0.5, // Reduced from 1 to 0.5
          ease: "power2.out",
          clearProps: "all",
        });
    }, containerRef);

    return () => ctx.revert();
  }, [ios]);

  // Autoplay & tap-to-play logic
  useEffect(() => {
    if (ios) return;
    const v = videoRef.current;
    if (!v) return;
    const onCanPlay = () => {
      setVideoReady(true);
      v.play().catch(() => setNeedsTap(true));
    };
    const onError = (e) => {
      console.error("Video error:", e);
      setNeedsTap(true);
    };
    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("error", onError);
    v.play().catch(() => setNeedsTap(true));
    return () => {
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("error", onError);
    };
  }, [ios]);

  const handleTapToPlay = () => {
    if (ios) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play()
      .then(() => {
        setNeedsTap(false);
        setVideoReady(true);
      })
      .catch((e) => console.error("Play error:", e));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden text-white"
      onClick={handleTapToPlay}
      onTouchStart={handleTapToPlay}
    >
      <TargetCursor spinDuration={2} hideDefaultCursor={false} className="hidden md:block" />
      <GlassHeader />

      {/* Background: static image on iOS, video elsewhere */}
      {ios ? (
        <img
          src={fallbackImage}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
      ) : (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover -z-10 will-change-transform transition-opacity duration-500 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          preload="auto"
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          crossOrigin="anonymous"
          poster={fallbackImage}
        >
          <source src="/assets/video/stage/stage3.mp4" type="video/mp4" />
        </video>
      )}

      <section className="relative z-10 flex flex-col justify-center min-h-screen px-4 -mt-10 md:px-12">
        <ScrambledText
          ref={headlineRef}
          className="scrambled-text-demo mb-8 max-w-4xl text-base md:text-xl leading-snug will-change-transform"
          radius={100}
          duration={1.2}
          speed={0.5}
          scrambleChars=".:"
        >
          <h1 className="font-bold uppercase !text-white/90 leading-[0.85] md:leading-[0.9] text-[24vw] sm:text-[20vw] md:text-[12vw] lg:text-[9rem] text-left break-normal md:break-words hyphens-none">
            <span className="cursor-target flex md:inline items-baseline gap-0 mb-0 md:mb-14 whitespace-nowrap">
              <span className="hidden md:inline">DREAM STAGE</span>
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
