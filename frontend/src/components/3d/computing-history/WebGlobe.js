import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';

const Globe = () => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002; // Rotación suave
    }
  });

  return (
    <Sphere ref={meshRef} args={[2, 32, 32]}>
      <meshStandardMaterial 
        color="#667eea"
        wireframe={true} // Estilo de malla de alambre
      />
    </Sphere>
  );
};

const WebGlobe = () => {
  return (
    <div style={{ height: '400px', width: '100%', cursor: 'grab' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Globe />
        <OrbitControls 
          enableZoom={false} // Deshabilitar zoom para una experiencia más limpia
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
};

export default WebGlobe;
