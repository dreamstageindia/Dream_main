// src/components/GLTFBackground.jsx
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";

// Tell Drei’s loader to pre‐warm the scene
useGLTF.preload("/assets/3d/stage/scene.gltf");

function Model() {
  // load from /scene.gltf (public folder)
  const { scene } = useGLTF("/assets/3d/stage/scene.gltf");
  const meshRef = useRef();
  const { mouse } = useThree();

  // ensure textures/materials survive React refresh
  React.useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        // enable shadows etc if you like
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return null;
  }, [scene]);

  // rotate with cursor
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = mouse.x * Math.PI * 0.25; // ±45°
      meshRef.current.rotation.x = mouse.y * Math.PI * 0.1;  // ±18°
    }
  });

  return <primitive ref={meshRef} object={scene} dispose={null} />;
}

export default function GLTFBackground() {
  return (
    <Canvas
      className="absolute inset-0 -z-20"
      shadows
      camera={{ position: [0, 1, 3], fov: 100 }}
    >
      {/* lights */}
      <ambientLight intensity={1} />
      <directionalLight castShadow position={[5, 10, 5]} intensity={1} />

      {/* your GLTF model */}
      <Suspense fallback={null}>
        <Model />
      </Suspense>

      {/* optional nice damping */}
      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
    </Canvas>
  );
}
