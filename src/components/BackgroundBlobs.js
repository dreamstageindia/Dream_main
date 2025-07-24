// src/components/BackgroundBlobs.jsx
import React, { useRef, useEffect } from "react";

export default function BackgroundBlobs({
  blobCount = 14,
  speed = 0.25,
  maxRadius = 220,
  minRadius = 80,
  colors = ["#6EE7F9", "#A78BFA", "#F472B6", "#FDE68A", "#34D399"],
  opacity = 0.22,
  blendMode = "screen", // "lighter", "overlay", etc.
}) {
  const canvasRef = useRef(null);
  const blobsRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    blobsRef.current = Array.from({ length: blobCount }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * (maxRadius - minRadius) + minRadius,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.globalCompositeOperation = blendMode;

      blobsRef.current.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;

        if (b.x < -b.r) b.x = canvas.width + b.r;
        if (b.x > canvas.width + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = canvas.height + b.r;
        if (b.y > canvas.height + b.r) b.y = -b.r;

        const grd = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        const rgba = hexToRgba(b.color, opacity);
        grd.addColorStop(0, rgba);
        grd.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
      rafRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [blobCount, speed, maxRadius, minRadius, colors, opacity, blendMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
}

// small helper
function hexToRgba(hex, a = 1) {
  const h = hex.replace("#", "");
  const bigint = parseInt(h.length === 3 ? h.split("").map((c)=>c+c).join("") : h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r},${g},${b},${a})`;
}
