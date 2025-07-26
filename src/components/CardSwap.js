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

// Single card wrapper
export const Card = forwardRef(
  ({ customClass, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`
        absolute top-1/2 left-1/2
        rounded-xl border border-white bg-black
        [transform-style:preserve-3d]
        [will-change:transform]
        [backface-visibility:hidden]
        ${customClass ?? ""} ${rest.className ?? ""}
      `.trim()}
    />
  )
);
Card.displayName = "Card";

// compute slot positions
const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

// apply a slot to an element
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
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 3000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 9,
  easing = "elastic",
  children,
}) => {
  // timing config
  const config =
    easing === "elastic"
      ? {
          ease: "elastic.out(0.6,0.9)",
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: "power1.inOut",
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        };

  // flatten children into array
  const childArr = useMemo(() => Children.toArray(children), [children]);
  // create refs
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    [childArr.length]
  );
  // current order array of indices
  const order = useRef(childArr.map((_, i) => i));
  const intervalRef = useRef();
  const container = useRef(null);

  // position all cards according to order.current
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

  // The standard drop/promote/return cycle, for a given frontIndex
  const animateCycle = (frontIndex, callback) => {
    const total = refs.length;
    const frontEl = refs[frontIndex].current;
    const rest = order.current.filter((i) => i !== frontIndex);

    const tl = gsap.timeline({ defaults: { ease: config.ease } });
    // drop the front card
    tl.to(frontEl, { y: "+=500", duration: config.durDrop });
    // promote the others during the drop
    tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
    rest.forEach((idx, i) => {
      const el = refs[idx].current;
      const slot = makeSlot(i, cardDistance, verticalDistance, total);
      tl.set(el, { zIndex: slot.zIndex }, "promote");
      tl.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          duration: config.durMove,
        },
        `promote+=${i * 0.15}`
      );
    });
    // return front to the back slot
    const backSlot = makeSlot(total - 1, cardDistance, verticalDistance, total);
    tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
    tl.call(() => {
      gsap.set(frontEl, { zIndex: backSlot.zIndex });
    }, null, "return");
    tl.set(frontEl, { x: backSlot.x, z: backSlot.z }, "return");
    tl.to(
      frontEl,
      {
        y: backSlot.y,
        duration: config.durReturn,
      },
      "return"
    );
    // at the end, reorder the array
    tl.call(() => {
      order.current = [...rest, frontIndex];
      callback && callback();
    });
  };

  useEffect(() => {
    layout();

    const cycle = () => animateCycle(order.current[0]);
    cycle();
    intervalRef.current = setInterval(cycle, delay);

    if (pauseOnHover) {
      const n = container.current;
      const pause = () => clearInterval(intervalRef.current);
      const resume = () => (intervalRef.current = setInterval(cycle, delay));
      n.addEventListener("mouseenter", pause);
      n.addEventListener("mouseleave", resume);
      return () => {
        n.removeEventListener("mouseenter", pause);
        n.removeEventListener("mouseleave", resume);
        clearInterval(intervalRef.current);
      };
    }

    return () => clearInterval(intervalRef.current);
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  // click handler → trigger a manual cycle with the clicked card
  const handleClick = (clickedIndex) => {
    clearInterval(intervalRef.current);
    // if click is already the front, do nothing
    if (order.current[0] === clickedIndex) {
      intervalRef.current = setInterval(() => animateCycle(order.current[0]), delay);
      return;
    }
    // re‐layout so clicked element moves into front slot
    // build new order where clicked is first, but keep relative order
    order.current = [
      clickedIndex,
      ...order.current.filter((i) => i !== clickedIndex),
    ];
    layout();
    // then run the same cycle on it
    animateCycle(clickedIndex, () => {
      // then resume the auto‐cycle with the next front
      intervalRef.current = setInterval(
        () => animateCycle(order.current[0]),
        delay
      );
    });
    onCardClick?.(clickedIndex);
  };

  // render with click handlers attached
  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (e) => {
            child.props.onClick?.(e);
            handleClick(i);
          },
        })
      : child
  );

  return (
    <div
      ref={container}
      className="
        absolute inset-0
        flex items-center justify-end
        perspective-[900px]
        overflow-visible
        px-6 md:px-12 lg:px-20
      "
      style={{ width, height }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;
