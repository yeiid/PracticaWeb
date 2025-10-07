import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Cylinder } from '@react-three/drei';

const Cog = () => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <Cylinder ref={meshRef} args={[2, 2, 0.8, 32]} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial 
        color="#a0aec0"
        metalness={0.9}
        roughness={0.2}
      />
    </Cylinder>
  );
};

const IndustrialCog = () => {
  return (
    <div style={{ height: '400px', width: '100%', cursor: 'grab' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <Cog />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default IndustrialCog;
