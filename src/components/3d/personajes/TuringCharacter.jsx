import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const TapeStrip = ({ position, speed }) => {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * speed) * 0.8;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.7) * 0.1;
    }
  });
  return (
    <group ref={meshRef} position={position}>
      <mesh>
        <boxGeometry args={[1.5, 0.15, 0.01]} />
        <meshStandardMaterial color="#F5F0DC" roughness={0.5} />
      </mesh>
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[-0.6 + i * 0.17, 0, 0.01]}>
          <cylinderGeometry args={[0.025, 0.025, 0.02, 6]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#1a1a1a' : '#F5F0DC'} />
        </mesh>
      ))}
    </group>
  );
};

const Avatar = ({ color }) => {
  const groupRef = useRef();
  useFrame((state) => {
    if (groupRef.current) groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
  });
  return (
    <group ref={groupRef}>
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.45, 24, 24]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} />
      </mesh>
      <mesh position={[-0.15, 1.3, 0.4]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.15, 1.3, 0.4]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Glasses */}
      <mesh position={[-0.15, 1.32, 0.42]}>
        <torusGeometry args={[0.08, 0.01, 8, 16]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.15, 1.32, 0.42]}>
        <torusGeometry args={[0.08, 0.01, 8, 16]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 1.32, 0.43]}>
        <boxGeometry args={[0.06, 0.015, 0.01]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.25, 0.35, 1, 16]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 24]} />
        <meshStandardMaterial color="#252E42" roughness={0.6} metalness={0.4} />
      </mesh>
    </group>
  );
};

const TuringCharacter = () => {
  return (
    <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={100} />
        <pointLight position={[-3, 2, 4]} intensity={50} color="#F97316" />
        <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />
        <Avatar color="#5F9EA0" />
        <TapeStrip position={[-1.2, 0.8, 0.5]} speed={0.4} />
        <TapeStrip position={[1.2, 0.6, -0.3]} speed={-0.5} />
        <TapeStrip position={[0, 1.6, -0.7]} speed={0.6} />
        <Text position={[0, -0.5, 0]} fontSize={0.15} color="#F8FAFC" anchorX="center">Alan Turing</Text>
        <Text position={[0, -0.7, 0]} fontSize={0.08} color="#F97316" anchorX="center">1912 — 1954</Text>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  );
};

export default TuringCharacter;
