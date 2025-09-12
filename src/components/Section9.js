import React, { useEffect, useRef } from "react";
import ChromaGrid from "./ChromaGrid";
import { motion } from "framer-motion";
import BigBlockText from "./BigBlockText";

const items = [
  {
    image:
      "https://media.licdn.com/dms/image/v2/D5603AQH35F67XyT66Q/profile-displayphoto-shrink_800_800/B56ZSC14jsHoAc-/0/1737361952062?e=1760572800&v=beta&t=WDf5YMoq161P7ppr57uBVMDmf8Pr4rUxFKzgzUn0HA0",
    title: "SAKSHAM SINGHAL",
    subtitle: "DIRECTOR",
    handle: ".",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://www.linkedin.com/in/singhalsaksham/" 
  },
  {
    image:
      "https://media.licdn.com/dms/image/v2/D5635AQF735CXHgoc1w/profile-framedphoto-shrink_800_800/B56ZhlGdIXHUAg-/0/1754042848180?e=1758117600&v=beta&t=VdEagD_klq4BUyVQ64wP2_G45PavTEKdOpxGxg_NTcY",
    title: "RASHMI",
    subtitle: "CO-FOUNDER",
    handle: ".",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://www.linkedin.com/in/rashmi-bala-15960920b/"
  },
  {
    image:
      "https://media.licdn.com/dms/image/v2/D5603AQEHKtU-uVXSjA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1731980983271?e=1758758400&v=beta&t=-ZsWKpVg1EKmcP7d6ApxyeEpuwRy_igejCguQDkQGYU",
    title: "BHARATH C",
    subtitle: "HEAD OF TECHNOLOGY",
    handle: ".",
    borderColor: "#6C82F6",
    gradient: "linear-gradient(180deg, #6C82F6, #000)",
    url: "https://www.linkedin.com/in/bharath1702/"
  },
];

const splashConfig = {
  autoSplashSize: 300,
  hoverSplashSize: 400,
  autoSplashOpacity: 0.9,
  hoverSplashOpacity: 0.5,
  animationSpeed: 6,
};

export default function Section9() {
  const containerRef = useRef(null);
  const overlayRef = useRef(null); // dedicated overlay container

  useEffect(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;
    if (!container || !overlay) return;

    // create hover splash inside overlay (not inside React children container)
    const hoverSplash = document.createElement("div");
    hoverSplash.className = "hover-splash";
    overlay.appendChild(hoverSplash);

    const handleMouseMove = (e) => {
      const rect = overlay.getBoundingClientRect();
      hoverSplash.style.left = `${
        e.clientX - rect.left - splashConfig.hoverSplashSize / 2
      }px`;
      hoverSplash.style.top = `${
        e.clientY - rect.top - splashConfig.hoverSplashSize / 2
      }px`;
      hoverSplash.style.opacity = String(splashConfig.hoverSplashOpacity);
    };
    const handleMouseLeave = () => {
      hoverSplash.style.opacity = "0";
    };

    overlay.addEventListener("mousemove", handleMouseMove);
    overlay.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      overlay.removeEventListener("mousemove", handleMouseMove);
      overlay.removeEventListener("mouseleave", handleMouseLeave);
      overlay.contains(hoverSplash) && overlay.removeChild(hoverSplash);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col justify-center items-center min-h-auto overflow-hidden bg-black"
    >
      {/* Background auto splashes via ::before/::after */}
      <style jsx>{`
        .splash-autos::before,
        .splash-autos::after {
          content: "";
          position: absolute;
          width: ${splashConfig.autoSplashSize}px;
          height: ${splashConfig.autoSplashSize}px;
          background: radial-gradient(
            circle,
            rgba(236, 72, 153, ${splashConfig.autoSplashOpacity}) 0%,
            transparent 70%
          );
          border-radius: 50%;
          animation: auto-splash ${splashConfig.animationSpeed}s infinite ease-in-out;
          z-index: 0;
        }
        .splash-autos::before {
          top: 10%;
          left: 20%;
          animation-delay: 0s;
        }
        .splash-autos::after {
          bottom: 15%;
          right: 25%;
          animation-delay: ${splashConfig.animationSpeed / 2}s;
        }
        .hover-splash {
          position: absolute;
          width: ${splashConfig.hoverSplashSize}px;
          height: ${splashConfig.hoverSplashSize}px;
          background: radial-gradient(
            circle,
            rgba(236, 72, 153, ${splashConfig.hoverSplashOpacity}) 0%,
            transparent 70%
          );
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
        }
        @keyframes auto-splash {
          0%,
          100% {
            transform: scale(0.8) translateY(0);
          }
          50% {
            transform: scale(1.2) translateY(-20px);
          }
        }
      `}</style>

      {/* separate overlay layer that we manually draw into */}
      <div ref={overlayRef} className="absolute inset-0 z-10 pointer-events-auto" />

      {/* autos in CSS behind */}
      <div className="absolute inset-0 z-0 splash-autos" />

      {/* React content on top */}
      <div className="relative z-20 flex flex-col justify-center items-center min-h-screen">
        <BigBlockText title="OUR TEAM" fontSize="2.5rem" />
        <motion.div
          className="flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <ChromaGrid items={items} radius={300} damping={0.45} fadeOut={0.6} ease="power3.out" />
        </motion.div>
      </div>
    </div>
  );
}
