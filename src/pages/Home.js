// src/pages/Home.jsx
import React, { useRef, useLayoutEffect, useEffect } from "react";
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


gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  // pinned stack
  const pinWrapRef = useRef(null);
  const sec2Ref = useRef(null);
  const sec3Ref = useRef(null);
  const sec4Ref = useRef(null);

  // horizontal block
  const hWrapRef = useRef(null);
  const hTrackRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
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

        // start off-screen to the LEFT so 5 is visible, 6 & 7 to the right.
        // animate x from negative to 0 (visual movement to the right)
        let st;
        const setup = () => {
          const len = calcLen();
          gsap.set(track, { x: -len }); // start far left
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
              // progress 0 → 1: move x to 0
              gsap.to(track, { x: -len + len * self.progress, overwrite: true });
            },
          });
        };

        setup();
        ScrollTrigger.addEventListener("refreshInit", setup);
      }
    });

    return () => ctx.revert();
  }, []);

  // ensure correct sizes after load
  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div className="bg-black text-white">
      <Hero />
      <VideoReel />

      {/* Horizontal scroll slides */}
      <div ref={pinWrapRef} className="relative h-screen overflow-hidden" id="about">
        <Section2 ref={sec2Ref} />
        <Section3 ref={sec3Ref} />
        <Section4 ref={sec4Ref} />
      </div>
      <div className="hsec shrink-0 w-screen h-screen" >
        <Section5 />
      </div>
      <div className="hsec shrink-0 w-screen h-screen">
            <Section6 />
          </div>
          <div className="hsec shrink-0 w-screen h-screen md:hidden">
            <Section7 />
          </div>
          <div className="hsec shrink-0 w-screen h-screen md:hidden">
            <Section7 />
          </div>
          
          
      {/* Horizontal scroll RIGHT */}
      {/* <div ref={hWrapRef} className="relative h-screen overflow-hidden">
        <div ref={hTrackRef} className="h-full flex">
          <div className="hsec shrink-0 w-screen h-screen">
            <Section8 />
          </div>
          <div className="hsec shrink-0 w-screen h-screen">
            <Section9 />
          </div>
          <div className="hsec shrink-0 w-screen h-screen">
            <Section10 />
          </div>
          <div className="hsec shrink-0 w-screen h-screen">
            <Section11 />
          </div>
          

        </div>
      </div> */}

      {/* Normal flow after */}
      {/* <section className="min-h-screen flex items-center justify-center px-8 bg-black">
        <h2 className="text-3xl md:text-5xl font-semibold">
          More content goes here…
        </h2>
      </section> */}
    </div>
  );
};

export default Home;
