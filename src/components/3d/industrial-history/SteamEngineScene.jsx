import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const Piston = ({ position, speed }) => {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
    }
  });
  return (
    <group ref={meshRef} position={position}>
      <mesh>
        <cylinderGeometry args={[0.12, 0.12, 0.6, 12]} />
        <meshStandardMaterial color="#8B8682" metalness={0.85} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.2, 8]} />
        <meshStandardMaterial color="#696969" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
};

const SteamEngine = () => {
  const flywheelRef = useRef();
  const steamRef = useRef();
  useFrame((state, delta) => {
    if (flywheelRef.current) flywheelRef.current.rotation.z += delta * 1.5;
    if (steamRef.current) {
      steamRef.current.position.y = 1.2 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      steamRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.15;
    }
  });
  return (
    <group>
      {/* Boiler */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.5, 0.5, 1.5, 24]} />
        <meshStandardMaterial color="#8B4513" roughness={0.6} metalness={0.3} />
      </mesh>
      {/* Firebox */}
      <mesh position={[-0.9, -0.2, 0]}>
        <boxGeometry args={[0.4, 0.5, 0.6]} />
        <meshStandardMaterial color="#4A3728" roughness={0.7} />
      </mesh>
      {/* Flywheel */}
      <group ref={flywheelRef} position={[1, 0, 0.7]}>
        <mesh>
          <torusGeometry args={[0.35, 0.05, 12, 24]} />
          <meshStandardMaterial color="#696969" metalness={0.9} roughness={0.1} />
        </mesh>
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <mesh key={i} position={[Math.cos(rad) * 0.35, Math.sin(rad) * 0.35, 0]}>
              <boxGeometry args={[0.04, 0.04, 0.08]} />
              <meshStandardMaterial color="#8B8682" metalness={0.85} roughness={0.2} />
            </mesh>
          );
        })}
      </group>
      {/* Pistons */}
      <Piston position={[0.5, 0.8, 0.4]} speed={2} />
      <Piston position={[0.5, 0.8, -0.4]} speed={2} />
      {/* Steam */}
      <mesh ref={steamRef} position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.2, 12, 12]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.3} roughness={1} />
      </mesh>
    </group>
  );
};

const SteamEngineScene = () => (
  <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
    <Canvas camera={{ position: [0, 1.5, 4], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={100} />
      <pointLight position={[-3, 2, 4]} intensity={50} color="#F97316" />
      <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />
      <SteamEngine />
      <Text position={[0, -1.2, 0]} fontSize={0.12} color="#CBD5E1" anchorX="center">La Máquina de Vapor — 1712</Text>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  </div>
);

export default SteamEngineScene;
