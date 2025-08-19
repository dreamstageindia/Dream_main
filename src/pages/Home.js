// src/pages/Home.jsx
import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import Hero from "../components/Hero";
import Section2 from "../components/Section2";
import Section3 from "../components/Section3";
import Section4 from "../components/Section4";
import Section5 from "../components/Section5";
import Section6 from "../components/Section6";
import Section7 from "../components/Section7";

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

  // show/hide "Back to Top" button
  const [showScrollTop, setShowScrollTop] = useState(false);

  // pinned stack
  const pinWrapRef = useRef(null);
  const sec2Ref = useRef(null);
  const sec3Ref = useRef(null);
  const sec4Ref = useRef(null);

  // horizontal block (kept for future use if you re-enable)
  const hWrapRef = useRef(null);
  const hTrackRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (showIntro) return;

      /* -------- Sections 2→3→4 (vertical pinned) -------- */
      const HOLD = 0.100;

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

      /* -------- Sections 5→6→7 (horizontal RIGHT reveal) -------- */
      const track = hTrackRef.current;
      const wrapper = hWrapRef.current;

      if (track && wrapper) {
        const calcLen = () => track.scrollWidth - window.innerWidth;

        let st;
        const setup = () => {
          const len = calcLen();
          gsap.set(track, { x: -len });
          if (st) st.kill();
          st = ScrollTrigger.create({
            trigger: wrapper,
            start: "top top",
            end: () => `+=${len}`,
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              gsap.to(track, { x: -len + len * self.progress, overwrite: true });
            },
          });
        };

        setup();
        ScrollTrigger.addEventListener("refreshInit", setup);
      }
    });

    return () => ctx.revert();
  }, [showIntro]);

  // ensure correct sizes after load
  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  // handle showing the scroll-to-top button
  useEffect(() => {
    const onScroll = () => {
      // show after ~300px scroll; hide during Intro
      setShowScrollTop(!showIntro && window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initialize on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, [showIntro]);

  const scrollToTop = () => {
    // respect prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? "auto" : "smooth",
    });
  };

  if (showIntro) {
    return <Intro onFinish={() => setShowIntro(false)} />;
  }

  return (
    <div className="text-white md:bg-black">
      <Hero />

      <div className="text-white bg-black">
        <VideoReel />
      </div>

      {/* Horizontal scroll slides */}
      <div ref={pinWrapRef} className="relative h-screen overflow-hidden bg-black" id="about">
        <Section2 ref={sec2Ref} />
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
