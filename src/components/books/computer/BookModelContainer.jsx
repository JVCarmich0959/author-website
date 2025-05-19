// src/components/books/computer/BookModelContainer.jsx
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { BookModel } from "./BookModel";           
import { OrbitControls, Stage } from "@react-three/drei";

export default function BookModelContainer() {
  return (
    <Canvas 
      style={{ width: 300, height: 300 }} 
      camera={{ position: [1, 1, 2], fov: 45 }}
    >
      {/* ambient + key light */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />

      {/* stage will auto‐frame, shadows, etc */}
      <Suspense fallback={null}>
        <Stage environment={null} intensity={0.5} adjustCamera>
          <BookModel />
        </Stage>
      </Suspense>

      {/* auto‐rotate on idle, no panning */}
      <OrbitControls 
        enablePan={false} 
        enableZoom={false}
        autoRotate 
        autoRotateSpeed={3} 
      />
    </Canvas>
  );
}
