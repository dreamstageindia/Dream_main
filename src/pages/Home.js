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
  }, [showIntro]);

  // ensure correct sizes after load
  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  if (showIntro) {
    return <Intro onFinish={() => setShowIntro(false)} />;
  }

  return (
    <div className=" text-white md:bg-black">
      <Hero />
    <div className=" text-white bg-black">
      <VideoReel />
      </div>

      {/* Horizontal scroll slides */}
      <div ref={pinWrapRef} className="relative h-screen overflow-hidden bg-black" id="about">
        <Section2 ref={sec2Ref} />
        <Section3 ref={sec3Ref} />
        <Section4 ref={sec4Ref} />
      </div>
      <div className="hsec shrink-0 w-screen h-screen bg-black" >
        <Section5 />
      </div>
      <div className="hsec shrink-0 w-screen h-auto bg-black">
            <Section6 />
      </div>
      <div className="hsec shrink-0 w-screen h-auto  bg-black">
            <Section8 />
      </div>
      <div className="hsec shrink-0 w-screen h-auto ">
            <Section9 />
      </div>
      <div className="hsec shrink-0 w-screen h-auto ">
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
    </div>
  );
};

export default Home;
