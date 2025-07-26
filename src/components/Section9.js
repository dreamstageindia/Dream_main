import React, { useEffect } from "react";
import ChromaGrid from './ChromaGrid';
import { motion } from 'framer-motion';

const items = [
  {
    image: "/assets/image/values/1.png",
    title: "SAKSHAM SINGHAL",
    subtitle: "DIRECTOR",
    handle: "@saksham",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: ""
  },
  {
    image: "/assets/image/values/1.png",
    title: "RASHMI",
    subtitle: "CO-FOUNDER",
    handle: "@rashmi",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: ""
  },
  {
    image: "/assets/image/values/1.png",
    title: "BHARATH C",
    subtitle: "HEAD OF TECHNOLOGY",
    handle: "@mikechen",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #6C82F6, #000)",
    url: ""
  }
];

// Splash effect parameters
const splashConfig = {
  autoSplashSize: 300, // Size of auto splash (px)
  hoverSplashSize: 400, // Size of hover splash (px)
  autoSplashOpacity: 0.9, // Opacity of auto splash (0 to 1)
  hoverSplashOpacity: 0.5, // Opacity of hover splash (0 to 1)
  animationSpeed: 6, // Animation duration for auto splash (seconds)
};

export default function Section9() {
  useEffect(() => {
    const container = document.querySelector(".splash-container");
    const hoverSplash = document.createElement("div");
    hoverSplash.className = "hover-splash";
    container.appendChild(hoverSplash);

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      hoverSplash.style.left = `${e.clientX - rect.left - splashConfig.hoverSplashSize / 2}px`;
      hoverSplash.style.top = `${e.clientY - rect.top - splashConfig.hoverSplashSize / 2}px`;
      hoverSplash.style.opacity = splashConfig.hoverSplashOpacity;
    };

    const handleMouseLeave = () => {
      hoverSplash.style.opacity = "0";
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeChild(hoverSplash);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen relative overflow-hidden bg-black splash-container">
      <style jsx>{`
        .splash-container::before,
        .splash-container::after {
          content: '';
          position: absolute;
          width: ${splashConfig.autoSplashSize}px;
          height: ${splashConfig.autoSplashSize}px;
          background: radial-gradient(circle, rgba(236, 72, 153, ${splashConfig.autoSplashOpacity}) 0%, transparent 70%);
          border-radius: 50%;
          animation: auto-splash ${splashConfig.animationSpeed}s infinite ease-in-out;
          z-index: 0;
        }
        .splash-container::before {
          top: 10%;
          left: 20%;
          animation-delay: 0s;
        }
        .splash-container::after {
          bottom: 15%;
          right: 25%;
          animation-delay: ${splashConfig.animationSpeed / 2}s;
        }
        .hover-splash {
          position: absolute;
          width: ${splashConfig.hoverSplashSize}px;
          height: ${splashConfig.hoverSplashSize}px;
          background: radial-gradient(circle, rgba(236, 72, 153, ${splashConfig.hoverSplashOpacity}) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 0;
        }
        @keyframes auto-splash {
          0%, 100% {
            transform: scale(0.8) translateY(0);
            opacity: ${splashConfig.autoSplashOpacity};
          }
          50% {
            transform: scale(1.2) translateY(-20px);
            opacity: ${splashConfig.autoSplashOpacity * 1.5};
          }
        }
        .content {
          position: relative;
          z-index: 1;
        }
      `}</style>
      <div className="content flex flex-col justify-center items-center min-h-screen">
        <motion.h1 
          className="text-4xl font-bold text-left mb-8 uppercase text-pink-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          OUR TEAM
        </motion.h1>
        <motion.div 
          className="flex justify-center items-center gap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <ChromaGrid 
            items={items}
            radius={300}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
          />
        </motion.div>
      </div>
    </div>
  );
}