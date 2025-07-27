// src/components/Intro.jsx
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function Intro({ onFinish }) {
  const container = useRef(null);
  const orb1      = useRef(null);
  const orb2      = useRef(null);
  const logoRef   = useRef(null);
  const titleRef  = useRef(null);
  const subRef    = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        if (typeof onFinish === "function") onFinish();
      }
    });

    tl.set(container.current, { autoAlpha: 1 })
      .from(orb1.current, { scale: 0, opacity: 0, duration: 1.2 }, 0)
      .from(orb2.current, { scale: 0, opacity: 0, duration: 1.2 }, 0.2)
      .from(logoRef.current, { scale: 0, opacity: 0, duration: 0.8 }, 1.4)
      .to(logoRef.current, { rotation: 360, duration: 1 }, "spin")
      .from(titleRef.current, { y: 50, opacity: 0, duration: 1 }, "spin+=0.4")
      .from(subRef.current, { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
      // increased zoom scale from 1.3 to 1.6
      .to(
        [logoRef.current, titleRef.current, subRef.current],
        { scale: 1.6, duration: 0.8, delay: 0.5 },
        "zoom"
      )
      .to(container.current, { autoAlpha: 0, duration: 0.5 }, "zoom+=0.5");

    return () => tl.kill();
  }, [onFinish]);

  return (
    <div
      ref={container}
      className="fixed inset-0 bg-black flex flex-col items-center justify-center opacity-0"
    >
      <div
        ref={orb1}
        className="absolute w-72 h-72 bg-purple-700 rounded-full top-10 -left-20 mix-blend-multiply"
      />
      <div
        ref={orb2}
        className="absolute w-72 h-72 bg-pink-500 rounded-full bottom-10 -right-20 mix-blend-multiply"
      />

      {/* Logo */}
      <img
        ref={logoRef}
        src="/assets/image/logo.png"
        alt="DreamStage Logo"
        className="relative w-24 h-24 mb-6"
      />

      {/* Responsive headline: clamps between 3rem and 8rem based on viewport */}
      <h1
        ref={titleRef}
        className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500
                   text-[clamp(3rem,10vw,8rem)]"
      >
        DREAMSTAGE
      </h1>

      {/* Responsive subheading: clamps between 1rem and 2rem based on viewport */}
      <p
        ref={subRef}
        className="mt-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400
                   text-[clamp(1rem,4vw,2rem)]"
      >
        Where Dreams take center stage
      </p>
    </div>
  );
}
