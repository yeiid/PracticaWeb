import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const Device = ({ position, width, height, label }) => {
  const deviceRef = useRef();

  useFrame((state) => {
    if (deviceRef.current) {
      deviceRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.05;
    }
  });

  return (
    <group ref={deviceRef} position={position}>
      {/* Device body */}
      <mesh>
        <boxGeometry args={[width, height, 0.1]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.3} metalness={0.5} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0.05, 0.06]}>
        <boxGeometry args={[width - 0.2, height - 0.3, 0.01]} />
        <meshStandardMaterial color="#38BDF8" roughness={0.2} emissive="#38BDF8" emissiveIntensity={0.2} />
      </mesh>
      {/* Label */}
      <Text position={[0, -height / 2 - 0.2, 0]} fontSize={0.1} color="#CBD5E1" anchorX="center">
        {label}
      </Text>
    </group>
  );
};

const ResponsiveScene = () => (
  <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
    <Canvas camera={{ position: [0, 0.5, 5], fov: 45 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={80} />
      <pointLight position={[-3, 2, 4]} intensity={40} color="#F97316" />
      <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />
      <Device position={[-2, 0, 0]} width={1.5} height={2} label="Desktop" />
      <Device position={[0, 0, 0]} width={1} height={1.5} label="Tablet" />
      <Device position={[2, 0, 0]} width={0.6} height={1.2} label="Mobile" />
      <Text position={[0, -2, 0]} fontSize={0.12} color="#CBD5E1" anchorX="center">
        Responsive Design — 2010
      </Text>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  </div>
);

export default ResponsiveScene;
