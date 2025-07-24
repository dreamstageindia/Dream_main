// src/components/Crosshair.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const lerp = (a, b, n) => (1 - n) * a + n * b;

const getMousePos = (e, container) => {
  if (container) {
    const bounds = container.getBoundingClientRect();
    return { x: e.clientX - bounds.left, y: e.clientY - bounds.top };
  }
  return { x: e.clientX, y: e.clientY };
};

const Crosshair = ({ color = "white", containerRef = null }) => {
  const cursorRef = useRef(null);
  const lineH = useRef(null);
  const lineV = useRef(null);
  const filterXRef = useRef(null);
  const filterYRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  /* ✅ update color whenever prop changes */
  useEffect(() => {
    if (!lineH.current || !lineV.current) return;
    gsap.set([lineH.current, lineV.current], { backgroundColor: color });
  }, [color]);

  useEffect(() => {
    const target = containerRef?.current || window;

    const handleMouseMove = (ev) => {
      mouseRef.current = getMousePos(ev, containerRef?.current);

      if (containerRef?.current) {
        const b = containerRef.current.getBoundingClientRect();
        const inside =
          ev.clientX >= b.left &&
          ev.clientX <= b.right &&
          ev.clientY >= b.top &&
          ev.clientY <= b.bottom;

        gsap.to([lineH.current, lineV.current], { opacity: inside ? 1 : 0, duration: 0.2 });
      }
    };

    target.addEventListener("mousemove", handleMouseMove);

    const rendered = {
      tx: { prev: 0, cur: 0, amt: 0.15 },
      ty: { prev: 0, cur: 0, amt: 0.15 },
    };

    gsap.set([lineH.current, lineV.current], { opacity: 0 });

    const firstMove = () => {
      rendered.tx.prev = rendered.tx.cur = mouseRef.current.x;
      rendered.ty.prev = rendered.ty.cur = mouseRef.current.y;
      gsap.to([lineH.current, lineV.current], { duration: 0.9, ease: "power3.out", opacity: 1 });
      requestAnimationFrame(render);
      target.removeEventListener("mousemove", firstMove);
    };
    target.addEventListener("mousemove", firstMove);

    /* noise timeline */
    const primitiveValues = { turbulence: 0 };
    const tl = gsap
      .timeline({
        paused: true,
        onStart: () => {
          lineH.current.style.filter = `url(#filter-noise-x)`;
          lineV.current.style.filter = `url(#filter-noise-y)`;
        },
        onUpdate: () => {
          filterXRef.current.setAttribute("baseFrequency", primitiveValues.turbulence);
          filterYRef.current.setAttribute("baseFrequency", primitiveValues.turbulence);
        },
        onComplete: () => {
          lineH.current.style.filter = lineV.current.style.filter = "none";
        },
      })
      .to(primitiveValues, {
        duration: 0.5,
        ease: "power1",
        startAt: { turbulence: 1 },
        turbulence: 0,
      });

    const enter = () => tl.restart();
    const leave = () => tl.progress(1).kill();

    const render = () => {
      rendered.tx.cur = mouseRef.current.x;
      rendered.ty.cur = mouseRef.current.y;
      rendered.tx.prev = lerp(rendered.tx.prev, rendered.tx.cur, rendered.tx.amt);
      rendered.ty.prev = lerp(rendered.ty.prev, rendered.ty.cur, rendered.ty.amt);

      gsap.set(lineV.current, { x: rendered.tx.prev });
      gsap.set(lineH.current, { y: rendered.ty.prev });

      requestAnimationFrame(render);
    };

    const links = containerRef?.current
      ? containerRef.current.querySelectorAll("a")
      : document.querySelectorAll("a");

    links.forEach((l) => {
      l.addEventListener("mouseenter", enter);
      l.addEventListener("mouseleave", leave);
    });

    return () => {
      target.removeEventListener("mousemove", handleMouseMove);
      target.removeEventListener("mousemove", firstMove);
      links.forEach((l) => {
        l.removeEventListener("mouseenter", enter);
        l.removeEventListener("mouseleave", leave);
      });
    };
  }, [containerRef]);

  return (
    <div
      ref={cursorRef}
      className={`${containerRef ? "absolute" : "fixed"} top-0 left-0 w-full h-full pointer-events-none z-[10000]`}
    >
      <svg className="absolute top-0 left-0 w-full h-full">
        <defs>
          <filter id="filter-noise-x">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.000001"
              numOctaves="1"
              ref={filterXRef}
            />
            <feDisplacementMap in="SourceGraphic" scale="40" />
          </filter>
          <filter id="filter-noise-y">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.000001"
              numOctaves="1"
              ref={filterYRef}
            />
            <feDisplacementMap in="SourceGraphic" scale="40" />
          </filter>
        </defs>
      </svg>

      <div
        ref={lineH}
        className="absolute w-full h-px pointer-events-none opacity-0 translate-y-1/2"
      />
      <div
        ref={lineV}
        className="absolute h-full w-px pointer-events-none opacity-0 translate-x-1/2"
      />
    </div>
  );
};

export default Crosshair;
