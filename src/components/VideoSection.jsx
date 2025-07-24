// src/components/VideoSection.jsx
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Crosshair from "./Crosshair";
import GridGlowDistort from "./GridGlowDistort";

const VideoSection = ({
  videoSrc,
  words = [],
  pos = "lt",            // "lt" | "rb" | "lb" | "rt"
  baseColor = "#ffffff",
  hoverColor = "#ffffff",
  showTint = false,      // <- keep as prop if you ever want it back
  tintClass = "bg-black/40", // customizable
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
    const el   = sectionRef.current;
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

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-screen h-screen shrink-0 overflow-hidden text-white bg-black"
    >
      {/* Video */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          src={videoSrc}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
        />
      </div>

      {/* Grid glow */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <GridGlowDistort />
      </div>

      {/* (Optional) tint overlay */}
      {showTint && (
        <div className={`absolute inset-0 z-15 ${tintClass} pointer-events-none`} />
      )}

      {/* Interactive + text */}
      <div
        ref={containerRef}
        className="relative z-20 w-full h-full"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onTouchStart={() => setHover(true)}
        onTouchEnd={() => setHover(false)}
      >
        <Crosshair containerRef={containerRef} color={hover ? hoverColor : baseColor} />

        {/* TEXT ONLY */}
        <div
          ref={blockRef}
          className={`absolute ${place} w-[90vw] max-w-[120vw] max-h-[calc(100vh-3rem)] overflow-hidden`}
          style={{
            color: baseColor,
            textAlign,
            textShadow: "0 0 8px rgba(0,0,0,0.55)",
          }}
        >
          <div className="overflow-y-auto overscroll-contain pr-1 custom-scrollbar">
            <div
              className="font-semibold uppercase break-words hyphens-auto leading-[1.05] sm:leading-[0.95]"
              style={{
                fontSize: "clamp(1.8rem, 9.75vw, 7.5rem)",
                letterSpacing: "0.035em",
                wordSpacing: "0.08em",
                wordBreak: "break-word",
                textWrap: "balance",
              }}
            >
              {words.map((w, i) => (
                <div key={i} className="whitespace-normal overflow-visible mb-[0.2em]">
                  {w}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
