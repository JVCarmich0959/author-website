// src/components/hero/Shape.jsx
import { Icosahedron } from "@react-three/drei";
import { MeshDistortMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Shape = () => {
  const mesh = useRef();

  // slow, subtle spin + pulse
  useFrame(({ clock }) => {
    mesh.current.rotation.y = clock.getElapsedTime() * 0.1;
    mesh.current.rotation.x = clock.getElapsedTime() * 0.05;
    // gentle scale pulsation
    const s = 2.2 + Math.sin(clock.getElapsedTime() * 0.6) * 0.05;
    mesh.current.scale.set(s, s, s);
  });

  return (
    <>
      {/* fractured orb */}
      <Icosahedron ref={mesh} args={[1, 1]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          attach="material"
          color="#2c001e"        // nearly-black plum
          emissive="#3f0025"     // faint inner glow
          emissiveIntensity={0.3}
          distort={0.6}          // more jagged surface wobble
          speed={0.8}            // slower, brooding undulation
          roughness={0.9}
          metalness={0.4}
        />
      </Icosahedron>

      {/* ambient fill */}
      <ambientLight intensity={0.2} />

      {/* moody accent lights */}
      <pointLight position={[5, 3, 5]} intensity={0.7} color="#4b002b" />
      <pointLight position={[-4, -2, -3]} intensity={0.4} color="#11001a" />
    </>
  );
};

export default Shape;
