import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const TapeStrip = () => {
  const meshRef = useRef();
  const [tapeText] = useState('01001000 01001111 01001100 01000001');

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x = -4 + ((state.clock.elapsedTime * 0.5) % 8);
    }
  });

  return (
    <group ref={meshRef}>
      {/* Tape body */}
      <mesh>
        <boxGeometry args={[8, 0.6, 0.02]} />
        <meshStandardMaterial color="#F5F0DC" roughness={0.5} />
      </mesh>
      {/* Tape holes */}
      {[...Array(20)].map((_, i) => (
        <mesh key={i} position={[-3.75 + i * 0.4, 0, 0.02]}>
          <cylinderGeometry args={[0.06, 0.06, 0.04, 8]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? '#1a1a1a' : '#F5F0DC'}
            roughness={0.8}
          />
        </mesh>
      ))}
      {/* Binary text on tape */}
      <Text position={[0, 0, 0.05]} fontSize={0.1} color="#1a1a1a" anchorX="center">
        {tapeText}
      </Text>
    </group>
  );
};

const TuringMachine = () => {
  const groupRef = useRef();
  const tapeRef = useRef();
  const [headPos, setHeadPos] = useState(0);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    }
    if (tapeRef.current) {
      tapeRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Machine body */}
      <mesh position={[0, 0, -0.5]}>
        <boxGeometry args={[3.5, 2, 1]} />
        <meshStandardMaterial color="#4A5568" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Tape reel left */}
      <group position={[-1.8, 0.8, 0]}>
        <mesh>
          <cylinderGeometry args={[0.4, 0.4, 0.15, 32]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#2D3748" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[0.2, 0.05, 8, 24]} />
          <meshStandardMaterial color="#1A202C" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Tape reel right */}
      <group position={[1.8, 0.8, 0]}>
        <mesh>
          <cylinderGeometry args={[0.4, 0.4, 0.15, 32]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#2D3748" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh>
          <torusGeometry args={[0.2, 0.05, 8, 24]} />
          <meshStandardMaterial color="#1A202C" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Reading head */}
      <mesh position={[0, 0.3, 0.2]}>
        <boxGeometry args={[0.4, 0.5, 0.3]} />
        <meshStandardMaterial color="#F97316" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Moving tape section */}
      <group ref={tapeRef} position={[0, 0, 0.15]}>
        <TapeStrip />
      </group>

      {/* Status light */}
      <mesh position={[0, -0.7, 0.1]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#00ff41" emissive="#00ff41" emissiveIntensity={0.8} />
      </mesh>

      <Text position={[0, -1.2, 0]} fontSize={0.12} color="#CBD5E1" anchorX="center">
        Máquina de Turing — 1936
      </Text>
    </group>
  );
};

const TuringScene = () => {
  return (
    <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={100} color="#ffffff" />
        <pointLight position={[-3, 2, 4]} intensity={50} color="#F97316" />
        <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />
        <TuringMachine />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  );
};

export default TuringScene;
