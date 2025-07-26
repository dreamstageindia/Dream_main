import React, { useRef, useEffect, useMemo } from "react";
import { gsap } from "gsap";

// Throttle helper
const throttle = (fn, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const DistortedGridBG = ({
  cell = 60,
  lineColor = "rgba(255,255,255,0.08)",
  highlightColor = "#ffffff",
  shimmerCount = 36,
  shimmerDuration = 2.2,
  shimmerDelayMax = 4,
  gradients = [
    "linear-gradient(135deg, #fff5 0%, #ffffff 50%, #fff5 100%)",
    "linear-gradient(135deg, #ffe29f 0%, #ff9fd1 50%, #7ad7ff 100%)",
    "linear-gradient(135deg, #2afadf 0%, #4c83ff 100%)",
  ],
}) => {
  const wrapRef = useRef(null);
  const hoverRef = useRef(null);
  const tilesRef = useRef([]);

  const tiles = useMemo(() => {
    return Array.from({ length: shimmerCount }).map((_, i) => ({
      id: i,
      x: 0,
      y: 0,
      grad: gradients[i % gradients.length],
    }));
  }, [shimmerCount, gradients]);

  // Position shimmer tiles
  useEffect(() => {
    const placeTiles = () => {
      const el = wrapRef.current;
      if (!el) return;
      const { width, height } = el.getBoundingClientRect();
      const cols = Math.floor(width / cell);
      const rows = Math.floor(height / cell);

      tiles.forEach((t, idx) => {
        const rx = Math.floor(Math.random() * cols) * cell;
        const ry = Math.floor(Math.random() * rows) * cell;
        t.x = rx;
        t.y = ry;
        const tileEl = tilesRef.current[idx];
        if (tileEl) {
          tileEl.style.transform = `translate(${rx}px, ${ry}px)`;
        }
      });
    };

    const throttledResize = throttle(placeTiles, 100);
    placeTiles();
    window.addEventListener("resize", throttledResize);
    return () => window.removeEventListener("resize", throttledResize);
  }, [cell, tiles]);

  // GSAP shimmer animation
  useEffect(() => {
    tilesRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: 0 });
      const tl = gsap.timeline({ repeat: -1, repeatDelay: Math.random() * 5 });
      tl.to(el, {
        opacity: 1,
        duration: shimmerDuration * 0.4,
        ease: "power2.out",
        delay: Math.random() * shimmerDelayMax,
      }).to(el, {
        opacity: 0,
        duration: shimmerDuration * 0.6,
        ease: "power2.in",
      });
    });
  }, [shimmerDuration, shimmerDelayMax, tiles]);

  // Mouse hover square
  useEffect(() => {
    const el = wrapRef.current;
    const hoverEl = hoverRef.current;
    if (!el || !hoverEl) return;

    const move = (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      const snapX = Math.floor(relX / cell) * cell;
      const snapY = Math.floor(relY / cell) * cell;
      hoverEl.style.transform = `translate(${snapX}px, ${snapY}px)`;
    };

    const throttledMove = throttle(move, 50);

    const leave = () => {
      hoverEl.style.transform = `translate(-9999px, -9999px)`;
    };

    el.addEventListener("mousemove", throttledMove);
    el.addEventListener("mouseleave", leave);

    return () => {
      el.removeEventListener("mousemove", throttledMove);
      el.removeEventListener("mouseleave", leave);
    };
  }, [cell]);

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 bg-black overflow-hidden -z-10"
      style={{ userSelect: "none" }}
    >
      {/* Grid Lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, ${lineColor} 0px, ${lineColor} 1px, transparent 1px, transparent ${cell}px),
            repeating-linear-gradient(90deg, ${lineColor} 0px, ${lineColor} 1px, transparent 1px, transparent ${cell}px)
          `,
        }}
      />

      {/* Shimmer Tiles */}
      {tiles.map((t, i) => (
        <div
          key={t.id}
          ref={(el) => (tilesRef.current[i] = el)}
          className="absolute pointer-events-none"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: `${cell}px`,
            height: `${cell}px`,
            backgroundImage: t.grad,
            opacity: 0,
            filter: "blur(1px)",
            mixBlendMode: "screen",
          }}
        />
      ))}

      {/* Hover Cell */}
      <div
        ref={hoverRef}
        className="absolute pointer-events-none transition-transform duration-75"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: `${cell}px`,
          height: `${cell}px`,
          background: highlightColor,
          mixBlendMode: "difference",
          transform: "translate(-9999px, -9999px)",
          willChange: "transform",
        }}
      />
    </div>
  );
};

export default DistortedGridBG;