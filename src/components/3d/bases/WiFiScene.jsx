import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

const WiFiRing = ({ radius, color, speed, delay }) => {
  const ringRef = useRef();
  const materialRef = useRef();

  useFrame((state) => {
    if (ringRef.current) {
      const t = (state.clock.elapsedTime * speed + delay) % 3;
      const scale = 0.3 + t * 0.7;
      ringRef.current.scale.set(scale, scale, scale);
      if (materialRef.current) {
        materialRef.current.opacity = 1 - t / 3;
      }
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, 0.03, 8, 64]} />
      <meshStandardMaterial ref={materialRef} color={color} emissive={color} emissiveIntensity={0.5} transparent />
    </mesh>
  );
};

const Device = ({ position, label, color }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.08;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.3, 0.4, 0.1]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} roughness={0.3} metalness={0.7} />
      </mesh>
      <Text position={[position[0], position[1] - 0.45, position[2]]} fontSize={0.1} color="#CBD5E1" anchorX="center">
        {label}
      </Text>
    </group>
  );
};

const WiFiScene = () => (
  <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
    <Canvas camera={{ position: [0, 0.5, 6], fov: 45 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={80} />
      <pointLight position={[-3, 2, 4]} intensity={40} color="#F97316" />
      <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />

      {/* Router */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.6, 0.15, 0.3]} />
        <meshStandardMaterial color="#F97316" emissive="#F97316" emissiveIntensity={0.4} roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Antenna */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.8, 8]} />
        <meshStandardMaterial color="#94A3B8" />
      </mesh>
      <mesh position={[0, 1.45, 0]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#F97316" emissive="#F97316" emissiveIntensity={0.8} />
      </mesh>

      <Text position={[0, -0.3, 0]} fontSize={0.13} color="#F97316" anchorX="center">
        Router WiFi
      </Text>

      {/* WiFi Rings */}
      {[1, 1.5, 2, 2.5].map((r, i) => (
        <WiFiRing key={i} radius={r} color={i % 2 === 0 ? '#F97316' : '#38BDF8'} speed={1.2} delay={i * 0.7} />
      ))}

      {/* Devices */}
      <Device position={[-2, 0.5, 1]} label="Laptop" color="#38BDF8" />
      <Device position={[2, 0.5, 1]} label="Smartphone" color="#10b981" />
      <Device position={[-1.5, -0.5, 1.5]} label="Tablet" color="#8b5cf6" />
      <Device position={[1.5, -0.5, 1.5]} label="Smart TV" color="#ec4899" />

      <Text position={[0, 2.5, 0]} fontSize={0.15} color="#CBD5E1" anchorX="center">
        WiFi: Datos viajan por ondas de radio
      </Text>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  </div>
);

export default WiFiScene;
