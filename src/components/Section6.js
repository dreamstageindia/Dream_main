// src/components/Section6.jsx
import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import BigBlockText from "./BigBlockText";
import PixelTransition from "./PixelTransition";
import BackgroundBlobs from "./BackgroundBlobs";

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

const Section6 = forwardRef(function Section6(_, ref) {
  return (
    <section
      ref={ref}
      className="
        relative w-screen h-auto text-white
        flex flex-col items-center
        px-4 md:px-8 lg:px-16
         overflow-visible
        py-12 md:py-20
      "
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
<BigBlockText title="Culture Rock" text="" fontSize="2.5rem"/>
        <BigBlockText title="" text="At Dream Stage, our foundation rests on six guiding values:" fontSize="2.5rem"/>
      <div className="relative z-10 mix-blend-difference w-full max-w-6xl mx-auto">
        

        <div className="mt-8 grid gap-y-12 justify-items-center grid-cols-1 md:grid-cols-3">
          {cards.map(({ img, name, desc }, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center w-full px-4"
              variants={fadeVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="group relative w-full flex justify-center">
                <PixelTransition
                  firstContent={
                    <motion.img
                      src={img}
                      alt={name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0 will-change-opacity"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                    />
                  }
                  secondContent={
                    <div className="w-full h-full grid place-items-center bg-[#111] px-6 text-center">
                      <p className="font-semibold text-base sm:text-lg md:text-xl leading-snug text-white">
                        {desc}
                      </p>
                    </div>
                  }
                  // **Reduced** grid sizes for speed
                  gridSizeMobile={4}
                  gridSizeTablet={6}
                  gridSizeDesktop={8}
                  pixelColor="#ffffff"
                  // **Faster** step duration
                  animationStepDuration={0.25}
                  className="w-56 sm:w-64 md:w-1/2 lg:w-1/2 aspect-[4/5] sm:aspect-square mx-auto will-change-transform"
                />
              </div>

              <h4 className="mt-4 text-center sm:text-base md:text-lg font-bold tracking-wide text-pink-500 text-2xl uppercase">
                {name}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Section6;
