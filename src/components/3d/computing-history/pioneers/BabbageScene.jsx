import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const Gear = ({ position, size, speed, color }) => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) meshRef.current.rotation.z += delta * speed;
  });
  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[size, size * 0.25, 8, 24]} />
      <meshStandardMaterial color={color} metalness={0.85} roughness={0.15} />
    </mesh>
  );
};

const GearTeeth = ({ position, size, speed, color }) => {
  const groupRef = useRef();
  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.z += delta * speed;
  });
  const teeth = [];
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    teeth.push(
      <mesh key={i} position={[Math.cos(angle) * size, Math.sin(angle) * size, 0]}>
        <boxGeometry args={[size * 0.2, size * 0.15, 0.3]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
    );
  }
  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <cylinderGeometry args={[size * 0.85, size * 0.85, 0.3, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color={color} metalness={0.85} roughness={0.15} />
      </mesh>
      {teeth}
    </group>
  );
};

const DifferenceEngine = () => {
  const groupRef = useRef();
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });
  return (
    <group ref={groupRef}>
      {/* Base plate */}
      <mesh position={[0, -1.2, 0]}>
        <boxGeometry args={[4, 0.3, 2.5]} />
        <meshStandardMaterial color="#8B7355" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Column rods */}
      {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 2.2, 16]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
      {/* Number wheels */}
      {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
        <Gear key={`wheel-${i}`} position={[x, 0.3, 0]} size={0.35} speed={0.3 + i * 0.1} color="#B8860B" />
      ))}
      {/* Top gears */}
      <Gear position={[-1, 1, 0]} size={0.4} speed={-0.4} color="#DAA520" />
      <Gear position={[1, 1, 0]} size={0.4} speed={0.4} color="#DAA520" />
      <Gear position={[0, 1.2, 0]} size={0.3} speed={-0.6} color="#CD853F" />
    </group>
  );
};

const BabbageScene = () => {
  return (
    <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 1.5, 5], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={100} color="#ffffff" />
        <pointLight position={[-3, 2, 4]} intensity={50} color="#F97316" />
        <pointLight position={[0, -2, 3]} intensity={30} color="#38BDF8" />
        <DifferenceEngine />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  );
};

export default BabbageScene;
