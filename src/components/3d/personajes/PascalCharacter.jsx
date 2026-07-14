import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const FloatingGear = ({ position, size, speed, color }) => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + position[0]) * 0.15;
    }
  });
  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[size, size * 0.2, 8, 20]} />
      <meshStandardMaterial color={color} metalness={0.85} roughness={0.15} emissive={color} emissiveIntensity={0.2} />
    </mesh>
  );
};

const Avatar = ({ color }) => {
  const groupRef = useRef();
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });
  return (
    <group ref={groupRef}>
      {/* Head */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.45, 24, 24]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.15, 1.3, 0.4]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.15, 1.3, 0.4]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.25, 0.35, 1, 16]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Base */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 24]} />
        <meshStandardMaterial color="#252E42" roughness={0.6} metalness={0.4} />
      </mesh>
    </group>
  );
};

const PascalCharacter = () => {
  return (
    <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={100} />
        <pointLight position={[-3, 2, 4]} intensity={50} color="#F97316" />
        <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />
        <Avatar color="#DAA520" />
        <FloatingGear position={[-1.2, 0.8, 0.5]} size={0.3} speed={0.5} color="#C0C0C0" />
        <FloatingGear position={[1.3, 0.6, -0.3]} size={0.25} speed={-0.6} color="#B8860B" />
        <FloatingGear position={[-0.8, 1.5, -0.5]} size={0.2} speed={0.8} color="#DAA520" />
        <FloatingGear position={[0.9, 1.3, 0.7]} size={0.22} speed={-0.7} color="#CD853F" />
        <Text position={[0, -0.5, 0]} fontSize={0.15} color="#F8FAFC" anchorX="center">Blaise Pascal</Text>
        <Text position={[0, -0.7, 0]} fontSize={0.08} color="#F97316" anchorX="center">1623 — 1662</Text>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  );
};

export default PascalCharacter;
