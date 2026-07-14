import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const Document = () => {
  const docRef = useRef();

  useFrame((state) => {
    if (docRef.current) {
      docRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      docRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={docRef} position={[0, 0.5, 0]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.4, 3.2, 0.05]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.2, 0.03]}>
        <boxGeometry args={[1.8, 0.12, 0.01]} />
        <meshStandardMaterial color="#333" roughness={0.5} />
      </mesh>
      <Text position={[0, 1.2, 0.06]} fontSize={0.12} color="#1a1a1a" anchorX="center">
        INFORMATION MANAGEMENT
      </Text>
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[0, 0.8 - i * 0.3, 0.03]}>
          <boxGeometry args={[1.6, 0.06, 0.01]} />
          <meshStandardMaterial color="#666" roughness={0.5} />
        </mesh>
      ))}
      <mesh position={[0, -1.3, 0.03]}>
        <boxGeometry args={[0.8, 0.3, 0.01]} />
        <meshStandardMaterial color="#0033a0" roughness={0.4} />
      </mesh>
      <Text position={[0, -1.3, 0.06]} fontSize={0.1} color="#ffffff" anchorX="center">
        CERN
      </Text>
    </group>
  );
};

const LinkArrows = () => {
  const arrowsRef = useRef();
  useFrame((state) => {
    if (arrowsRef.current) {
      arrowsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <group ref={arrowsRef} position={[0, 0, -1]}>
      <mesh position={[1.5, 0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.8, 0.08, 0.08]} />
        <meshStandardMaterial color="#F97316" emissive="#F97316" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[-1.5, -0.5, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.8, 0.08, 0.08]} />
        <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.8, 0.08, 0.08]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
};

const FloatingNodes = () => {
  const nodesRef = useRef();
  const count = 12;
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 3 + Math.random();
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 3;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (nodesRef.current) nodesRef.current.rotation.y += delta * 0.1;
  });

  return (
    <points ref={nodesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.15} color="#F97316" transparent opacity={0.8} />
    </points>
  );
};

const WWWProposalScene = () => (
  <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
    <Canvas camera={{ position: [0, 0.5, 5], fov: 45 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={80} />
      <pointLight position={[-3, 2, 4]} intensity={40} color="#F97316" />
      <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />
      <Document />
      <LinkArrows />
      <FloatingNodes />
      <Text position={[0, -2.2, 0]} fontSize={0.12} color="#CBD5E1" anchorX="center">
        Propuesta WWW — 1989
      </Text>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  </div>
);

export default WWWProposalScene;
