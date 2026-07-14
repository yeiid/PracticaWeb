import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const CarBody = ({ position }) => (
  <group position={position}>
    <mesh>
      <boxGeometry args={[0.8, 0.25, 0.35]} />
      <meshStandardMaterial color="#B22222" roughness={0.4} metalness={0.5} />
    </mesh>
    <mesh position={[0.1, 0.18, 0]}>
      <boxGeometry args={[0.4, 0.15, 0.32]} />
      <meshStandardMaterial color="#87CEEB" transparent opacity={0.5} roughness={0.1} />
    </mesh>
  </group>
);

const Wheel = ({ position }) => {
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.x += delta * 3;
  });
  return (
    <group ref={ref} position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.08, 0.02, 8, 12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
    </group>
  );
};

const AssemblyLine = () => {
  const beltRef = useRef();
  useFrame((state, delta) => {
    if (beltRef.current) beltRef.current.position.x = (state.clock.elapsedTime * 0.3) % 3;
  });
  return (
    <group>
      {/* Conveyor belt */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[4, 0.05, 0.5]} />
        <meshStandardMaterial color="#4A4A4A" roughness={0.6} metalness={0.5} />
      </mesh>
      {/* Belt rollers */}
      {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
        <mesh key={i} position={[x, -0.33, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.03, 0.03, 0.5, 8]} />
          <meshStandardMaterial color="#696969" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
      {/* Cars on belt */}
      <group ref={beltRef}>
        <CarBody position={[-1, -0.1, 0]} />
        <Wheel position={[-1.3, -0.22, 0.2]} />
        <Wheel position={[-1.3, -0.22, -0.2]} />
        <Wheel position={[-0.7, -0.22, 0.2]} />
        <Wheel position={[-0.7, -0.22, -0.2]} />

        <CarBody position={[0.5, -0.1, 0]} />
        <Wheel position={[0.2, -0.22, 0.2]} />
        <Wheel position={[0.2, -0.22, -0.2]} />
        <Wheel position={[0.8, -0.22, 0.2]} />
        <Wheel position={[0.8, -0.22, -0.2]} />
      </group>
      {/* Worker robots */}
      {[-1.8, 0, 1.8].map((x, i) => (
        <group key={i} position={[x, 0.3, 0.4]}>
          <mesh>
            <boxGeometry args={[0.2, 0.4, 0.2]} />
            <meshStandardMaterial color="#4682B4" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.25, 0]}>
            <sphereGeometry args={[0.1, 12, 12]} />
            <meshStandardMaterial color="#4682B4" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.3, 0.08]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color="#FF4444" emissive="#FF4444" emissiveIntensity={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

const AssemblyLineScene = () => (
  <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
    <Canvas camera={{ position: [0, 1.5, 4], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={100} />
      <pointLight position={[-3, 2, 4]} intensity={50} color="#F97316" />
      <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />
      <AssemblyLine />
      <Text position={[0, -1.2, 0]} fontSize={0.12} color="#CBD5E1" anchorX="center">La Cadena de Montaje — 1901</Text>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
    </Canvas>
  </div>
);

export default AssemblyLineScene;
