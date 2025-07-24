// src/components/PixelTransition.jsx
import React, { useRef, useEffect, useState, useMemo } from "react";
import { gsap } from "gsap";

function PixelTransition({
  firstContent,
  secondContent,
  /** Overrides or single value */
  gridSize,
  gridSizeMobile = 6,
  gridSizeTablet = 9,
  gridSizeDesktop = 12,
  pixelColor = "currentColor",
  animationStepDuration = 0.3,
  className = "",
  style = {},
}) {
  const containerRef = useRef(null);
  const pixelGridRef = useRef(null);
  const activeRef = useRef(null);
  const delayedCallRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  const isTouchDevice = useMemo(() => {
    if (typeof window === "undefined") return false;
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches
    );
  }, []);

  // Pick grid size responsively
  const currentGridSize = useMemo(() => {
    if (gridSize) return gridSize;
    if (typeof window === "undefined") return gridSizeDesktop;
    const w = window.innerWidth;
    if (w < 640) return gridSizeMobile; // sm
    if (w < 1024) return gridSizeTablet; // md/lg
    return gridSizeDesktop;
  }, [gridSize, gridSizeMobile, gridSizeTablet, gridSizeDesktop]);

  // Build pixels
  useEffect(() => {
    const pixelGridEl = pixelGridRef.current;
    if (!pixelGridEl) return;

    // Clear previous
    pixelGridEl.innerHTML = "";

    const size = 100 / currentGridSize;

    for (let row = 0; row < currentGridSize; row++) {
      for (let col = 0; col < currentGridSize; col++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixelated-image-card__pixel", "absolute", "hidden");
        pixel.style.backgroundColor = pixelColor;
        pixel.style.width = `${size}%`;
        pixel.style.height = `${size}%`;
        pixel.style.left = `${col * size}%`;
        pixel.style.top = `${row * size}%`;
        pixelGridEl.appendChild(pixel);
      }
    }
  }, [currentGridSize, pixelColor]);

  // Clean GSAP on unmount
  useEffect(() => {
    return () => {
      if (delayedCallRef.current) delayedCallRef.current.kill();
      gsap.killTweensOf(".pixelated-image-card__pixel");
    };
  }, []);

  const animatePixels = (activate) => {
    setIsActive(activate);

    const pixelGridEl = pixelGridRef.current;
    const activeEl = activeRef.current;
    if (!pixelGridEl || !activeEl) return;

    const pixels = pixelGridEl.querySelectorAll(".pixelated-image-card__pixel");
    if (!pixels.length) return;

    gsap.killTweensOf(pixels);
    if (delayedCallRef.current) delayedCallRef.current.kill();

    gsap.set(pixels, { display: "none" });

    const totalPixels = pixels.length;
    const staggerDuration = animationStepDuration / totalPixels;

    // Show pixels in random order
    gsap.to(pixels, {
      display: "block",
      duration: 0,
      stagger: { each: staggerDuration, from: "random" },
    });

    delayedCallRef.current = gsap.delayedCall(animationStepDuration, () => {
      activeEl.style.display = activate ? "block" : "none";
      activeEl.style.pointerEvents = activate ? "none" : "";
    });

    // Hide pixels again
    gsap.to(pixels, {
      display: "none",
      duration: 0,
      delay: animationStepDuration,
      stagger: { each: staggerDuration, from: "random" },
    });
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice && !isActive) animatePixels(true);
  };
  const handleMouseLeave = () => {
    if (!isTouchDevice && isActive) animatePixels(false);
  };
  const handleClick = () => {
    animatePixels(!isActive);
  };

  return (
    <div
      ref={containerRef}
      className={`
        ${className}
        bg-[#271E37]
        text-white
        rounded-[15px]
        relative overflow-hidden
        select-none
      `.trim()}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={isTouchDevice ? handleClick : undefined}
    >
      {/* “first” layer */}
      <div className="absolute inset-0 w-full h-full">{firstContent}</div>

      {/* “second” layer (hidden until toggled) */}
      <div
        ref={activeRef}
        className="absolute inset-0 w-full h-full z-[2]"
        style={{ display: "none" }}
      >
        {secondContent}
      </div>

      {/* Pixel grid overlay */}
      <div
        ref={pixelGridRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[3]"
      />
    </div>
  );
}

export default PixelTransition;
