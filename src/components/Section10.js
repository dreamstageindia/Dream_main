// src/components/Section6.jsx
import React, { useMemo } from "react";

export default function Section6() {
  // generate 120 raindrops with random properties (stable across renders)
  const drops = useMemo(() => {
    const count = 120;
    return Array.from({ length: count }).map(() => ({
      left: `${Math.random() * 100}%`,
      // random length between 20px and 60px
      height: `${20 + Math.random() * 40}px`,
      // fall duration between 0.6s and 1.2s
      duration: `${0.6 + Math.random() * 0.6}s`,
      // negative delay so they’re staggered immediately
      delay: `${-Math.random() * 1.2}s`,
      // random opacity
      opacity: 0.4 + Math.random() * 0.4,
    }));
  }, []);

  return (
    <section className="relative w-full bg-black text-white overflow-hidden">
      {/* Rain overlay */}
      

      {/* Content */}
      <div className="relative flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto px-6 py-12 md:py-20 lg:py-32">
        {/* Video */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <video
            src="/assets/video/dream_hq.mp4"
            alt="Dream HQ"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto rounded-lg"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-pink-500">
            DREAM HQ
          </h2>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed uppercase text-justify">
            Dream Stage is based in Manali, in the heart of the Himalayas. It’s our peaceful home for creativity, clarity, and collaboration. Instead of setting up in busy cities like Gurgaon or Bangalore, we chose to build our base 2,200 meters above sea level surrounded by the beautiful Pir Panjal and Dhauladhar mountain ranges.
            <br /><br />
            Here, the air is fresh, the water is clean, and the food is nourishing. Silence helps us focus, the stunning beauty keeps us calm and the harsh realities of mountains keep us grounded, pushes our limits, offers us adventures every day and gives us hope for a happier tomorrow.
          </p>
        </div>
      </div>

      {/* Rain CSS */}
      <style jsx>{`
        .rain {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .rain .drop {
          position: absolute;
          top: -100px;
          width: 2px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes fall {
          to {
            transform: translateY(110vh);
          }
        }
        @media (max-width: 768px) {
          .rain .drop {
            width: 1px;
            opacity: 0.3 !important;
            animation-duration: 1.5s !important;
          }
        }
      `}</style>
    </section>
  );
}
