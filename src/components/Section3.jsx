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
        text={
          [
            "We envision a world made happier through the power of creativity. A world where artists, curators, and audiences come together to co-create joyful, meaningful experiences. When creative expression flows freely and is valued by society, it brings not just entertainment, but deep emotional connection, belonging, and purpose. ",
            "Our vision is to build a future where creative careers are celebrated. A future where livelihoods are sustained, individuality is honored, and happiness is shared through every brushstroke, performance, and expression. Because when art thrives, people thrive. And a happier world becomes possible for everyone. "
          ]
        }
        fontSize = "2.5rem"
      />
    </div>
  </section>
));

export default Section3;
