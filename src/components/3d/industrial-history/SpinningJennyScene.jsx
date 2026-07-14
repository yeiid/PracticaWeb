import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const Spindle = ({ position, speed }) => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * speed;
  });
  return (
    <group ref={meshRef} position={position}>
      <mesh>
        <cylinderGeometry args={[0.04, 0.04, 0.5, 8]} />
        <meshStandardMaterial color="#DAA520" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.28, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#F5F0DC" roughness={0.6} />
      </mesh>
    </group>
  );
};

const SpinningJenny = () => {
  const wheelRef = useRef();
  useFrame((state, delta) => {
    if (wheelRef.current) wheelRef.current.rotation.z += delta * 0.8;
  });
  return (
    <group>
      {/* Frame */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[2, 0.1, 1]} />
        <meshStandardMaterial color="#8B7355" roughness={0.7} />
      </mesh>
      {/* Vertical posts */}
      {[-0.8, 0.8].map((x, i) => (
        <mesh key={i} position={[x, 0.3, 0]}>
          <boxGeometry args={[0.08, 1.5, 0.08]} />
          <meshStandardMaterial color="#8B7355" roughness={0.7} />
        </mesh>
      ))}
      {/* Wheel */}
      <group ref={wheelRef} position={[0, 0.3, 0.6]}>
        <mesh>
          <torusGeometry args={[0.4, 0.03, 8, 24]} />
          <meshStandardMaterial color="#8B4513" roughness={0.6} />
        </mesh>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <mesh key={i} position={[Math.cos(rad) * 0.4, Math.sin(rad) * 0.4, 0]}>
              <boxGeometry args={[0.02, 0.02, 0.06]} />
              <meshStandardMaterial color="#8B4513" roughness={0.6} />
            </mesh>
          );
        })}
      </group>
      {/* Spindles */}
      {[-0.6, -0.3, 0, 0.3, 0.6].map((x, i) => (
        <Spindle key={i} position={[x, 0.3, -0.3]} speed={1 + i * 0.2} />
      ))}
    </group>
  );
};

const SpinningJennyScene = () => (
  <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
    <Canvas camera={{ position: [0, 1, 4], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={100} />
      <pointLight position={[-3, 2, 4]} intensity={50} color="#F97316" />
      <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />
      <SpinningJenny />
      <Text position={[0, -1.2, 0]} fontSize={0.12} color="#CBD5E1" anchorX="center">La Spinning Jenny — 1764</Text>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  </div>
);

export default SpinningJennyScene;
