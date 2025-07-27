// src/components/CardSwap.jsx
import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
} from "react";
import gsap from "gsap";

export const Card = forwardRef(
  ({ customClass, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`
        absolute top-1/2 left-1/2
        rounded-xl border border-white/30 bg-black
        [transform-style:preserve-3d]
        [will-change:transform]
        [backface-visibility:hidden]
        ${customClass} ${rest.className || ""}
      `}
    />
  )
);
Card.displayName = "Card";

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

const CardSwap = ({
  cardDistance = 60,
  verticalDistance = 70,
  delay = 3000,
  pauseOnHover = false,
  skewAmount = 9,
  easing = "elastic",
  children,
}) => {
  const config =
    easing === "elastic"
      ? {
          ease: "elastic.out(0.6,0.9)",
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          overlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: "power1.inOut",
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          overlap: 0.45,
          returnDelay: 0.2,
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(() => childArr.map(() => React.createRef()), [childArr]);
  const order = useRef(childArr.map((_, i) => i));
  const interval = useRef();
  const container = useRef(null);

  const layout = () => {
    const total = refs.length;
    order.current.forEach((cardIdx, slotIdx) => {
      placeNow(
        refs[cardIdx].current,
        makeSlot(slotIdx, cardDistance, verticalDistance, total),
        skewAmount
      );
    });
  };

  const animateCycle = (frontIndex, onEnd) => {
    const total = refs.length;
    const frontEl = refs[frontIndex].current;
    const rest = order.current.filter((i) => i !== frontIndex);
    const tl = gsap.timeline({ defaults: { ease: config.ease } });

    tl.to(frontEl, { y: "+=500", duration: config.durDrop })
      .addLabel("promote", `-=${config.durDrop * config.overlap}`)
      .call(() => {
        rest.forEach((idx, i) => {
          const el = refs[idx].current;
          const slot = makeSlot(i, cardDistance, verticalDistance, total);
          gsap.set(el, { zIndex: slot.zIndex });
          gsap.to(el, { x: slot.x, y: slot.y, z: slot.z, duration: config.durMove, delay: i * 0.15 });
        });
      }, null, "promote")
      .addLabel("return", `promote+=${config.durMove * config.returnDelay}`)
      .call(() => {
        const backSlot = makeSlot(total - 1, cardDistance, verticalDistance, total);
        gsap.set(frontEl, { zIndex: backSlot.zIndex, x: backSlot.x, z: backSlot.z });
        gsap.to(frontEl, { y: backSlot.y, duration: config.durReturn });
      }, null, "return")
      .call(() => {
        order.current = [...rest, frontIndex];
        onEnd && onEnd();
      });
  };

  useEffect(() => {
    layout();
    const cycle = () => animateCycle(order.current[0]);
    cycle();
    interval.current = setInterval(cycle, delay);

    if (pauseOnHover && container.current) {
      const el = container.current;
      el.addEventListener("mouseenter", () => clearInterval(interval.current));
      el.addEventListener("mouseleave", () => (interval.current = setInterval(cycle, delay)));
      return () => {
        el.removeEventListener("mouseenter", () => clearInterval(interval.current));
        el.removeEventListener("mouseleave", () => (interval.current = setInterval(cycle, delay)));
      };
    }
    return () => clearInterval(interval.current);
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  const handleClick = (i) => {
    clearInterval(interval.current);
    if (order.current[0] !== i) {
      order.current = [i, ...order.current.filter((x) => x !== i)];
      layout();
      animateCycle(i, () => (interval.current = setInterval(() => animateCycle(order.current[0]), delay)));
    } else {
      interval.current = setInterval(() => animateCycle(order.current[0]), delay);
    }
  };

  return (
    <div
      ref={container}
      className="relative w-full h-full flex items-center justify-center perspective-[900px] overflow-visible"
    >
      {childArr.map((child, i) =>
        isValidElement(child)
          ? cloneElement(child, {
              key: i,
              ref: refs[i],
              onClick: () => handleClick(i),
            })
          : child
      )}
    </div>
  );
};

export default CardSwap;
