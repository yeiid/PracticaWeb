import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const Pixel = ({ position, color, delay }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2 + delay) * 0.1 + 0.9;
      meshRef.current.scale.set(pulse, pulse, pulse);
      meshRef.current.material.emissiveIntensity = 0.2 + Math.sin(state.clock.elapsedTime + delay) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.85, 0.85, 0.15]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.2}
        roughness={0.3}
        metalness={0.5}
      />
    </mesh>
  );
};

const PixelGridScene = () => {
  const gridSize = 6;
  const pixels = useMemo(() => {
    const result = [];
    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899'];
    
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const colorIndex = (row + col) % colors.length;
        result.push({
          position: [(col - gridSize / 2 + 0.5) * 0.95, (row - gridSize / 2 + 0.5) * 0.95, 0],
          color: colors[colorIndex],
          delay: (row + col) * 0.3
        });
      }
    }
    return result;
  }, []);

  return (
    <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={80} />
        <pointLight position={[-3, 2, 4]} intensity={40} color="#F97316" />
        <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />

        {pixels.map((pixel, i) => (
          <Pixel key={i} {...pixel} />
        ))}

        <Text position={[0, -3.2, 0]} fontSize={0.12} color="#CBD5E1" anchorX="center">
          RGB: Cada píxel = 3 bytes (Rojo, Verde, Azul)
        </Text>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  );
};

export default PixelGridScene;
