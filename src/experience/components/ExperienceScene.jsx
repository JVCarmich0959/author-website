import React, { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Sigil({ color, reducedMotion }) {
  const meshRef = useRef(null);

  useFrame((state) => {
    if (reducedMotion || !meshRef.current) return;
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.05;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <torusKnotGeometry args={[1.2, 0.35, 120, 12]} />
      <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
    </mesh>
  );
}

function SceneRig({ visualState }) {
  const { camera, scene } = useThree();

  useEffect(() => {
    if (!visualState) return;
    camera.position.set(...visualState.camera);
    camera.lookAt(0, 0, 0);
    if (visualState.fog) {
      const [color, near, far] = visualState.fog;
      scene.fog = new THREE.Fog(color, near, far);
    }
  }, [camera, scene, visualState]);

  return null;
}

export default function ExperienceScene({ visualState, reducedMotion }) {
  const accent = visualState?.accent ?? "#b9211d";
  const ambientIntensity = visualState?.ambient ?? 0.4;
  const spotIntensity = visualState?.spot ?? 0.8;

  const background = useMemo(() => ({
    color: visualState?.fog?.[0] ?? "#050607",
  }), [visualState]);

  return (
    <div className="experience-scene" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: visualState?.camera ?? [0, 2, 6], fov: 50 }}
      >
        <color attach="background" args={[background.color]} />
        <ambientLight intensity={ambientIntensity} />
        <directionalLight position={[4, 6, 5]} intensity={spotIntensity} color={accent} />
        <SceneRig visualState={visualState} />
        <Sigil color={accent} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
