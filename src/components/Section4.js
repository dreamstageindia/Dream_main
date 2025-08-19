// src/components/Section4.jsx
import React, { forwardRef } from "react";
import DistortedGridBG from "./DistortedGridBG";
import BigBlockText from "./BigBlockText";

const Section4 = forwardRef((props, ref) => (
  <section ref={ref} className="absolute inset-0 flex items-center justify-center will-change-transform">
    <DistortedGridBG />
    <div className="absolute inset-0 pointer-events-none border border-white/20 md:border-[2px] z-0" />

    <div className="relative z-10 mix-blend-difference text-white">
      <BigBlockText
        title="MISSION"
        text={[
          "We’re on a mission to impact 100 million lives by unlocking the power of creativity, teaching new skills, and enabling sustainable livelihoods in experiential spaces. ",
        ]}
        fontSize = "2.5rem"
      />
<br/>
      <BigBlockText
      title={"To empower artists and curators through: "}
      text={[
        "Technology that simplifies discovery, gigs, and payments ",
          "Community that uplifts and inspires ",
          "Culture that celebrates diversity and individuality "
      ]}
      fontSize="2.5rem"
      />

      
    </div>
  </section>
));

export default Section4;
