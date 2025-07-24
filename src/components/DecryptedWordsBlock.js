// src/components/DecryptedWordsBlock.jsx
import React, { useEffect, useRef, useState } from "react";

const randFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const DecryptedWordsBlock = ({
  lines = [],                      // array of strings (each = one line)
  speed = 45,                      // interval ms
  maxIterations = 12,              // how many scrambles before reveal
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  animateOn = "view",              // "view" or "hover"
  className = "",                  // applied to revealed words
  encryptedClassName = "opacity-40 blur-[1px]",
}) => {
  const containerRef = useRef(null);
  const [displayWords, setDisplayWords] = useState([]); // [{w:'WORD', r:false}, ...]
  const [iter, setIter] = useState(0);
  const [active, setActive] = useState(false);
  const [revealed, setRevealed] = useState(false);

  // Flatten words, keep line indexes
  const flatWords = React.useMemo(() => {
    const arr = [];
    lines.forEach((line, li) => {
      line.split(" ").forEach((w, wi) => {
        arr.push({ word: w, line: li, index: `${li}-${wi}` });
      });
    });
    return arr;
  }, [lines]);

  // Initialize display state
  useEffect(() => {
    setDisplayWords(flatWords.map(({ word }) => ({ w: word, r: false })));
    setIter(0);
    setActive(false);
    setRevealed(false);
  }, [flatWords]);

  // View trigger
  useEffect(() => {
    if (animateOn !== "view") return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !revealed) {
            setActive(true);
          }
        });
      },
      { threshold: 0.15 }
    );
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [animateOn, revealed]);

  // Hover trigger
  const hoverProps =
    animateOn === "hover"
      ? {
          onMouseEnter: () => !revealed && setActive(true),
        }
      : {};

  // Main scramble loop
  useEffect(() => {
    if (!active || revealed) return;
    const id = setInterval(() => {
      setIter((i) => i + 1);
      setDisplayWords((prev) =>
        prev.map((obj) => {
          if (obj.r) return obj; // already revealed

          if (iter >= maxIterations) {
            // reveal
            return { ...obj, w: obj.w, r: true };
          } else {
            // scramble word (keep length)
            const scrambled = obj.w
              .split("")
              .map((c) => (c === " " ? " " : randFrom(characters)))
              .join("");
            return { ...obj, w: scrambled };
          }
        })
      );

      if (iter >= maxIterations) {
        clearInterval(id);
        setRevealed(true);
      }
    }, speed);

    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, iter, revealed, speed, maxIterations, characters]);

  // Build lines back
  const renderedLines = React.useMemo(() => {
    const byLine = [];
    lines.forEach((_, li) => byLine.push([]));

    displayWords.forEach((dw, idx) => {
      const lineIdx = flatWords[idx].line;
      byLine[lineIdx].push(dw);
    });

    return byLine.map((arr, li) => (
      <span key={li} className="block">
        {arr.map((dw, wi) => (
          <span
            key={wi}
            className={dw.r ? className : encryptedClassName}
            style={{ marginRight: "0.3em" }}
          >
            {dw.w}
          </span>
        ))}
      </span>
    ));
  }, [displayWords, flatWords, lines, className, encryptedClassName]);

  return (
    <span
      ref={containerRef}
      className={`inline-block whitespace-pre-wrap ${animateOn === "hover" ? "cursor-pointer" : ""}`}
      {...hoverProps}
    >
      {renderedLines}
    </span>
  );
};

export default DecryptedWordsBlock;
