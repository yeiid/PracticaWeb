import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const Motorwagen = () => {
  const wheelFrontRef = useRef();
  const wheelRearRef = useRef();
  useFrame((state, delta) => {
    if (wheelFrontRef.current) wheelFrontRef.current.rotation.x += delta * 1.5;
    if (wheelRearRef.current) wheelRearRef.current.rotation.x += delta * 1.5;
  });
  return (
    <group>
      {/* Chassis */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[1.8, 0.08, 0.5]} />
        <meshStandardMaterial color="#4A3728" roughness={0.7} />
      </mesh>
      {/* Seat */}
      <mesh position={[0.3, 0.45, 0]}>
        <boxGeometry args={[0.4, 0.15, 0.4]} />
        <meshStandardMaterial color="#8B4513" roughness={0.6} />
      </mesh>
      <mesh position={[0.3, 0.55, 0]}>
        <boxGeometry args={[0.08, 0.3, 0.4]} />
        <meshStandardMaterial color="#8B4513" roughness={0.6} />
      </mesh>
      {/* Engine */}
      <mesh position={[-0.5, 0.35, 0]}>
        <boxGeometry args={[0.5, 0.3, 0.3]} />
        <meshStandardMaterial color="#2D2D2D" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Wheels */}
      <group ref={wheelFrontRef} position={[-0.6, 0, 0.3]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.15, 0.02, 8, 16]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
      </group>
      <group ref={wheelFrontRef} position={[-0.6, 0, -0.3]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.15, 0.02, 8, 16]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
      </group>
      <group ref={wheelRearRef} position={[0.6, 0, 0.35]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.2, 0.025, 8, 16]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
      </group>
      <group ref={wheelRearRef} position={[0.6, 0, -0.35]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.2, 0.025, 8, 16]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
      </group>
      {/* Steering tiller */}
      <mesh position={[-0.2, 0.5, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.015, 0.015, 0.5, 8]} />
        <meshStandardMaterial color="#5C4033" roughness={0.6} />
      </mesh>
      {/* Lamp */}
      <mesh position={[-0.9, 0.35, 0]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#FFD700" emissive="#FF8C00" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

const AutomobileScene = () => (
  <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
    <Canvas camera={{ position: [0, 1.5, 4], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={100} />
      <pointLight position={[-3, 2, 4]} intensity={50} color="#F97316" />
      <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />
      <Motorwagen />
      <Text position={[0, -1, 0]} fontSize={0.12} color="#CBD5E1" anchorX="center">El Automóvil — 1886</Text>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  </div>
);

export default AutomobileScene;
