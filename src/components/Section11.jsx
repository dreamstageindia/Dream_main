// src/components/Section6.jsx
import React from "react";
import MagicBento from "./MagicBento";
export default function Section11() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black text-white">
      <MagicBento
  textAutoHide={true}
  enableStars={true}
  enableSpotlight={true}
  enableBorderGlow={true}
  enableTilt={true}
  enableMagnetism={true}
  clickEffect={true}
  spotlightRadius={300}
  particleCount={12}
  glowColor="132, 0, 255"
/>
    </div>
  );
}