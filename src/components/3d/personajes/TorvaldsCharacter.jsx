import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const CodeTerminal = ({ position, delay }) => {
  const meshRef = useRef();
  const [line, setLine] = useState(0);
  const lines = ['git commit -m "init"', '$ make', 'kernel built OK', '$ sudo insmod', 'Linux loaded'];

  useEffect(() => {
    const interval = setInterval(() => {
      setLine(prev => (prev + 1) % lines.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      <mesh>
        <boxGeometry args={[0.8, 0.55, 0.05]} />
        <meshStandardMaterial color="#0D1117" roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.23, 0.03]}>
        <boxGeometry args={[0.8, 0.08, 0.01]} />
        <meshStandardMaterial color="#21262D" />
      </mesh>
      {[-0.32, -0.24, -0.16].map((x, i) => (
        <mesh key={i} position={[x, 0.23, 0.04]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color={['#FF5F56', '#FFBD2E', '#27C93F'][i]} />
        </mesh>
      ))}
      <mesh position={[0, -0.02, 0.03]}>
        <boxGeometry args={[0.7, 0.35, 0.01]} />
        <meshStandardMaterial color="#0D1117" />
      </mesh>
      <Text position={[-0.28, 0.08, 0.04]} fontSize={0.04} color="#7EE787" anchorX="left">
        {'$ ' + lines[line]}
      </Text>
      <Text position={[-0.28, 0.02, 0.04]} fontSize={0.04} color="#8B949E" anchorX="left">
        {'linux@kernel:~$'}
      </Text>
    </group>
  );
};

const Penguin = ({ position }) => {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });
  return (
    <group ref={meshRef} position={position}>
      {/* Body */}
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
      </mesh>
      {/* Belly */}
      <mesh position={[0, -0.02, 0.12]}>
        <sphereGeometry args={[0.13, 12, 12]} />
        <meshStandardMaterial color="#F5F5F5" roughness={0.5} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.06, 0.08, 0.17]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#F5F5F5" />
      </mesh>
      <mesh position={[0.06, 0.08, 0.17]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#F5F5F5" />
      </mesh>
      <mesh position={[-0.06, 0.08, 0.19]}>
        <sphereGeometry args={[0.015, 6, 6]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.06, 0.08, 0.19]}>
        <sphereGeometry args={[0.015, 6, 6]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Beak */}
      <mesh position={[0, 0.04, 0.2]}>
        <coneGeometry args={[0.04, 0.06, 8]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#F97316" />
      </mesh>
    </group>
  );
};

const TorvaldsCharacter = () => {
  return (
    <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={100} />
        <pointLight position={[-3, 2, 4]} intensity={50} color="#F97316" />
        <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />
        {/* Avatar */}
        <group>
          <mesh position={[0, 1.2, 0]}>
            <sphereGeometry args={[0.45, 24, 24]} />
            <meshStandardMaterial color="#D4A574" roughness={0.3} metalness={0.3} />
          </mesh>
          <mesh position={[-0.15, 1.3, 0.4]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
          <mesh position={[0.15, 1.3, 0.4]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
          {/* Beard */}
          <mesh position={[0, 0.95, 0.3]}>
            <sphereGeometry args={[0.18, 12, 12]} />
            <meshStandardMaterial color="#8B7355" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.25, 0.35, 1, 16]} />
            <meshStandardMaterial color="#4682B4" roughness={0.4} metalness={0.3} />
          </mesh>
          <mesh position={[0, -0.15, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 0.1, 24]} />
            <meshStandardMaterial color="#252E42" roughness={0.6} metalness={0.4} />
          </mesh>
        </group>
        <CodeTerminal position={[-1.1, 0.6, 0.5]} delay={0} />
        <CodeTerminal position={[1.1, 0.8, -0.3]} delay={1.5} />
        <Penguin position={[0, -0.3, 1]} />
        <Text position={[0, -0.6, 0]} fontSize={0.15} color="#F8FAFC" anchorX="center">Linus Torvalds</Text>
        <Text position={[0, -0.8, 0]} fontSize={0.08} color="#F97316" anchorX="center">1969 —</Text>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  );
};

export default TorvaldsCharacter;
