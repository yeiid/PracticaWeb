import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const FloatingCard = ({ position, delay, rotation }) => {
  const meshRef = useRef();
  const [holes] = useState(() => {
    const h = [];
    for (let i = 0; i < 6; i++) {
      if (Math.random() > 0.4) h.push({ x: -0.3 + i * 0.12, y: 0 });
    }
    return h;
  });
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6 + delay) * 0.12;
      meshRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.3 + delay) * 0.15;
    }
  });
  return (
    <group ref={meshRef} position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[0.8, 0.5, 0.02]} />
        <meshStandardMaterial color="#F5F0DC" roughness={0.5} />
      </mesh>
      {holes.map((hole, i) => (
        <mesh key={i} position={[hole.x, hole.y, 0.02]}>
          <cylinderGeometry args={[0.02, 0.02, 0.03, 6]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#2D1B00" />
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
      {/* Hair bun */}
      <mesh position={[0, 1.65, -0.1]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#4A3728" roughness={0.7} />
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

const LovelaceCharacter = () => {
  return (
    <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={100} />
        <pointLight position={[-3, 2, 4]} intensity={50} color="#F97316" />
        <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />
        <Avatar color="#9370DB" />
        <FloatingCard position={[-1, 0.6, 0.5]} delay={0} rotation={[0.1, 0.2, 0]} />
        <FloatingCard position={[1.1, 0.8, -0.3]} delay={1} rotation={[0.1, -0.3, 0.05]} />
        <FloatingCard position={[0, 1.6, -0.6]} delay={2} rotation={[0.1, 0.1, -0.05]} />
        <Text position={[0, -0.5, 0]} fontSize={0.15} color="#F8FAFC" anchorX="center">Ada Lovelace</Text>
        <Text position={[0, -0.7, 0]} fontSize={0.08} color="#F97316" anchorX="center">1815 — 1852</Text>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  );
};

export default LovelaceCharacter;
