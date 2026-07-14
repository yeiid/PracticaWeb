import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const CandleFlame = ({ position }) => {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 8) * 0.15;
      meshRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 6) * 0.1;
    }
  });
  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#FF8C00" emissive="#FF4500" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0, 0.08, 0]}>
        <coneGeometry args={[0.03, 0.08, 6]} />
        <meshStandardMaterial color="#FFD700" emissive="#FF8C00" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

const SafetyLamp = () => {
  return (
    <group>
      {/* Base */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 0.15, 16]} />
        <meshStandardMaterial color="#8B8682" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Oil reservoir */}
      <mesh position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.15, 12]} />
        <meshStandardMaterial color="#B87333" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Glass cylinder */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.6, 16, 1, true]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.3} roughness={0.1} metalness={0.2} />
      </mesh>
      {/* Wire guard */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <mesh key={i} position={[Math.cos(rad) * 0.14, 0.1, Math.sin(rad) * 0.14]}>
            <cylinderGeometry args={[0.005, 0.005, 0.55, 4]} />
            <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
          </mesh>
        );
      })}
      {/* Top cap */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.14, 0.12, 0.1, 12]} />
        <meshStandardMaterial color="#8B8682" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Flame */}
      <CandleFlame position={[0, 0, 0]} />
    </group>
  );
};

const SafetyLampScene = () => (
  <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
    <Canvas camera={{ position: [0, 0.5, 3], fov: 45 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={80} />
      <pointLight position={[0, 0, 2]} intensity={30} color="#FF8C00" />
      <pointLight position={[0, -2, 3]} intensity={20} color="#38BDF8" />
      <SafetyLamp />
      <Text position={[0, -0.9, 0]} fontSize={0.12} color="#CBD5E1" anchorX="center">La Lámpara de Seguridad — 1826</Text>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  </div>
);

export default SafetyLampScene;
