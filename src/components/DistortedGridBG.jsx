import React, { useRef, useEffect, useMemo } from "react";
import { gsap } from "gsap";

const DistortedGridBG = ({
  cell = 60,
  lineColor = "rgba(255,255,255,0.08)",
  highlightColor = "#ffffff",          // mouse hover square color
  shimmerCount = 36,                    // how many glowing cells to animate
  shimmerDuration = 2.2,                // seconds each glow
  shimmerDelayMax = 4,                  // random delay range
  gradients = [
    "linear-gradient(135deg, #fff5 0%, #ffffff 50%, #fff5 100%)",
    "linear-gradient(135deg, #ffe29f 0%, #ff9fd1 50%, #7ad7ff 100%)",
    "linear-gradient(135deg, #2afadf 0%, #4c83ff 100%)",
  ],
}) => {
  const wrapRef = useRef(null);
  const hoverRef = useRef(null);
  const tilesRef = useRef([]);

  // build tile positions once
  const tiles = useMemo(() => {
    // generate shimmerCount random cells (x,y)
    const arr = [];
    for (let i = 0; i < shimmerCount; i++) {
      arr.push({
        id: i,
        x: 0,
        y: 0,
        grad: gradients[i % gradients.length],
      });
    }
    return arr;
  }, [shimmerCount, gradients]);

  // position random tiles on mount/resize
  useEffect(() => {
    const placeTiles = () => {
      const el = wrapRef.current;
      if (!el) return;
      const { width, height } = el.getBoundingClientRect();
      tiles.forEach((t, idx) => {
        const cols = Math.floor(width / cell);
        const rows = Math.floor(height / cell);
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

    placeTiles();
    window.addEventListener("resize", placeTiles);
    return () => window.removeEventListener("resize", placeTiles);
  }, [cell, tiles]);

  // shimmer animation
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

  // mouse hover square (snap to grid)
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

    const leave = () => {
      hoverEl.style.transform = `translate(-9999px, -9999px)`;
    };

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);

    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [cell]);

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 bg-black overflow-hidden -z-10"
      style={{ userSelect: "none" }}
    >
      {/* static grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, ${lineColor} 0px, ${lineColor} 1px, transparent 1px, transparent ${cell}px),
            repeating-linear-gradient(90deg, ${lineColor} 0px, ${lineColor} 1px, transparent 1px, transparent ${cell}px)
          `,
        }}
      />

      {/* shimmer tiles */}
      {tiles.map((t, i) => (
        <div
          key={t.id}
          ref={(el) => (tilesRef.current[i] = el)}
          className="absolute pointer-events-none"
          style={{
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

      {/* hover cell */}
      <div
        ref={hoverRef}
        className="absolute pointer-events-none transition-transform duration-75"
        style={{
          left: 0,
          top: 0,
          width: `${cell}px`,
          height: `${cell}px`,
          background: highlightColor,
          mixBlendMode: "difference",
          transform: "translate(-9999px, -9999px)",
        }}
      />
    </div>
  );
};

export default DistortedGridBG;
