// src/components/VideoReelHorizontal.jsx
import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoSection from "./VideoSection";
gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    video: "/assets/video/1.mp4",
    image: "/assets/image/c1.png",
    words: ["SPREADING", "HAPPINESS", "BY TURNING", "DREAMS", "INTO REALITY"],
    pos: "lt",
  },
  {
    video: "/assets/video/2.mp4",
    image: "/assets/image/c2.png",
    words: ["HOME", "OF HAPPY", "CREATIVE", "HUMANS"],
    pos: "rb",
  },
  {
    video: "/assets/video/3.mp4",
    image: "/assets/image/c3.png",
    words: ["MAKING", "CREATIVE CAREERS", "JOYFUL,", "DIGNIFIED", "AND DEPENDABLE"],
    pos: "lb",
  },
  {
    video: "/assets/video/4.mp4",
    image: "/assets/image/c4.png",
    words: ["BUILDING", "THE WORLD’S", "LARGEST", "ARTIST COLLECTIVE"],
    pos: "rt",
  },
  {
    video: "/assets/video/5.mp4",
    image: "/assets/image/c5.png",
    words: ["POWERED", "BY ARTISTS.", "UNITED", "BY STORIES."],
    pos: "lt",
  },
  {
    video: "/assets/video/6.mp4",
    image: "/assets/image/c6.png",
    words: ["CURATE", "EXPERIENCES", "OF A KIND", "WITH US"],
    pos: "rb",
  },
  {
    video: "/assets/video/7.mp4",
    image: "/assets/image/c7.png",
    words: ["ART+TECH+PURPOSE","=","THE NEXT", "BIG LEAP"],
    pos: "lb",
  },
];

const HOLD = 0.5;
const SLIDE = 0.8;

const VideoReel = () => {
  const wrapRef  = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track  = trackRef.current;
      const panels = gsap.utils.toArray(".video-slide", track);
      const vw      = () => window.innerWidth;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: () => "+=" + panels.length * (HOLD + SLIDE) * 1000,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      panels.forEach((_, i) => {
        const xTo = -i * vw();
        if (i === 0) {
          tl.set(track, { x: 0 });
        } else {
          tl.to(track, { x: xTo, duration: SLIDE });
        }
        tl.to({}, { duration: HOLD });
      });

      const onResize = () => {
        gsap.set(track, {
          x: -tl.progress() * (panels.length - 1) * vw(),
        });
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", onResize);

      return () => window.removeEventListener("resize", onResize);
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="relative h-screen overflow-hidden" id="home">
      <div ref={trackRef} className="flex h-full will-change-transform">
        {slides.map((s, i) => (
          <div className="video-slide w-screen h-screen shrink-0" key={i}>
            <VideoSection
              videoSrc={s.video}
              imageSrc={s.image}
              words={s.words}
              pos={s.pos}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoReel;
