import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const Monitor = ({ screenText }) => {
  const screenRef = useRef();
  const [glow, setGlow] = useState(0);

  useFrame((state, delta) => {
    setGlow(prev => (prev + delta * 2) % (Math.PI * 2));
    if (screenRef.current) {
      screenRef.current.material.emissiveIntensity = 0.3 + Math.sin(glow) * 0.15;
    }
  });

  return (
    <group position={[0, 0.8, 0]}>
      {/* Monitor casing - beige/cream retro */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.2, 2.4, 2]} />
        <meshStandardMaterial color="#d4c5a0" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Screen bezel */}
      <mesh position={[0, 0.05, 1.01]}>
        <boxGeometry args={[2.8, 2, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
      </mesh>

      {/* Screen - green phosphor CRT */}
      <mesh ref={screenRef} position={[0, 0.05, 1.05]}>
        <boxGeometry args={[2.5, 1.7, 0.02]} />
        <meshStandardMaterial
          color="#0a2e0a"
          emissive="#00ff41"
          emissiveIntensity={0.3}
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>

      {/* Screen text */}
      <Text
        position={[0, 0.4, 1.1]}
        fontSize={0.18}
        color="#00ff41"
        anchorX="center"
        anchorY="middle"
        font={undefined}
      >
        {screenText}
      </Text>

      {/* Power LED */}
      <mesh position={[-1.1, -1.05, 1.05]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#00ff41" emissive="#00ff41" emissiveIntensity={1} />
      </mesh>

      {/* Monitor stand */}
      <mesh position={[0, -1.5, 0.3]}>
        <boxGeometry args={[0.8, 0.5, 0.6]} />
        <meshStandardMaterial color="#c4b590" roughness={0.8} />
      </mesh>

      {/* Stand base */}
      <mesh position={[0, -1.85, 0.3]}>
        <boxGeometry args={[1.6, 0.15, 1.2]} />
        <meshStandardMaterial color="#b5a580" roughness={0.8} />
      </mesh>

      {/* Vent slots on side */}
      {[...Array(4)].map((_, i) => (
        <mesh key={i} position={[1.61, 0.5 - i * 0.3, 0]}>
          <boxGeometry args={[0.02, 0.08, 1.5]} />
          <meshStandardMaterial color="#9a8a6a" roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
};

const Keyboard = () => {
  return (
    <group position={[0, -0.6, 2.2]} rotation={[-0.3, 0, 0]}>
      {/* Keyboard body */}
      <mesh>
        <boxGeometry args={[3, 0.2, 1.5]} />
        <meshStandardMaterial color="#c4b590" roughness={0.8} />
      </mesh>
      {/* Keys grid */}
      {[...Array(4)].map((_, row) =>
        [...Array(10)].map((_, col) => (
          <mesh key={`${row}-${col}`} position={[-1.2 + col * 0.27, 0.12, -0.45 + row * 0.3]}>
            <boxGeometry args={[0.22, 0.08, 0.22]} />
            <meshStandardMaterial
              color={row === 0 && col === 0 ? '#2563eb' : '#e8dcc8'}
              roughness={0.5}
            />
          </mesh>
        ))
      )}
    </group>
  );
};

const FloppyDisk = () => (
  <group position={[3, -0.3, 1.5]} rotation={[0, -0.3, 0]}>
    <mesh>
      <boxGeometry args={[0.9, 0.05, 0.9]} />
      <meshStandardMaterial color="#1a1a2e" roughness={0.6} />
    </mesh>
    <mesh position={[0, 0.03, -0.25]}>
      <boxGeometry args={[0.5, 0.02, 0.3]} />
      <meshStandardMaterial color="#8a8a8a" roughness={0.4} metalness={0.6} />
    </mesh>
    <mesh position={[0.3, 0.03, 0.3]}>
      <boxGeometry args={[0.25, 0.02, 0.25]} />
      <meshStandardMaterial color="#f0e6d0" roughness={0.3} />
    </mesh>
  </group>
);

const FloatingParticles = () => {
  const particlesRef = useRef();
  const count = 30;

  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#F97316" transparent opacity={0.6} />
    </points>
  );
};

const PersonalComputerScene = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'C:\\> IBM PC 5150 READY_';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setDisplayText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ height: '400px', width: '100%', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 1, 6], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={80} color="#ffffff" />
        <pointLight position={[-3, 2, 4]} intensity={40} color="#F97316" />
        <pointLight position={[0, -1, 3]} intensity={20} color="#38BDF8" />

        <Monitor screenText={displayText} />
        <Keyboard />
        <FloppyDisk />
        <FloatingParticles />

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default PersonalComputerScene;
