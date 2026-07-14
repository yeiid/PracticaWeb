import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const LightBulb = () => {
  const glowRef = useRef();
  useFrame((state) => {
    if (glowRef.current) {
      glowRef.current.material.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });
  return (
    <group>
      {/* Glass bulb */}
      <mesh ref={glowRef} position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshStandardMaterial color="#FFFACD" emissive="#FFD700" emissiveIntensity={0.5} transparent opacity={0.6} roughness={0.1} />
      </mesh>
      {/* Filament */}
      <mesh position={[0, 0.3, 0]}>
        <torusGeometry args={[0.08, 0.01, 8, 16]} />
        <meshStandardMaterial color="#FF8C00" emissive="#FF4500" emissiveIntensity={1} />
      </mesh>
      {/* Stem */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Base */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.15, 12]} />
        <meshStandardMaterial color="#B87333" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Screw threads */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, -0.22 + i * 0.04, 0]}>
          <torusGeometry args={[0.13, 0.008, 6, 16]} />
          <meshStandardMaterial color="#B87333" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
};

const LightBulbScene = () => (
  <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
    <Canvas camera={{ position: [0, 0.5, 3], fov: 45 }}>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0.5, 2]} intensity={50} color="#FFD700" />
      <pointLight position={[5, 5, 5]} intensity={60} />
      <pointLight position={[-3, 2, 4]} intensity={30} color="#F97316" />
      <LightBulb />
      <Text position={[0, -0.7, 0]} fontSize={0.12} color="#CBD5E1" anchorX="center">La Bombilla Eléctrica — 1879</Text>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  </div>
);

export default LightBulbScene;
