import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const GridGlowDistort = ({
  cell = 30,
  lineColor = "rgba(255,255,255,0.06)",
  glowColor = "#ffffff",
  glowCount = 4,
  glowDur = 0,
}) => {
  const wrapRef = useRef(null);
  const glowLayerRef = useRef(null);
  const wRef = useRef(0);
  const hRef = useRef(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    const glowLayer = glowLayerRef.current;

    const resize = () => {
      wRef.current = wrap.offsetWidth;
      hRef.current = wrap.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const cols = Math.ceil(wRef.current / cell);
    const rows = Math.ceil(hRef.current / cell);
    const total = cols * rows;

    const frag = document.createDocumentFragment();
    for (let i = 0; i < total; i++) {
      const div = document.createElement("div");
      div.style.position = "absolute";
      div.style.width = `${cell}px`;
      div.style.height = `${cell}px`;
      const cx = (i % cols) * cell;
      const cy = Math.floor(i / cols) * cell;
      div.style.transform = `translate(${cx}px, ${cy}px)`;
      div.style.opacity = 0;
      div.style.background = glowColor;
      div.style.filter = "blur(6px)";
      frag.appendChild(div);
    }
    glowLayer.appendChild(frag);

    const squares = glowLayer.children;
    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "sine.inOut" } });

    const playGlow = () => {
      const picks = gsap.utils.random(0, total - 1, 1, true);
      const group = Array.from({ length: glowCount }, () => picks());
      group.forEach((idx, k) => {
        const el = squares[idx];
        tl.to(
          el,
          { opacity: 0.8, duration: glowDur * 0.4 },
          k * (glowDur / glowCount) * 0.3
        ).to(el, { opacity: 0, duration: glowDur * 0.6 }, "<0.45");
      });
    };
    playGlow();

    return () => {
      window.removeEventListener("resize", resize);
      tl.kill();
    };
  }, [cell, glowColor, glowCount, glowDur]);

  return (
    <div ref={wrapRef} className="absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, ${lineColor} 0px, ${lineColor} 1px, transparent 1px, transparent ${cell}px),
            repeating-linear-gradient(90deg, ${lineColor} 0px, ${lineColor} 1px, transparent 1px, transparent ${cell}px)
          `,
        }}
      />
      <div
        ref={glowLayerRef}
        className="absolute inset-0 pointer-events-none mix-blend-screen"
      />
    </div>
  );
};

export default GridGlowDistort;