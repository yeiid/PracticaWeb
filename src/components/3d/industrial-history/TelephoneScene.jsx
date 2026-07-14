import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const PhoneBase = () => {
  return (
    <group>
      {/* Mouthpiece */}
      <mesh position={[-0.3, 0.5, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.3, 12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Earpiece */}
      <mesh position={[0.3, 0.5, 0]}>
        <cylinderGeometry args={[0.1, 0.08, 0.3, 12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Connecting arm */}
      <mesh position={[0, 0.7, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Base body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.6, 0.3, 0.4]} />
        <meshStandardMaterial color="#2D2D2D" roughness={0.5} metalness={0.5} />
      </mesh>
      {/* Dial */}
      <mesh position={[0, 0.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.03, 20]} />
        <meshStandardMaterial color="#4A4A4A" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Dial holes */}
      {[...Array(10)].map((_, i) => {
        const angle = (i / 10) * Math.PI * 2 - Math.PI / 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 0.1, 0.18, Math.sin(angle) * 0.1]}>
            <cylinderGeometry args={[0.015, 0.015, 0.04, 6]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
        );
      })}
    </group>
  );
};

const TelephoneScene = () => (
  <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
    <Canvas camera={{ position: [0, 1, 3.5], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={100} />
      <pointLight position={[-3, 2, 4]} intensity={50} color="#F97316" />
      <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />
      <PhoneBase />
      <Text position={[0, -0.8, 0]} fontSize={0.12} color="#CBD5E1" anchorX="center">El Teléfono — 1876</Text>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  </div>
);

export default TelephoneScene;
