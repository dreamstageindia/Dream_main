// src/components/Section8.jsx
import React from "react";
import CardSwap, { Card } from "./CardSwap";

const DATA = [
  { img: "/assets/image/values/1.png", title: "Artist-First",     desc: "Fair opportunities, recognition, and sustainable careers for creative professionals." },
  { img: "/assets/image/values/2.png", title: "Community-Powered", desc: "Bridging artists and businesses through intuitive tech and meaningful collaboration. " },
  { img: "/assets/image/values/3.png", title: "Fair & Transparent Payments",       desc: "Secure, timely, and equitable compensation—always. " },
  { img: "/assets/image/values/4.png", title: "For the Creative Good",       desc: "Using art to drive social, cultural, and economic change." },
  { img: "/assets/image/values/5.png", title: "Ethical & Inclusive ",        desc: "A respectful, safe, and welcoming space for all. " },
  { img: "/assets/image/values/6.png", title: "Tech for Creativity",       desc: " AI, blockchain, and digital tools built to empower artists. " },
  { img: "/assets/image/values/7.png", title: "Circular Creativity ",       desc: " Championing sustainability through eco-conscious practices and events. " },
  { img: "/assets/image/values/8.png", title: "Learn & Grow ",       desc: " Mentorship, upskilling, and access to lifelong creative learning.  " },
  { img: "/assets/image/values/9.png", title: "Preserve & Innovate ",       desc: " Honoring traditional arts while pushing creative boundaries. " },

];

export default function Section8() {
  return (
    <section className="relative w-screen md:min-h-[700px] min-h-[900px] overflow-hidden bg-gradient-to-r from-purple-800 via-black/50 to-black-600 animate-gradient">
      {/* 1. animated gradient background */}
      <div className="absolute inset-0 animate-gradient" />

      {/* 2. dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* 3. heading, centered at top */}
      <h2
        className="
          absolute md:top-1/2 md:left-1/4 left-1/2 transform -translate-x-1/2
          text-3xl md:text-5xl font-bold md:ml-5 text-center
          z-10 uppercase text-pink-500
        "
      >
        What We Stand For&nbsp;/&nbsp;Why Us
      </h2>

      {/* 4. card‐stack container, bottom‐right */}
      <div className="absolute md:top-[40%] right-[107%] top-[50%] md:right-[45%] z-10">
        <CardSwap cardDistance={60} verticalDistance={70} delay={5000} pauseOnHover={false}>
              {DATA.map(({ img, title, desc }, i) => (
                <Card
                  key={i}
                  customClass="w-48 h-64 md:w-56 md:h-72 lg:w-64 lg:h-80 rounded-xl overflow-hidden"
                  style={{
                    backgroundImage: `url(${img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* semi‑transparent overlay */}
                  <div className="absolute inset-0 bg-black/30 rounded-xl" />

                  {/* card text */}
                  <div className="relative z-10 flex flex-col items-center justify-end h-full p-4 text-center uppercase">
                    <h3 className="text-white text-lg md:text-xl font-bold">{title}</h3>
                    <p className="text-white text-sm md:text-base leading-snug">
                      {desc}
                    </p>
                  </div>
                </Card>
              ))}
            </CardSwap>
      </div>
    </section>
  );
}
