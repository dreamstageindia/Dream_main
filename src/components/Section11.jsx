// src/components/Section11.jsx
"use client";

import React from "react";
import MagicBento from "./MagicBento";
import BigBlockText from "./BigBlockText";
import ImageTrail from "./ImageTrail";

export default function Section11() {
  const images = [
    "/assets/image/icons/1.png",
    "/assets/image/icons/2.png",
    "/assets/image/icons/3.png",
    "/assets/image/icons/4.png",
    "/assets/image/icons/5.png",
    "/assets/image/icons/6.png",
    "/assets/image/icons/7.png",
    "/assets/image/icons/8.png",
  ];

  return (
    <div className="relative h-[800px] w-screen bg-black text-white overflow-hidden">
      {/* ─── Background layer: your hover‑trail */}
      <div className="absolute inset-0 z-10">
        <ImageTrail items={images} variant={1} />
      </div>

      {/* ─── Foreground layer: title + Bento */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full pointer-events-none">
        {/* pointer-events none here lets all mousemoves go “through” to ImageTrail */}
        <BigBlockText title="ART BRIDGE" />

        {/* re-enable pointer events on the Bento so its own interactivity still works */}
        <div className="mt-8 pointer-events-auto">
          <MagicBento
            textAutoHide
            enableStars
            enableSpotlight
            enableBorderGlow
            enableTilt
            enableMagnetism
            clickEffect
            spotlightRadius={300}
            particleCount={12}
            glowColor="132, 0, 255"
          />
        </div>
      </div>
    </div>
  );
}
