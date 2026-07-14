import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const FloatingDevice = ({ position, delay, type }) => {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.12;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + delay) * 0.2;
    }
  });

  if (type === 'phone') {
    return (
      <group ref={meshRef} position={position}>
        <mesh>
          <boxGeometry args={[0.35, 0.65, 0.03]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.02, 0.02]}>
          <boxGeometry args={[0.3, 0.55, 0.01]} />
          <meshStandardMaterial color="#111" emissive="#38BDF8" emissiveIntensity={0.2} />
        </mesh>
        <mesh position={[0, -0.28, 0.02]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </group>
    );
  }

  if (type === 'laptop') {
    return (
      <group ref={meshRef} position={position}>
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[0.7, 0.02, 0.45]} />
          <meshStandardMaterial color="#C0C0C0" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.35, -0.2]} rotation={[-0.3, 0, 0]}>
          <boxGeometry args={[0.7, 0.4, 0.02]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.35, -0.19]} rotation={[-0.3, 0, 0]}>
          <boxGeometry args={[0.6, 0.32, 0.01]} />
          <meshStandardMaterial color="#111" emissive="#38BDF8" emissiveIntensity={0.15} />
        </mesh>
      </group>
    );
  }

  return (
    <group ref={meshRef} position={position}>
      <mesh>
        <boxGeometry args={[0.4, 0.4, 0.04]} />
        <meshStandardMaterial color="#C0C0C0" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[0, 0, 0.03]}>
        <boxGeometry args={[0.35, 0.35, 0.01]} />
        <meshStandardMaterial color="#1a1a1a" emissive="#38BDF8" emissiveIntensity={0.2} />
      </mesh>
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
      {/* Turtleneck */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.25, 0.35, 1, 16]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 24]} />
        <meshStandardMaterial color="#252E42" roughness={0.6} metalness={0.4} />
      </mesh>
    </group>
  );
};

const JobsCharacter = () => {
  return (
    <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={100} />
        <pointLight position={[-3, 2, 4]} intensity={50} color="#F97316" />
        <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />
        <Avatar color="#1a1a1a" />
        <FloatingDevice position={[-1.2, 0.6, 0.5]} delay={0} type="phone" />
        <FloatingDevice position={[1.2, 0.8, -0.3]} delay={1} type="laptop" />
        <FloatingDevice position={[0, 1.7, -0.6]} delay={2} type="tablet" />
        <Text position={[0, -0.5, 0]} fontSize={0.15} color="#F8FAFC" anchorX="center">Steve Jobs</Text>
        <Text position={[0, -0.7, 0]} fontSize={0.08} color="#F97316" anchorX="center">1955 — 2011</Text>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  );
};

export default JobsCharacter;
