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
        text={`To empower artists and curators through technology, community, and culture — making creative careers sustainable, respected, and accessible. We aim to impact 100 million lives by helping people recognize, teach, and build livelihoods in experiential creative spaces. We’re revolutionizing how talent is discovered, nurtured, and celebrated by offering a seamless space for collaboration, growth, and self-expression. Join us—your Dream Stage awaits!`}
        fontSize = "3.0rem"
      />
    </div>
  </section>
));

export default Section4;
