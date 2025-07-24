import React, { useRef, useLayoutEffect, useEffect } from "react";
import Hero from "../components/Hero";
import Section2 from "../components/Section2";
import Section3 from "../components/Section3";
import Section4 from "../components/Section4";
import Section5 from "../components/Section5";
import Section6 from "../components/Section6";
import Section7 from "../components/Section7";
import VideoReel from "../components/VideoReel.jsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    const isMobile = window.innerWidth <= 768; // Mobile breakpoint
    const ctx = gsap.context(() => {
      if (!isMobile) {
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
                gsap.to(track, { x: -len + len * self.progress, overwrite: true });
              },
            });
          };

          setup();
          ScrollTrigger.addEventListener("refreshInit", setup);
        }
      } else {
        // Mobile: Reset GSAP for vertical scrolling
        gsap.set([sec2Ref.current, sec3Ref.current, sec4Ref.current, hTrackRef.current], {
          xPercent: 0,
          autoAlpha: 1,
          clearProps: "all",
        });
        ScrollTrigger.getAll().forEach((st) => st.kill());
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
    <div className="text-white">
      <Hero />
    <div className=" bg-black">

      <VideoReel />
      </div>

      {/* Horizontal scroll slides */}
      <div ref={pinWrapRef} className="relative h-screen overflow-hidden" id="about">
        <Section2 ref={sec2Ref} />
        <Section3 ref={sec3Ref} />
        <Section4 ref={sec4Ref} />
      </div>
      <div className="hsec shrink-0 w-screen h-screen">
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
    </div>
  );
};

export default Home;