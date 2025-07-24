// src/components/VideoSection.jsx
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Crosshair from "./Crosshair";
import GridGlowDistort from "./GridGlowDistort";

const VideoSection = ({
  videoSrc,
  imageSrc,
  words = [],
  pos = "lt",       // "lt" | "rb" | "lb" | "rt"
  baseColor = "#fff",
  hoverColor = "#fff",
}) => {
  const sectionRef   = useRef(null);
  const containerRef = useRef(null);
  const blockRef     = useRef(null);
  const [hover, setHover] = useState(false);

  const alignments = {
    lt: { place: "top-6 left-6",     textAlign: "left"  },
    rb: { place: "bottom-6 right-6", textAlign: "right" },
    lb: { place: "bottom-6 left-6",  textAlign: "left"  },
    rt: { place: "top-6 right-6",    textAlign: "right" },
  };
  const { place, textAlign } = alignments[pos] || alignments.lt;

  useEffect(() => {
    const card = blockRef.current;
    gsap.set(card, { autoAlpha: 0, y: 20 });
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(card, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" });
        } else {
          gsap.to(card, { autoAlpha: 0, y: 20, duration: 0.4, ease: "power2.in" });
        }
      },
      { threshold: 0.5 }
    );
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-screen h-screen shrink-0 overflow-hidden text-white bg-black"
    >
      {/* background: video on desktop, image on mobile */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          src={videoSrc}
          className="hidden sm:block w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
        />
        <img
          src={imageSrc}
          alt=""
          className="block sm:hidden w-full h-full object-cover"
        />
      </div>

      {/* grid glow only on desktop */}
      <div className="hidden sm:block absolute inset-0 z-10 pointer-events-none">
        <GridGlowDistort />
      </div>

      {/* tint */}
      <div className="absolute inset-0 z-15 bg-black/40 pointer-events-none" />

      {/* interactive text */}
      <div
        ref={containerRef}
        className="relative z-20 w-full h-full"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onTouchStart={() => setHover(true)}
        onTouchEnd={() => setHover(false)}
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
