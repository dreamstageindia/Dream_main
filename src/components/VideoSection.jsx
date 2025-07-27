// src/components/VideoSection.jsx
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Crosshair from "./Crosshair";
import GridGlowDistort from "./GridGlowDistort";

const isIOS = () =>
  typeof window !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
  !window.MSStream;

const VideoSection = ({
  videoSrc,
  imageSrc,
  words = [],
  pos = "lt",            // "lt" | "rb" | "lb" | "rt"
  baseColor = "#fff",
  hoverColor = "#fff",
}) => {
  const sectionRef   = useRef(null);
  const containerRef = useRef(null);
  const blockRef     = useRef(null);
  const [hover, setHover] = useState(false);

  const ios      = isIOS();
  const isMobile = window.innerWidth <= 768;

  // Fade in/out on scroll
  useEffect(() => {
    const section = sectionRef.current;
    const text    = blockRef.current;

    gsap.set(section, { autoAlpha: 0 });
    gsap.set(text,    { autoAlpha: 0, y: 20 });

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(section, { autoAlpha: 1, duration: 0.6, ease: "power2.out" });
          gsap.to(text,    { autoAlpha: 1, y: 0,    duration: 0.6, ease: "power2.out", delay: 0.2 });
        } else {
          gsap.to(section, { autoAlpha: 0, duration: 0.4, ease: "power2.in" });
          gsap.to(text,    { autoAlpha: 0, y: 20,   duration: 0.4, ease: "power2.in" });
        }
      },
      { threshold: 0.5, rootMargin: isMobile ? "-20% 0px" : "0px" }
    );

    io.observe(section);
    return () => io.disconnect();
  }, [isMobile]);

  // Alignment presets
  const alignments = {
    lt: { place: "top-6 left-6",     textAlign: "left"  },
    rb: { place: "bottom-6 right-6", textAlign: "right" },
    lb: { place: "bottom-6 left-6",  textAlign: "left"  },
    rt: { place: "top-6 right-6",    textAlign: "right" },
  };
  const { place, textAlign } = alignments[pos] || alignments.lt;

  return (
    <section
      ref={sectionRef}
      className="relative w-screen h-screen shrink-0 overflow-hidden text-white bg-black snap-start"
    >
      {/* Background: image on iOS, video elsewhere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {ios ? (
          <img
            src={imageSrc}
            alt="Background"
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

      {/* Grid glow overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <GridGlowDistort />
      </div>

      {/* Dark tint */}
      <div className="absolute inset-0 z-15 bg-black/40 pointer-events-none" />

      {/* Interactive text & crosshair */}
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
          className={`absolute ${place} px-6`}
          style={{
            color: baseColor,
            textAlign,
            textShadow: "0 0 8px rgba(0,0,0,0.55)",
          }}
        >
          <div
            className="font-semibold uppercase whitespace-nowrap"
            style={{
              fontSize: "clamp(1.2rem, 7vw, 5rem)",
              letterSpacing: "0.04em",
              wordSpacing: "0.1em",
            }}
          >
            {words.map((w, i) => (
              <div key={i} className="mb-2 whitespace-nowrap">
                {w}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
