// src/pages/Home.jsx
import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import Hero from "../components/Hero";
import Section2 from "../components/Section2";
import Section3 from "../components/Section3";
import Section4 from "../components/Section4";
import Section5 from "../components/Section5";
import Section6 from "../components/Section6";
import Section7 from "../components/Section7"; // (import kept because you had it)

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section8 from "../components/Section8";
import Section9 from "../components/Section9";
import Section10 from "../components/Section10";
import Section11 from "../components/Section11.jsx";
import VideoReel from "../components/VideoReel.jsx";
import MotivationPage from "../components/MotivationPage.jsx";
import CircularGal from "../components/CircularGal.js";
import Intro from "../components/Intro.jsx";
import Section12 from "../components/Section12.js";
import ContactUs from "../components/ContactUs.jsx";
import Footer from "../components/Footer.jsx";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [showIntro, setShowIntro] = useState(true);

  // Back-to-top button visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  // pinned stack
  const pinWrapRef = useRef(null);
  const sec2Ref = useRef(null);
  const sec3Ref = useRef(null);
  const sec4Ref = useRef(null);

  // NOTE: You had refs and code for a horizontal block that isn't actually rendered.
  // Leaving the refs here is harmless, but we removed the unused ScrollTrigger to avoid side effects.
  const hWrapRef = useRef(null);
  const hTrackRef = useRef(null);

  useLayoutEffect(() => {
    if (showIntro) return;

    // Build all ScrollTriggers within this DOM subtree and auto-clean on unmount
    const ctx = gsap.context(() => {
      /* -------- Sections 2→3→4 (vertical pinned) -------- */
      const HOLD = 0.5;

      if (!pinWrapRef.current || !sec2Ref.current || !sec3Ref.current || !sec4Ref.current) return;

      gsap.set(sec2Ref.current, { xPercent: 0, autoAlpha: 1 });
      gsap.set(sec3Ref.current, { xPercent: 100, autoAlpha: 0 });
      gsap.set(sec4Ref.current, { xPercent: 100, autoAlpha: 0 });

      gsap.timeline({
        scrollTrigger: {
          trigger: pinWrapRef.current,
          start: "top top",
          end: "+=250%",
          scrub: 0.6,
          pin: true,
          pinSpacing: true,     // keep layout space so React/DOM don't fight
          anticipatePin: 1,
        },
        defaults: { ease: "none" },
      })
        .to({}, { duration: HOLD })
        .to(sec2Ref.current, { xPercent: -100, autoAlpha: 0 })
        .to(sec3Ref.current, { xPercent: 0, autoAlpha: 1 }, "<")
        .to({}, { duration: HOLD })
        .to(sec3Ref.current, { xPercent: -100, autoAlpha: 0 })
        .to(sec4Ref.current, { xPercent: 0, autoAlpha: 1 }, "<")
        .to({}, { duration: HOLD });

      // ⚠️ Removed the unused horizontal ScrollTrigger (5→6→7) because there's no corresponding DOM wrapper/track in this file.
      // That code could register triggers bound to nulls and contribute to "insertBefore" runtime errors when React reorders nodes.
    }, pinWrapRef);

    return () => {
      ctx.revert();           // fully restore DOM/styles so React remains in charge
      ScrollTrigger.refresh(); // ensure positions updated after cleanup
    };
  }, [showIntro]);

  // ensure correct sizes after load (media/layout-dependent measurements)
  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  // handle showing the scroll-to-top button
  useEffect(() => {
    const onScroll = () => setShowScrollTop(!showIntro && window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initialize
    return () => window.removeEventListener("scroll", onScroll);
  }, [showIntro]);

  const scrollToTop = () => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  };

  if (showIntro) {
    // Keep Intro exactly as you had it, then reveal the site
    return <Intro onFinish={() => setShowIntro(false)} />;
  }

  return (
    <div className="text-white md:bg-black">
      <Hero />

      <div className="text-white bg-black">
        <VideoReel />
      </div>

      {/* Pinned ABOUT / VISION / MISSION (unchanged order/visuals) */}
      <div ref={pinWrapRef} className="relative h-screen overflow-hidden bg-black">
        <Section2 ref={sec2Ref}  id="about"/>
        <Section3 ref={sec3Ref} />
        <Section4 ref={sec4Ref} />
      </div>

      <div className="hsec shrink-0 w-screen h-screen bg-black">
        <Section5 />
      </div>
      <div className="hsec shrink-0 w-screen h-auto bg-black">
        <Section6 />
      </div>
      <div className="hsec shrink-0 w-screen h-auto bg-black">
        <Section8 />
      </div>
      <div className="hsec shrink-0 w-screen h-auto">
        <Section9 />
      </div>
      <div className="hsec shrink-0 w-screen h-auto">
        <Section10 />
      </div>

      <div className="hsec shrink-0 w-screen h-auto bg-black">
        <MotivationPage />
      </div>
      <div className="hsec shrink-0 w-screen h-auto bg-black">
        <CircularGal />
      </div>
      <div className="hsec shrink-0 w-screen h-auto bg-black">
        <Section11 />
      </div>
      <div className="hsec shrink-0 w-screen h-auto bg-black">
        <Section12 />
      </div>
      <div className="hsec shrink-0 w-screen h-auto bg-black">
        <ContactUs />
      </div>
      <div className="hsec shrink-0 w-screen h-auto bg-black">
        <Footer />
      </div>

      {/* ───────────────── Back to Top Button ───────────────── */}
      <button
        type="button"
        aria-label="Back to top"
        onClick={scrollToTop}
        className={[
          "fixed z-[9999] bottom-5 right-5 md:bottom-8 md:right-8",
          "h-12 w-12 md:h-14 md:w-14 rounded-full",
          "bg-white/10 border border-white/20 backdrop-blur-md",
          "text-white shadow-lg hover:bg-white/20 active:scale-95",
          "transition-all duration-300 ease-out",
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-4",
          "focus:outline-none focus:ring-2 focus:ring-white/40"
        ].join(" ")}
      >
        {/* Up Arrow Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="mx-auto h-6 w-6 md:h-7 md:w-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 19V5" />
          <path d="m5 12 7-7 7 7" />
        </svg>
      </button>
      {/* ─────────────────────────────────────────────────────── */}
    </div>
  );
};

export default Home;
