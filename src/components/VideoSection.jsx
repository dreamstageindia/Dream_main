import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

import GridGlowDistort from "./GridGlowDistort";

const isIOS = () =>
  typeof window !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
  !window.MSStream;

const VideoSection = ({
  videoSrc,
  imageSrc,
  words = [],
  pos = "lt",
  baseColor = "#fff",
  hoverColor = "#fff",
}) => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const blockRef = useRef(null);
  const videoRef = useRef(null); // Added for video control
  const [hover, setHover] = useState(false);

  const ios = isIOS();
  const isMobile = window.innerWidth <= 768;

  // Fade in/out on scroll with optimized IntersectionObserver
  useEffect(() => {
    const section = sectionRef.current;
    const text = blockRef.current;
    const video = videoRef.current;

    gsap.set(section, { autoAlpha: 0 });
    gsap.set(text, { autoAlpha: 0, y: 10 }); // Reduced y for faster animation

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(section, { autoAlpha: 1, duration: 0.4, ease: "power2.out" });
          gsap.to(text, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out", delay: 0.1 });
          if (video && !ios) video.play(); // Play video when visible
        } else {
          gsap.to(section, { autoAlpha: 0, duration: 0.3, ease: "power2.in" });
          gsap.to(text, { autoAlpha: 0, y: 10, duration: 0.3, ease: "power2.in" });
          if (video && !ios) video.pause(); // Pause video when not visible
        }
      },
      { threshold: 0.3, rootMargin: isMobile ? "-10% 0px" : "0px" } // Lower threshold
    );

    io.observe(section);
    return () => io.disconnect();
  }, [isMobile, ios]);

  const alignments = {
    lt: { place: "top-6 left-6", textAlign: "left" },
    rb: { place: "bottom-6 right-6", textAlign: "right" },
    lb: { place: "bottom-6 left-6", textAlign: "left" },
    rt: { place: "top-6 right-6", textAlign: "right" },
  };
  const { place, textAlign } = alignments[pos] || alignments.lt;

  return (
    <section
      ref={sectionRef}
      className="relative w-screen h-screen shrink-0 overflow-hidden text-white bg-black snap-start"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        {ios ? (
          <img
            src={imageSrc}
            alt="Background"
            className="w-full h-full object-cover"
            loading="lazy" // Lazy load images
          />
        ) : (
          <video
            ref={videoRef}
            src={videoSrc}
            className="w-full h-full object-cover"
            autoPlay={false} // Controlled by IntersectionObserver
            loop
            muted
            playsInline
            webkit-playsinline="true"
            preload="metadata" // Load metadata only
          />
        )}
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <GridGlowDistort glowCount={4} glowDur={1} /> {/* Reduced glowCount and glowDur */}
      </div>

      <div className="absolute inset-0 z-15 bg-black/30 pointer-events-none" /> {/* Lighter tint */}

      <div
        ref={containerRef}
        className="relative z-20 w-full h-full"
        onMouseEnter={() => !isMobile && setHover(true)}
        onMouseLeave={() => !isMobile && setHover(false)}
        onTouchStart={() => isMobile && setHover(true)}
        onTouchEnd={() => isMobile && setHover(false)}
      >

        <div
          ref={blockRef}
          className={`absolute ${place} px-6`}
          style={{
            color: baseColor,
            textAlign,
            textShadow: "0 0 6px rgba(0,0,0,0.5)", // Reduced shadow
          }}
        >
          <div
            className="font-semibold uppercase whitespace-nowrap"
            style={{
              fontSize: "clamp(1rem, 6vw, 4rem)", // Smaller font
              letterSpacing: "0.03em",
              wordSpacing: "0.08em",
            }}
          >
            {words.map((w, i) => (
              <div key={i} className="mb-1 whitespace-nowrap">
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