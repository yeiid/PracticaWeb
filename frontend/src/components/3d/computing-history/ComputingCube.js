import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';

const Cube = () => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <Box ref={meshRef} args={[2.5, 2.5, 2.5]}>
      <meshStandardMaterial 
        color="#764ba2" // Un color diferente
        emissive="#764ba2"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.1}
      />
    </Box>
  );
};

const ComputingCube = () => {
  return (
    <div style={{ height: '400px', width: '100%', cursor: 'grab' }}>
      <Canvas>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={100} />
        <Cube />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default ComputingCube;
