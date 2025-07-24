// src/components/Section3.jsx
import React, { forwardRef } from "react";
import DistortedGridBG from "./DistortedGridBG";
import BigBlockText from "./BigBlockText";

const Section3 = forwardRef((props, ref) => (
  <section ref={ref} className="absolute inset-0 flex items-center justify-center will-change-transform">
    <DistortedGridBG />
    <div className="absolute inset-0 pointer-events-none border border-white/20 md:border-[2px] z-0" />

    <div className="relative z-10 mix-blend-difference text-white">
      <BigBlockText
        title="VISION"
        text={`Reinvent creative experiential experiences so becoming any kind of artist is a prime career option. To create a world where every unique talent finds its spotlight and flourishes. We envision a future where creativity is recognized as a vital force of human evolution — one that shapes cultures, builds communities, and heals the world.`}
        fontSize = "3.0rem"
      />
    </div>
  </section>
));

export default Section3;
