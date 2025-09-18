// src/components/Section11.jsx
"use client";

import React from "react";
import MagicBento from "./MagicBento";
import BigBlockText from "./BigBlockText";
// import ImageTrail from "./ImageTrail";

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
    <div className="relative h-[800px] w-screen bg-black text-white overflow-hidden" id="art_bridge">
      {/* ─── Background layer: your hover‑trail */}
      {/* <div className="absolute inset-0 z-10">
        <ImageTrail items={images} variant={1} />
      </div> */}

      {/* ─── Foreground layer: title + Bento */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full pointer-events-none">
        {/* pointer-events none here lets all mousemoves go “through” to ImageTrail */}
        <BigBlockText title="ART BRIDGE" fontSize="2.5rem"/>

        {/* re-enable pointer events on the Bento so its own interactivity still works */}
        <div className="mt-8 pointer-events-auto">
          <video 
            autoPlay 
            muted 
            loop 
            className="w-full max-w-4xl h-auto rounded-lg shadow-2xl"
            controls={false}
          >
            <source src="/assets/video/coming_soon.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}
