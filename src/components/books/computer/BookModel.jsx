// src/components/books/computer/BookModel.jsx
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";

// 1) Named export of your loaded scene
export function BookModel(props) {
  const { scene } = useGLTF("/MelissaBook.glb");
  return <primitive object={scene} {...props} />;
}

// 2) Preload for better performance
useGLTF.preload("/MelissaBook.glb");

// 3) Default export: a small Canvas component you can drop in anywhere
export default function BookModelCanvas({ width = 300, height = 300 }) {
  return (
    <Canvas
      style={{ width, height }}
      camera={{ position: [1, 1, 2], fov: 45 }}
    >
      {/* basic lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />

      {/* render the actual book */}
      <Suspense fallback={null}>
        <BookModel />
      </Suspense>

      {/* optional user controls */}
      <OrbitControls enablePan={false} />
    </Canvas>
  );
}
