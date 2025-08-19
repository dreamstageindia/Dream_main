// src/components/BigBlockText.jsx
import React, { useRef, useState, useEffect } from "react";

const BigBlockText = ({
  title,
  text,
  clamp = "clamp(1rem,4vw,2.2rem)", // default desktop size
  fontSize,                        // optional override
  tracking = "0.04em",
  wordSpacing = "0.2em",
}) => {
  const containerRef = useRef(null);

  // 1. determine if we're on mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const onChange = (e) => setIsMobile(e.matches);
    onChange(mq);
    mq.addListener(onChange);
    return () => mq.removeListener(onChange);
  }, []);

  // 2. pick base size (prop or clamp)
  const baseSize = fontSize || clamp;

  // 3. helper: divide numeric CSS values (for mobile halving)
  const halfSize = (sizeStr) =>
    sizeStr.replace(/(\d*\.?\d+)([a-zA-Z%]+)/g, (_, num, unit) => {
      const half = parseFloat(num) / 2;
      return `${Math.round(half * 10000) / 10000}${unit}`;
    });

  // 4. final size for text
  const finalFontSize = isMobile ? halfSize(baseSize) : baseSize;

  // 5. derive title size (1.5x text)
  const scaledSize = (sizeStr, factor) =>
    sizeStr.replace(/(\d*\.?\d+)([a-zA-Z%]+)/g, (_, num, unit) => {
      const scaled = parseFloat(num) * factor;
      return `${Math.round(scaled * 10000) / 10000}${unit}`;
    });

  const titleFontSize = scaledSize(finalFontSize, 1.5);

  // splitting logic: only on explicit quoted segments "…","…"
  const lines = Array.isArray(text)
    ? text
    : typeof text === "string" && text.includes('","')
    ? text
        .split('","')
        .map((line) => line.replace(/^"+|"+$/g, "").trim())
    : [text];

  return (
    <div
      ref={containerRef}
      className="w-screen px-6 md:px-12 relative z-10 space-y-6"
    >
      {title && (
        <h2
          className="uppercase font-bold"
          style={{
            fontSize: titleFontSize,
            letterSpacing: tracking,
            wordSpacing,
            background:
              "linear-gradient(to right, #ec4899, #8b5cf6, #3b82f6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {title}
        </h2>
      )}

      {lines.map((line, idx) => (
        <p
          key={idx}
          className="font-semibold uppercase leading-[1.08] md:leading-[1.12] text-justify"
          style={{
            fontSize: finalFontSize,
            letterSpacing: tracking,
            wordSpacing,
            textJustify: "inter-word",
          }}
        >
          {line}
        </p>
      ))}
    </div>
  );
};

export default BigBlockText;
