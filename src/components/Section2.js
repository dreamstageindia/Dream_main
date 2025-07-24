// src/components/Section2.jsx
import React, { forwardRef } from "react";
import DistortedGridBG from "./DistortedGridBG";
import BigBlockText from "./BigBlockText";

const Section2 = forwardRef((props, ref) => (
  <section ref={ref} className="absolute inset-0 flex items-center justify-center will-change-transform">
    <DistortedGridBG />

    {/* Fullscreen border */}
    <div className="absolute inset-0 pointer-events-none border border-white/20 md:border-[2px] z-0" />

    <div className="relative z-10 mix-blend-difference text-white">
      <BigBlockText
        title="ABOUT"
        text={"Dream Stage is more than a platform. It’s a movement. Born out of a shared desire to redefine the creative economy, Dream Stage connects niche artistic talent with the world — providing tools, opportunities, and a thriving ecosystem where every dream has a stage."}
        fontSize = "3.0rem"
      />
    </div>
  </section>
));

export default Section2;
