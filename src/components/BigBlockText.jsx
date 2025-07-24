// src/components/BigBlockText.jsx
import React, { useRef, useState, useEffect } from "react";
import VariableProximity from "./VariableProximity";

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

  // 3. helper: divide any numeric CSS value by 2
  const halfSize = (sizeStr) =>
    sizeStr.replace(/(\d*\.?\d+)([a-zA-Z%]+)/g, (_, num, unit) => {
      const half = 1;
      // preserve up to 4 decimal places
      return `${Math.round(half * 10000) / 10000}${unit}`;
    });

  // 4. final size based on screen
  const finalFontSize = isMobile ? halfSize(baseSize) : baseSize;

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
        <VariableProximity
          label={title}
          className="uppercase text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-4xl font-bold"
          fromFontVariationSettings="'wght' 400, 'opsz' 9"
          toFontVariationSettings="'wght' 1000, 'opsz' 40"
          containerRef={containerRef}
          radius={120}
          falloff="linear"
        />
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
