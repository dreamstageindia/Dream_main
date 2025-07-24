// src/components/Section6.jsx
import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import BigBlockText from "./BigBlockText";
import PixelTransition from "./PixelTransition";
import BackgroundBlobs from "./BackgroundBlobs"; // <— import

const cards = [
  { img: "/assets/image/1.png", name: "Happiness",     desc: "Work should bring joy, not dread." },
  { img: "/assets/image/2.png", name: "Belongingness", desc: "Everyone deserves a seat at the table." },
  { img: "/assets/image/3.png", name: "Freedom",       desc: "Creativity thrives without constraints." },
  { img: "/assets/image/4.png", name: "Honesty",       desc: "Radical transparency is our default." },
  { img: "/assets/image/5.png", name: "Growth",        desc: "We grow as individuals, as artists, and as a company." },
  { img: "/assets/image/6.png", name: "Respect",       desc: "Every talent, every voice matters." },
];

const fadeVariant = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeIn" } },
};

const Section7 = forwardRef(function Section7(_, ref) {
  return (
    <section
      ref={ref}
      className="relative w-screen min-h-screen  text-white flex items-center justify-center px-4 md:px-8 lg:px-16 mt-7 overflow-hidden"
    >
      {/* ✨ Background animation */}
      <BackgroundBlobs
        blobCount={14}
        speed={0.25}
        maxRadius={220}
        minRadius={80}
        colors={["#6EE7F9", "#A78BFA", "#F472B6", "#FDE68A", "#34D399"]}
        opacity={0.5}
      />
    </section>
  );
});

export default Section7;
