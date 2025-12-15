"use client";
import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

function Pig({ step }: { step: number }) {
  const pose = useMemo(() => {
    let y = -0.22;
    let rotY = -0.08;
    let wing = 0.08;
    let scale = 1.0;

    if (step === 0) {
      y = -0.28;
      rotY = -0.10;
      wing = 0.05;
      scale = 0.98;
    } else if (step === 1) {
      y = -0.24;
      rotY = -0.08;
      wing = 0.08;
      scale = 0.99;
    } else if (step === 2) {
      y = -0.18;
      rotY = -0.04;
      wing = 0.10;
      scale = 1.0;
    } else if (step === 3) {
      y = -0.08;
      rotY = -0.02;
      wing = 0.12;
      scale = 1.01;
    } else if (step >= 4) {
      // "So yeah / Pigs fly" and after
      y = 0.22;
      rotY = 0.04;
      wing = 0.22;
      scale = 1.03;
    }

    return { y, rotY, wing, scale };
  }, [step]);

  return (
    <group position={[0, pose.y, 0]} rotation={[0, pose.rotY, 0]} scale={pose.scale}>
      {/* Body */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.75, 64, 64]} />
        <meshStandardMaterial color="#C97A9B" roughness={0.55} metalness={0.05} />
      </mesh>

      {/* Snout */}
      <mesh position={[0, -0.05, 0.68]} castShadow>
        <sphereGeometry args={[0.34, 48, 48]} />
        <meshStandardMaterial color="#B96A8D" roughness={0.6} metalness={0.03} />
      </mesh>

      {/* Nostrils */}
      <mesh position={[-0.10, -0.06, 0.94]}>
        <sphereGeometry args={[0.06, 24, 24]} />
        <meshStandardMaterial color="#2A1A22" roughness={0.9} />
      </mesh>
      <mesh position={[0.10, -0.06, 0.94]}>
        <sphereGeometry args={[0.06, 24, 24]} />
        <meshStandardMaterial color="#2A1A22" roughness={0.9} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.20, 0.18, 0.55]}>
        <sphereGeometry args={[0.08, 24, 24]} />
        <meshStandardMaterial color="#111014" roughness={0.4} />
      </mesh>
      <mesh position={[0.20, 0.18, 0.55]}>
        <sphereGeometry args={[0.08, 24, 24]} />
        <meshStandardMaterial color="#111014" roughness={0.4} />
      </mesh>

      {/* Wings */}
      <group position={[-0.62, 0.18, -0.05]} rotation={[0, 0.25, 0]}>
        <mesh castShadow rotation={[0, 0, pose.wing]}>
          <boxGeometry args={[0.42, 0.18, 0.02]} />
          <meshStandardMaterial color="#F3F0F4" roughness={0.75} />
        </mesh>
      </group>
      <group position={[0.62, 0.18, -0.05]} rotation={[0, -0.25, 0]}>
        <mesh castShadow rotation={[0, 0, -pose.wing]}>
          <boxGeometry args={[0.42, 0.18, 0.02]} />
          <meshStandardMaterial color="#F3F0F4" roughness={0.75} />
        </mesh>
      </group>
    </group>
  );
}

export default function Scene3D({ step }: { step: number }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.15, 3.2], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#07070A"]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[2.5, 3.5, 2.0]} intensity={1.2} castShadow />
      <pointLight position={[-2.0, 1.0, 1.5]} intensity={0.65} />

      <Suspense fallback={null}>
        <Environment preset="warehouse" />
      </Suspense>

      <Pig step={step} />
    </Canvas>
  );
}