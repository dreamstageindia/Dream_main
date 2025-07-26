// src/components/Section6.jsx
import React from "react";

export default function Section6() {
  return (
    <div className="h-screen w-screen relative overflow-hidden bg-gradient-to-r from-[#140354] via-black/10 to-black animate-gradient text-white flex flex-col md:flex-row items-center justify-center">
      {/* Rain Animation */}
      <div className="rain"></div>

      {/* Content */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mx-auto px-4 z-10">
        {/* Image */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <img
            src="/assets/image/1.png"
            alt="Section 6"
            className="w-full max-w-md mx-auto md:max-w-none rounded-lg"
          />
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="max-w-md text-center md:text-right">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-pink-500">DREAM HQ</h2>
            <p className="text-lg md:text-xl">
              Dream Stage is based in Manali, in the heart of the Himalayas. It’s our peaceful home for creativity, clarity, and collaboration. Instead of setting up in busy cities like Gurgaon or Bangalore, we chose to build our base 2,200 meters above sea level surrounded by the beautiful Pir Panjal and Dhauladhar mountain ranges. <br />
              Here, the air is fresh, the water is clean, and the food is nourishing. Silence helps us focus, the stunning beauty keeps us calm and the harsh realities of mountains keep us grounded, pushes our limits, offers us adventures every day and gives us hope for a happier tomorrow.
            </p>
          </div>
        </div>
      </div>

      {/* Rain Animation CSS */}
      <style jsx>{`
        .rain {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          background: transparent;
        }

        .rain::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: transparent;
          animation: rain-multi 0.6s linear infinite;
        }

        @keyframes rain-multi {
          0% {
            background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><rect x="0" width="2" height="20" fill="rgba(255,255,255,0.6)"/></svg>') repeat;
            background-position: 
              ${Array.from({ length: 20 }, (_, i) => `${Math.random() * 100}vw -${Math.random() * 100 + 50}vh`).join(", ")};
          }
          100% {
            background-position: 
              ${Array.from({ length: 20 }, (_, i) => `${Math.random() * 100}vw ${100 + Math.random() * 100}vh`).join(", ")};
          }
        }

        @media (max-width: 768px) {
          .rain::before {
            animation-duration: 0.8s;
            background-size: 6% auto; /* Lower density on mobile */
          }
        }
      `}</style>
    </div>
  );
}