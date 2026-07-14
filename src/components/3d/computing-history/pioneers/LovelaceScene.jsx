import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const PunchCard = ({ position, rotation, delay }) => {
  const meshRef = useRef();
  const [holes] = useState(() => {
    const h = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 5; j++) {
        if (Math.random() > 0.5) h.push({ x: -0.6 + i * 0.17, y: -0.3 + j * 0.17 });
      }
    }
    return h;
  });

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + delay) * 0.15;
      meshRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.3 + delay) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[1.8, 1.2, 0.05]} />
        <meshStandardMaterial color="#F5F0DC" roughness={0.6} metalness={0.05} />
      </mesh>
      {holes.map((hole, i) => (
        <mesh key={i} position={[hole.x, hole.y, 0.03]}>
          <cylinderGeometry args={[0.04, 0.04, 0.06, 8]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#2D1B00" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
};

const AdaAlgorithm = () => {
  const groupRef = useRef();
  const [textIndex, setTextIndex] = useState(0);
  const algorithmLines = [
    'procedure Bernoulli(n)',
    '  for i := 0 to n do',
    '    B[i] := 1/(i+1)',
    '  for j := 0 to n do',
    '    for i := n downto j do',
    '      B[i] := B[i] - B[i+1]',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % algorithmLines.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.5, 0]}>
      {/* Main punch card */}
      <PunchCard position={[0, 0, 0]} rotation={[0.1, 0, 0]} delay={0} />
      {/* Floating cards behind */}
      <PunchCard position={[-2, 0.3, -1]} rotation={[0.1, 0.3, 0.05]} delay={1} />
      <PunchCard position={[2, 0.3, -1]} rotation={[0.1, -0.3, -0.05]} delay={2} />

      {/* Code text floating above */}
      <Text position={[0, 1.5, 0.5]} fontSize={0.14} color="#F97316" anchorX="center" anchorY="middle">
        {algorithmLines[textIndex]}
      </Text>

      {/* Label */}
      <Text position={[0, -1.2, 0]} fontSize={0.12} color="#38BDF8" anchorX="center">
        Primer Algoritmo — 1843
      </Text>
    </group>
  );
};

const LovelaceScene = () => {
  return (
    <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={100} color="#ffffff" />
        <pointLight position={[-3, 2, 4]} intensity={50} color="#F97316" />
        <pointLight position={[0, -1, 3]} intensity={25} color="#38BDF8" />
        <AdaAlgorithm />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
      </Canvas>
    </div>
  );
};

export default LovelaceScene;
