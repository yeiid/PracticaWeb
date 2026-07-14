import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const CodeWindow = ({ position, delay }) => {
  const meshRef = useRef();
  const [codeLine, setCodeLine] = useState(0);
  const codeLines = ['#include <stdio.h>', 'int main() {', '  printf("Hello");', '  return 0;', '}'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCodeLine(prev => (prev + 1) % codeLines.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Terminal body */}
      <mesh>
        <boxGeometry args={[0.8, 0.55, 0.05]} />
        <meshStandardMaterial color="#0D1117" roughness={0.3} />
      </mesh>
      {/* Title bar */}
      <mesh position={[0, 0.23, 0.03]}>
        <boxGeometry args={[0.8, 0.08, 0.01]} />
        <meshStandardMaterial color="#21262D" />
      </mesh>
      {/* Dots */}
      {[-0.32, -0.24, -0.16].map((x, i) => (
        <mesh key={i} position={[x, 0.23, 0.04]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color={['#FF5F56', '#FFBD2E', '#27C93F'][i]} />
        </mesh>
      ))}
      {/* Screen */}
      <mesh position={[0, -0.02, 0.03]}>
        <boxGeometry args={[0.7, 0.35, 0.01]} />
        <meshStandardMaterial color="#0D1117" />
      </mesh>
      {/* Code text */}
      <Text position={[-0.28, 0.08, 0.04]} fontSize={0.04} color="#8B949E" anchorX="left">
        {codeLines[codeLine]}
      </Text>
      <Text position={[-0.28, 0.02, 0.04]} fontSize={0.04} color="#7EE787" anchorX="left">
        {'> ./a.out'}
      </Text>
      <Text position={[-0.28, -0.04, 0.04]} fontSize={0.04} color="#F8FAFC" anchorX="left">
        {'Hello'}
      </Text>
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
      {/* Beard */}
      <mesh position={[0, 1.0, 0.35]}>
        <sphereGeometry args={[0.15, 12, 12]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
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

const RitchieCharacter = () => {
  return (
    <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={100} />
        <pointLight position={[-3, 2, 4]} intensity={50} color="#F97316" />
        <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />
        <Avatar color="#4682B4" />
        <CodeWindow position={[-1.1, 0.6, 0.5]} delay={0} />
        <CodeWindow position={[1.1, 0.8, -0.3]} delay={1.5} />
        <Text position={[0, -0.5, 0]} fontSize={0.15} color="#F8FAFC" anchorX="center">Dennis Ritchie</Text>
        <Text position={[0, -0.7, 0]} fontSize={0.08} color="#F97316" anchorX="center">1941 — 2011</Text>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  );
};

export default RitchieCharacter;
