import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pins the hero section and zooms the video while scrolling down.
 * Reverse happens automatically on scroll-up because scrub: true.
 */
export default function useHeroScrollZoom(wrapperRef, videoRef) {
  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const video = videoRef.current;

    if (!wrapper || !video) return;

    const ctx = gsap.context(() => {
      // Pin hero for one viewport height
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: true,
      });

      // Zoom video
      gsap.to(video, {
        scale: 1.25,
        transformOrigin: "center center",
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, [wrapperRef, videoRef]);
}
