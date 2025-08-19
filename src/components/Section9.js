import React, { useEffect } from "react";
import ChromaGrid from './ChromaGrid';
import { motion } from 'framer-motion';
import BigBlockText from "./BigBlockText";

const items = [
  {
    image: "https://media.licdn.com/dms/image/v2/D5635AQH-wiaKcB0UDw/profile-framedphoto-shrink_400_400/B56ZhjMAJZH0Ag-/0/1754010747755?e=1756188000&v=beta&t=jji958czZvmKSAxwZlE8UuEOgDBt5rXBuF6X79kLwuk ",
    title: "SAKSHAM SINGHAL",
    subtitle: "DIRECTOR",
    handle: ".",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: ""
  },
  {
    image: "https://media.licdn.com/dms/image/v2/D5635AQF735CXHgoc1w/profile-framedphoto-shrink_400_400/B56ZhlGdIXHUAc-/0/1754042848180?e=1756188000&v=beta&t=cFa5eat2MPZ2zoZjqerUsKjnS4Ru355PKr_lhChKbYk",
    title: "RASHMI",
    subtitle: "CO-FOUNDER",
    handle: ".",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: ""
  },
  {
    image: "https://media.licdn.com/dms/image/v2/D5603AQEHKtU-uVXSjA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1731980983271?e=1758758400&v=beta&t=-ZsWKpVg1EKmcP7d6ApxyeEpuwRy_igejCguQDkQGYU",
    title: "BHARATH C",
    subtitle: "HEAD OF TECHNOLOGY",
    handle: ".",
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
    <div className="flex flex-col justify-center items-center min-h-auto relative overflow-hidden bg-black splash-container">
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
        <BigBlockText
        title="OUR TEAM"
        fontSize="2.5rem"
        />
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