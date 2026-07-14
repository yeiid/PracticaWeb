import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const VacuumTube = ({ position, glowing }) => {
  const meshRef = useRef();
  const [flicker, setFlicker] = useState(1);

  useFrame((state, delta) => {
    if (meshRef.current && glowing) {
      setFlicker(prev => {
        const next = prev + (Math.random() - 0.5) * 0.3;
        return Math.max(0.4, Math.min(1.2, next));
      });
      meshRef.current.material.emissiveIntensity = flicker;
    }
  });

  return (
    <group position={position}>
      {/* Glass envelope */}
      <mesh>
        <cylinderGeometry args={[0.2, 0.25, 0.8, 16]} />
        <meshStandardMaterial
          color={glowing ? '#FF6B00' : '#6B7280'}
          emissive={glowing ? '#FF4500' : '#000000'}
          emissiveIntensity={glowing ? 0.5 : 0}
          transparent
          opacity={0.7}
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>
      {/* Internal filament */}
      {glowing && (
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#FF4500" emissive="#FF4500" emissiveIntensity={1} />
        </mesh>
      )}
      {/* Base */}
      <mesh position={[0, -0.45, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial color="#374151" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Pins */}
      {[-0.08, 0, 0.08].map((x, i) => (
        <mesh key={i} position={[x, -0.55, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.15, 4]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
    </group>
  );
};

const ABCComputer = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main cabinet */}
      <mesh position={[0, 0, -0.3]}>
        <boxGeometry args={[3, 2.2, 1.2]} />
        <meshStandardMaterial color="#5C4033" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Panel */}
      <mesh position={[0, 0, 0.35]}>
        <boxGeometry args={[2.6, 1.8, 0.05]} />
        <meshStandardMaterial color="#2D2D2D" roughness={0.5} />
      </mesh>

      {/* Vacuum tubes - 3 rows of 5 */}
      {[...Array(3)].map((_, row) =>
        [...Array(5)].map((_, col) => (
          <VacuumTube
            key={`tube-${row}-${col}`}
            position={[-1 + col * 0.5, 0.5 - row * 0.5, 0.5]}
            glowing={row === 1 && col >= 1 && col <= 3}
          />
        ))
      )}

      {/* Rotating drum memory */}
      <group position={[0, -0.8, 0.5]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 1.5, 16]} />
          <meshStandardMaterial color="#8B4513" metalness={0.6} roughness={0.4} />
        </mesh>
      </group>

      {/* Label plate */}
      <mesh position={[0, 1.25, 0.38]}>
        <boxGeometry args={[1.2, 0.2, 0.02]} />
        <meshStandardMaterial color="#DAA520" metalness={0.8} roughness={0.2} />
      </mesh>
      <Text position={[0, 1.25, 0.42]} fontSize={0.08} color="#1a1a1a" anchorX="center">
        ABC COMPUTER — 1942
      </Text>
    </group>
  );
};

const AtanasoffScene = () => {
  return (
    <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={100} color="#ffffff" />
        <pointLight position={[-3, 2, 4]} intensity={50} color="#F97316" />
        <pointLight position={[0, -1, 3]} intensity={20} color="#38BDF8" />
        <ABCComputer />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
      </Canvas>
    </div>
  );
};

export default AtanasoffScene;
