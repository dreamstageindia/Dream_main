// src/components/BubbleBackground.jsx
"use client";

import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";

/* utility */
const random = (min, max) => Math.random() * (max - min) + min;

/* strict palette: blue, yellow, orange */
const COLORS = [ "#fcbc31","#09a398", "#cc2e10"]; // blue-500, yellow-400, orange-400

function Bubbles({ count = 30 }) {
  const bubbles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        key: i,
        position: [random(-10, 10), random(-5, 5), random(-10, 0)],
        radius: random(0.5, 2),
        speed: random(0.5, 2),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotationIntensity: random(0.1, 0.6),
      })),
    [count]
  );

  return bubbles.map((b) => (
    <Float
      key={b.key}
      speed={b.speed}
      rotationIntensity={b.rotationIntensity}
      floatIntensity={0.5}
    >
      <mesh position={b.position}>
        <sphereGeometry args={[b.radius, 32, 32]} />
        <meshStandardMaterial
          color={b.color}
          metalness={0.6}
          roughness={0.25}
          envMapIntensity={1}
          emissive={b.color}
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  ));
}

export default function BubbleBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 50 }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <Environment preset="city" />
      <Bubbles count={40} />
    </Canvas>
  );
}
