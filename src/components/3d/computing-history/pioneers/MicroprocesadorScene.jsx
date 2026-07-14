import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const Transistor = ({ position, glowing }) => {
  const meshRef = useRef();
  const [pulse, setPulse] = useState(1);

  useFrame((state, delta) => {
    if (meshRef.current && glowing) {
      setPulse(prev => {
        const next = prev + (Math.random() - 0.5) * 0.2;
        return Math.max(0.5, Math.min(1.3, next));
      });
      meshRef.current.material.emissiveIntensity = pulse * 0.4;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <boxGeometry args={[0.12, 0.08, 0.04]} />
        <meshStandardMaterial
          color={glowing ? '#F97316' : '#4A5568'}
          emissive={glowing ? '#F97316' : '#000000'}
          emissiveIntensity={glowing ? 0.4 : 0}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      {/* Pins */}
      {[-0.04, 0.04].map((x, i) => (
        <mesh key={i} position={[x, -0.06, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.08, 4]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
    </group>
  );
};

const Chip = () => {
  const groupRef = useRef();
  const [activeRow, setActiveRow] = useState(0);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.06;
    }
    setActiveRow(Math.floor(state.clock.elapsedTime * 2) % 5);
  });

  return (
    <group ref={groupRef}>
      {/* Chip substrate */}
      <mesh>
        <boxGeometry args={[2, 0.15, 2]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.4} metalness={0.5} />
      </mesh>

      {/* Die (silicon center) */}
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[1.2, 0.02, 1.2]} />
        <meshStandardMaterial color="#2D3748" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Transistor grid - 5x5 */}
      {[...Array(5)].map((_, row) =>
        [...Array(5)].map((_, col) => (
          <Transistor
            key={`t-${row}-${col}`}
            position={[-0.4 + col * 0.2, 0.1, -0.4 + row * 0.2]}
            glowing={row === activeRow}
          />
        ))
      )}

      {/* Bond wires */}
      {[-0.8, -0.4, 0, 0.4, 0.8].map((x, i) => (
        <React.Fragment key={`wire-${i}`}>
          <mesh position={[x, 0.15, -1.05]}>
            <cylinderGeometry args={[0.01, 0.01, 0.4, 4]} />
            <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[x, 0.15, 1.05]}>
            <cylinderGeometry args={[0.01, 0.01, 0.4, 4]} />
            <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[-1.05, 0.15, x]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.01, 0.01, 0.4, 4]} />
            <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[1.05, 0.15, x]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.01, 0.01, 0.4, 4]} />
            <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
          </mesh>
        </React.Fragment>
      ))}

      {/* Pins on edges */}
      {[-0.8, -0.4, 0, 0.4, 0.8].map((x, i) => (
        <React.Fragment key={`pin-${i}`}>
          <mesh position={[x, -0.1, -1.1]}>
            <boxGeometry args={[0.06, 0.12, 0.06]} />
            <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[x, -0.1, 1.1]}>
            <boxGeometry args={[0.06, 0.12, 0.06]} />
            <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
          </mesh>
        </React.Fragment>
      ))}

      {/* Label on chip */}
      <Text position={[0, 0.18, 0]} fontSize={0.12} color="#F97316" anchorX="center">
        INTEL 4004
      </Text>
    </group>
  );
};

const MicroprocesadorScene = () => {
  return (
    <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 2, 4], fov: 40 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={100} color="#ffffff" />
        <pointLight position={[-3, 2, 4]} intensity={50} color="#F97316" />
        <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />
        <Chip />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  );
};

export default MicroprocesadorScene;
