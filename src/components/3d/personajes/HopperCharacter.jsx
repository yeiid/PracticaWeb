import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const FloatingTerminal = ({ position, delay }) => {
  const meshRef = useRef();
  const [text, setText] = useState('');
  const lines = ['COBOL-61', 'COMPILER', 'READY>', 'DEBUG ON'];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % lines.length;
      setText(lines[i]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      <mesh>
        <boxGeometry args={[0.7, 0.5, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.03]}>
        <boxGeometry args={[0.6, 0.35, 0.01]} />
        <meshStandardMaterial color="#001a00" emissive="#00ff41" emissiveIntensity={0.3} />
      </mesh>
      <Text position={[0, 0, 0.05]} fontSize={0.06} color="#00ff41" anchorX="center">{text}</Text>
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
      {/* Hair */}
      <mesh position={[0, 1.6, -0.05]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} />
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

const HopperCharacter = () => {
  return (
    <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={100} />
        <pointLight position={[-3, 2, 4]} intensity={50} color="#F97316" />
        <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />
        <Avatar color="#2E8B57" />
        <FloatingTerminal position={[-1.1, 0.7, 0.5]} delay={0} />
        <FloatingTerminal position={[1.1, 0.5, -0.3]} delay={1.5} />
        <Text position={[0, -0.5, 0]} fontSize={0.15} color="#F8FAFC" anchorX="center">Grace Hopper</Text>
        <Text position={[0, -0.7, 0]} fontSize={0.08} color="#F97316" anchorX="center">1906 — 1992</Text>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  );
};

export default HopperCharacter;
