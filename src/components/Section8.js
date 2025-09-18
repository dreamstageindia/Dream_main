// src/components/Section8.jsx
import React, { useRef, useEffect } from "react";
import BigBlockText from "./BigBlockText";

const DATA = [
  { img: "/assets/image/values/1.png",  title: "Artist‑First",             desc: "Fair opportunities, recognition, and sustainable careers for creative professionals." },
  { img: "/assets/image/values/2.png",  title: "Community‑Powered",        desc: "Bridging artists and businesses through intuitive tech and meaningful collaboration." },
  { img: "/assets/image/values/3.png",  title: "Fair & Transparent Payments", desc: "Secure, timely, and equitable compensation always." },
  { img: "/assets/image/values/4.png",  title: "For the Creative Good",     desc: "Using art to drive social, cultural, and economic change." },
  { img: "/assets/image/values/5.png",  title: "Ethical & Inclusive",       desc: "A respectful, safe, and welcoming space for all." },
  { img: "/assets/image/values/6.png",  title: "Tech for Creativity",       desc: "AI, blockchain, and digital tools built to empower artists." },
  { img: "/assets/image/values/7.png",  title: "Circular Creativity",       desc: "Championing sustainability through eco‑conscious practices and events." },
  { img: "/assets/image/values/8.png",  title: "Learn & Grow",              desc: "Mentorship, upskilling, and access to lifelong creative learning." },
  { img: "/assets/image/values/9.png",  title: "Preserve & Innovate",       desc: "Honoring traditional arts while pushing creative boundaries." },
];

export default function Section8() {
  const containerRef = useRef(null);
  const items = [...DATA, ...DATA];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const speed = 1.5;
    let isDown = false, startX = 0, scrollStart = 0, rafId = 0;

    const autoScroll = () => {
      if (!isDown) {
        container.scrollLeft += speed;
        if (container.scrollLeft >= container.scrollWidth/2) {
          container.scrollLeft -= container.scrollWidth/2;
        }
      }
      rafId = requestAnimationFrame(autoScroll);
    };
    rafId = requestAnimationFrame(autoScroll);

    const onDown = e => {
      isDown = true;
      startX = (e.touches ? e.touches[0].pageX : e.pageX) - container.offsetLeft;
      scrollStart = container.scrollLeft;
      container.classList.add("cursor-grabbing");
    };
    const onMove = e => {
      if (!isDown) return;
      const x = (e.touches ? e.touches[0].pageX : e.pageX) - container.offsetLeft;
      container.scrollLeft = scrollStart - (x - startX);
    };
    const onUp = () => {
      isDown = false;
      container.classList.remove("cursor-grabbing");
    };

    container.addEventListener("mousedown", onDown);
    container.addEventListener("touchstart", onDown, { passive: true });
    container.addEventListener("mousemove", onMove);
    container.addEventListener("touchmove", onMove);
    document.addEventListener("mouseup", onUp);
    container.addEventListener("touchend", onUp);

    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener("mousedown", onDown);
      container.removeEventListener("touchstart", onDown);
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("touchmove", onMove);
      document.removeEventListener("mouseup", onUp);
      container.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gradient-to-r from-purple-800 via-black/50 to-black-600">
      <div className="absolute inset-0 animate-gradient" />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 py-8 text-left ">
        <BigBlockText
        title="Why Us"
        fontSize="2.5rem"
        />
      </div>

      <div
        ref={containerRef}
        className="absolute inset-x-0 top-[6rem] bottom-0 overflow-hidden cursor-grab carousel-container"
      >
        <div className="flex items-center h-full">
          {items.map((item, i) => (
            <div
              key={i}
              className="
                flex-shrink-0
                w-[90vw]       h-[40vh]      /* mobile: 90% width, 40% height */
                sm:w-[60vw]    sm:h-[50vh]   /* small: 60% / 50% */
                md:w-[50vw]    md:h-[60vh]   /* md: 50% / 60% */
                lg:w-[40vw]    lg:h-[60vh]   /* lg: 40% / 60% */
                xl:w-[30vw]    xl:h-[60vh]   /* xl: 30% / 60% */
                2xl:w-[25vw] 2xl:h-[60vh]    /* 2xl: 25% / 60% */
                rounded-xl overflow-hidden mx-4
              "
              style={{
                backgroundImage: `url(${item.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="w-full h-full bg-black/30 flex flex-col justify-end p-6 uppercase">
                <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold">
                  {item.title}
                </h3>
                <p className="text-white text-sm sm:text-base md:text-lg leading-snug mt-2">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .carousel-container {
          display: flex;
        }
        .carousel-container {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .carousel-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
