import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const Telegraph = () => {
  const keyRef = useRef();
  useFrame((state) => {
    if (keyRef.current) {
      keyRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 4) > 0.7 ? -0.3 : 0;
    }
  });
  return (
    <group>
      {/* Base */}
      <mesh position={[0, -0.4, 0]}>
        <boxGeometry args={[1.2, 0.15, 0.8]} />
        <meshStandardMaterial color="#5C4033" roughness={0.7} />
      </mesh>
      {/* Key lever */}
      <group ref={keyRef} position={[0, -0.2, 0]}>
        <mesh position={[0, 0, 0.2]}>
          <boxGeometry args={[0.8, 0.06, 0.4]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[-0.35, 0, 0.2]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
        </mesh>
      </group>
      {/* Sounder posts */}
      {[-0.4, 0.4].map((x, i) => (
        <mesh key={i} position={[x, 0, -0.2]}>
          <cylinderGeometry args={[0.03, 0.03, 0.6, 8]} />
          <meshStandardMaterial color="#8B8682" metalness={0.85} roughness={0.2} />
        </mesh>
      ))}
      {/* Sounder bar */}
      <mesh position={[0, 0.15, -0.2]}>
        <boxGeometry args={[0.9, 0.04, 0.04]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Wire coil */}
      <mesh position={[0.5, -0.1, 0]}>
        <torusGeometry args={[0.1, 0.02, 8, 16]} />
        <meshStandardMaterial color="#B87333" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};

const TelegraphScene = () => (
  <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
    <Canvas camera={{ position: [0, 1, 3.5], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={100} />
      <pointLight position={[-3, 2, 4]} intensity={50} color="#F97316" />
      <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />
      <Telegraph />
      <Text position={[0, -1, 0]} fontSize={0.12} color="#CBD5E1" anchorX="center">El Telégrafo — 1837</Text>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  </div>
);

export default TelegraphScene;
