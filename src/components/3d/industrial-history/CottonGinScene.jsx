import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const CottonGin = () => {
  const drumRef = useRef();
  useFrame((state, delta) => {
    if (drumRef.current) drumRef.current.rotation.x += delta * 1.2;
  });
  return (
    <group>
      {/* Box frame */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[1.5, 0.8, 1]} />
        <meshStandardMaterial color="#8B7355" roughness={0.7} />
      </mesh>
      {/* Drum with teeth */}
      <group ref={drumRef} position={[0, 0.2, 0]}>
        <mesh>
          <cylinderGeometry args={[0.3, 0.3, 1.2, 16]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#8B8682" metalness={0.85} roughness={0.2} />
        </mesh>
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          return (
            <mesh key={i} position={[0, Math.cos(angle) * 0.3, Math.sin(angle) * 0.3]}>
              <coneGeometry args={[0.02, 0.12, 4]} rotation={[0, 0, Math.PI / 2]} />
              <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
            </mesh>
          );
        })}
      </group>
      {/* Handle */}
      <mesh position={[0.85, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.5, 8]} />
        <meshStandardMaterial color="#5C4033" roughness={0.6} />
      </mesh>
      <mesh position={[1.1, 0.2, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#5C4033" roughness={0.5} />
      </mesh>
      {/* Cotton bales */}
      {[[-0.5, 0.6, 0.6], [0.5, 0.6, 0.6]].map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.3, 0.25, 0.2]} />
          <meshStandardMaterial color="#F5F0DC" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
};

const CottonGinScene = () => (
  <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
    <Canvas camera={{ position: [0, 1, 4], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={100} />
      <pointLight position={[-3, 2, 4]} intensity={50} color="#F97316" />
      <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />
      <CottonGin />
      <Text position={[0, -1.2, 0]} fontSize={0.12} color="#CBD5E1" anchorX="center">El Desmotador de Algodón — 1793</Text>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  </div>
);

export default CottonGinScene;
