// src/components/ScrollStack.jsx
import { useLayoutEffect, useRef, useCallback } from "react";

export const ScrollStackItem = ({ children, itemClassName = "" }) => (
  <div
    className={`scroll-stack-card relative w-full h-80 my-8 p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: "hidden",
      transformStyle: "preserve-3d",
    }}
  >
    {children}
  </div>
);

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete,
}) => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const stackCompletedRef = useRef(false);
  const rafRef = useRef(null);
  const isUpdatingRef = useRef(false);

  const parsePercentage = useCallback((v, h) => {
    if (typeof v === "string" && v.includes("%")) return (parseFloat(v) / 100) * h;
    return parseFloat(v);
  }, []);

  const calculateProgress = useCallback((scrollY, start, end) => {
    if (scrollY < start) return 0;
    if (scrollY > end) return 1;
    return (scrollY - start) / (end - start);
  }, []);

  const update = useCallback(() => {
    if (isUpdatingRef.current) return;
    isUpdatingRef.current = true;

    const container = containerRef.current;
    if (!container || !cardsRef.current.length) {
      isUpdatingRef.current = false;
      return;
    }

    const scrollY = window.scrollY;
    const viewportH = window.innerHeight;
    const stackPosPx = parsePercentage(stackPosition, viewportH);
    const scaleEndPosPx = parsePercentage(scaleEndPosition, viewportH);

    const endEl = container.querySelector(".scroll-stack-end");
    const endTop = endEl ? endEl.getBoundingClientRect().top + scrollY : 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const cardTop = rect.top + scrollY;

      const triggerStart = cardTop - stackPosPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPosPx;
      const pinStart = triggerStart;
      const pinEnd = endTop - viewportH / 2;

      const scaleProgress = calculateProgress(scrollY, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);

      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      // blur
      let blur = 0;
      if (blurAmount) {
        let topIdx = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jRect = cardsRef.current[j].getBoundingClientRect();
          const jTop = jRect.top + scrollY;
          const jStart = jTop - stackPosPx - itemStackDistance * j;
          if (scrollY >= jStart) topIdx = j;
        }
        if (i < topIdx) {
          const depth = topIdx - i;
          blur = Math.max(0, depth * blurAmount);
        }
      }

      // translate
      let translateY = 0;
      const isPinned = scrollY >= pinStart && scrollY <= pinEnd;
      if (isPinned) {
        translateY = scrollY - cardTop + stackPosPx + itemStackDistance * i;
      } else if (scrollY > pinEnd) {
        translateY = pinEnd - cardTop + stackPosPx + itemStackDistance * i;
      }

      const newT = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };

      const lastT = lastTransformsRef.current.get(i);
      const changed =
        !lastT ||
        Math.abs(lastT.translateY - newT.translateY) > 0.1 ||
        Math.abs(lastT.scale - newT.scale) > 0.001 ||
        Math.abs(lastT.rotation - newT.rotation) > 0.1 ||
        Math.abs(lastT.blur - newT.blur) > 0.1;

      if (changed) {
        const transform = `translate3d(0, ${newT.translateY}px, 0) scale(${newT.scale}) rotate(${newT.rotation}deg)`;
        const filter = newT.blur ? `blur(${newT.blur}px)` : "";
        card.style.transform = transform;
        card.style.filter = filter;
        lastTransformsRef.current.set(i, newT);
      }

      if (i === cardsRef.current.length - 1) {
        const inView = scrollY >= pinStart && scrollY <= pinEnd;
        if (inView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!inView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage,
  ]);

  const onScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      update();
    });
  }, [update]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    cardsRef.current = Array.from(container.querySelectorAll(".scroll-stack-card"));
    const cache = lastTransformsRef.current;

    cardsRef.current.forEach((card, i) => {
      if (i < cardsRef.current.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = "transform, filter";
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
      card.style.transform = "translateZ(0)";
      card.style.perspective = "1000px";
    });

    // initial render
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      stackCompletedRef.current = false;
      cardsRef.current = [];
      cache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    update,
    onScroll,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-visible ${className}`.trim()}
    >
      {/* sticky viewport for stack animation */}
      <div className="relative">
        <div className="pt-[20vh] px-20 pb-[50rem] min-h-screen">
          {children}
          <div className="scroll-stack-end w-full h-px" />
        </div>
      </div>
    </div>
  );
};

export default ScrollStack;
