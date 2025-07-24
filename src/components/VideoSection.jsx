import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Crosshair from "./Crosshair";
import GridGlowDistort from "./GridGlowDistort";

const VideoSection = ({
  videoSrc,
  imageSrc,
  words = [],
  pos = "lt", // "lt" | "rb" | "lb" | "rt"
  baseColor = "#fff",
  hoverColor = "#fff",
}) => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const blockRef = useRef(null);
  const [hover, setHover] = useState(false);
  const isMobile = window.innerWidth <= 768; // Mobile breakpoint

  const alignments = {
    lt: { place: "top-6 left-6", textAlign: "left" },
    rb: { place: "bottom-6 right-6", textAlign: "right" },
    lb: { place: "bottom-6 left-6", textAlign: "left" },
    rt: { place: "top-6 right-6", textAlign: "right" },
  };
  const { place, textAlign } = alignments[pos] || alignments.lt;

  useEffect(() => {
    const section = sectionRef.current;
    const text = blockRef.current;

    // Initialize section and text as invisible
    gsap.set(section, { autoAlpha: 0 });
    gsap.set(text, { autoAlpha: 0, y: 20 });

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Fade in section and text
          gsap.to(section, { autoAlpha: 1, duration: 0.6, ease: "power2.out" });
          gsap.to(text, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.2 });
        } else {
          // Fade out section and text
          gsap.to(section, { autoAlpha: 0, duration: 0.4, ease: "power2.in" });
          gsap.to(text, { autoAlpha: 0, y: 20, duration: 0.4, ease: "power2.in" });
        }
      },
      { threshold: 0.5, rootMargin: isMobile ? "-20% 0px" : "0px" }
    );
    io.observe(section);
    return () => io.disconnect();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative w-screen h-screen shrink-0 overflow-hidden text-white bg-black snap-start sticky top-0"
    >
      {/* background: image on mobile, video on desktop */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {isMobile ? (
          <img
            src={imageSrc}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <video
            src={videoSrc}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            webkit-playsinline="true"
          />
        )}
      </div>

      {/* grid glow on all devices */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <GridGlowDistort />
      </div>

      {/* tint */}
      <div className="absolute inset-0 z-15 bg-black/40 pointer-events-none" />

      {/* interactive text */}
      <div
        ref={containerRef}
        className="relative z-20 w-full h-full"
        onMouseEnter={() => !isMobile && setHover(true)}
        onMouseLeave={() => !isMobile && setHover(false)}
        onTouchStart={() => isMobile && setHover(true)}
        onTouchEnd={() => isMobile && setHover(false)}
      >
        <Crosshair containerRef={containerRef} color={hover ? hoverColor : baseColor} />
        <div
          ref={blockRef}
          className={`absolute ${place} w-[70vw] max-w-[70vw]`}
          style={{
            color: baseColor,
            textAlign,
            textShadow: "0 0 8px rgba(0,0,0,0.55)",
          }}
        >
          <div
            className="font-semibold uppercase break-words hyphens-auto"
            style={{
              fontSize: "clamp(1.2rem, 7vw, 5rem)",
              letterSpacing: "0.04em",
              wordSpacing: "0.1em",
              textAlign,
            }}
          >
            {words.map((w, i) => (
              <div key={i} className="mb-2">{w}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;