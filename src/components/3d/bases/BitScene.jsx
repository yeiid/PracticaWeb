import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const Bit = ({ position, index }) => {
  const meshRef = useRef();
  const [isOn, setIsOn] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      const shouldFlip = Math.floor(time * 2 + index) % 2 === 0;
      if (shouldFlip !== isOn) setIsOn(shouldFlip);
      
      const targetScale = isOn ? 1.2 : 0.8;
      meshRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.1);
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={() => setIsOn(!isOn)}
      >
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial
          color={isOn ? '#F97316' : '#374151'}
          emissive={isOn ? '#F97316' : '#000000'}
          emissiveIntensity={isOn ? 0.5 : 0}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
      <Text
        position={[0, -0.5, 0]}
        fontSize={0.2}
        color={isOn ? '#F97316' : '#6B7280'}
        anchorX="center"
      >
        {isOn ? '1' : '0'}
      </Text>
    </group>
  );
};

const BitScene = () => (
  <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
    <Canvas camera={{ position: [0, 0.5, 5], fov: 45 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={80} />
      <pointLight position={[-3, 2, 4]} intensity={40} color="#F97316" />
      <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />

      {[...Array(8)].map((_, i) => (
        <Bit
          key={i}
          position={[-3 + i * 0.9, 0, 0]}
          index={i}
        />
      ))}

      <Text position={[0, -1.2, 0]} fontSize={0.12} color="#CBD5E1" anchorX="center">
        8 Bits = 1 Byte
      </Text>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  </div>
);

export default BitScene;
