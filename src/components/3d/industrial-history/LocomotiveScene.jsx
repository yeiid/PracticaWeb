import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const Locomotive = () => {
  const wheelRef = useRef();
  const steamRef = useRef();
  useFrame((state, delta) => {
    if (wheelRef.current) wheelRef.current.rotation.z += delta * 2;
    if (steamRef.current) {
      steamRef.current.position.y = 1.2 + Math.sin(state.clock.elapsedTime * 3) * 0.15;
      steamRef.current.scale.setScalar(0.8 + Math.sin(state.clock.elapsedTime * 2) * 0.2);
    }
  });
  return (
    <group>
      {/* Boiler */}
      <mesh position={[0, 0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.35, 0.35, 1.8, 20]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Smokestack */}
      <mesh position={[-0.6, 0.8, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 0.5, 12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.7} />
      </mesh>
      {/* Cab */}
      <mesh position={[0.7, 0.5, 0]}>
        <boxGeometry args={[0.5, 0.6, 0.5]} />
        <meshStandardMaterial color="#8B4513" roughness={0.6} />
      </mesh>
      {/* Cab window */}
      <mesh position={[0.7, 0.6, 0.26]}>
        <boxGeometry args={[0.3, 0.2, 0.02]} />
        <meshStandardMaterial color="#87CEEB" roughness={0.1} metalness={0.3} />
      </mesh>
      {/* Wheels */}
      <group ref={wheelRef} position={[0, -0.3, 0.4]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.2, 0.03, 8, 16]} />
          <meshStandardMaterial color="#696969" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
      <group position={[0, -0.3, -0.4]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.2, 0.03, 8, 16]} />
          <meshStandardMaterial color="#696969" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
      {/* Steam */}
      <mesh ref={steamRef} position={[-0.6, 1.2, 0]}>
        <sphereGeometry args={[0.15, 12, 12]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.25} />
      </mesh>
    </group>
  );
};

const LocomotiveScene = () => (
  <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
    <Canvas camera={{ position: [0, 1, 4.5], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={100} />
      <pointLight position={[-3, 2, 4]} intensity={50} color="#F97316" />
      <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />
      <Locomotive />
      <Text position={[0, -1.2, 0]} fontSize={0.12} color="#CBD5E1" anchorX="center">La Locomotora de Vapor — 1804</Text>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  </div>
);

export default LocomotiveScene;
