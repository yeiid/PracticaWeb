import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const CipherLetter = ({ position, original, encrypted, isEncrypted, delay }) => {
  const meshRef = useRef();
  const [displayChar, setDisplayChar] = useState(original);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2 + delay) * 0.1;
      const t = state.clock.elapsedTime;
      const cycle = Math.floor(t / 4) % 2;
      setDisplayChar(cycle === 0 ? original : encrypted);
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <boxGeometry args={[0.5, 0.6, 0.1]} />
        <meshStandardMaterial
          color={displayChar !== original ? '#F97316' : '#38BDF8'}
          emissive={displayChar !== original ? '#F97316' : '#38BDF8'}
          emissiveIntensity={0.3}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
      <Text position={[0, 0, 0.08]} fontSize={0.25} color="#ffffff" anchorX="center" fontWeight="bold">
        {displayChar}
      </Text>
    </group>
  );
};

const LockIcon = ({ position }) => {
  const lockRef = useRef();

  useFrame((state) => {
    if (lockRef.current) {
      lockRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group ref={lockRef} position={position}>
      {/* Lock body */}
      <mesh>
        <boxGeometry args={[0.5, 0.4, 0.3]} />
        <meshStandardMaterial color="#F97316" emissive="#F97316" emissiveIntensity={0.4} roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Lock shackle */}
      <mesh position={[0, 0.3, 0]}>
        <torusGeometry args={[0.15, 0.04, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#E2E8F0" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Keyhole */}
      <mesh position={[0, 0, 0.16]}>
        <circleGeometry args={[0.06, 16]} />
        <meshStandardMaterial color="#0B0F1A" />
      </mesh>
    </group>
  );
};

const EncryptionScene = () => {
  const original = 'HOLA';
  const encrypted = 'KROD';
  const shift = 3;

  return (
    <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={80} />
        <pointLight position={[-3, 2, 4]} intensity={40} color="#F97316" />
        <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />

        <Text position={[0, 2.5, 0]} fontSize={0.18} color="#CBD5E1" anchorX="center">
          Cifrado César: cada letra se desplaza {shift} posiciones
        </Text>

        {/* Original text */}
        <Text position={[-2, 1.5, 0]} fontSize={0.13} color="#38BDF8" anchorX="center">
          Original
        </Text>
        {original.split('').map((char, i) => (
          <CipherLetter
            key={`orig-${i}`}
            position={[-2.8 + i * 0.7, 0.8, 0]}
            original={char}
            encrypted={encrypted[i]}
            isEncrypted={false}
            delay={i * 0.5}
          />
        ))}

        {/* Arrow */}
        <Text position={[0, 0.8, 0]} fontSize={0.2} color="#F97316" anchorX="center">
          → +{shift} →
        </Text>

        {/* Encrypted text */}
        <Text position={[2, 1.5, 0]} fontSize={0.13} color="#F97316" anchorX="center">
          Cifrado
        </Text>
        {encrypted.split('').map((char, i) => (
          <CipherLetter
            key={`enc-${i}`}
            position={[1.2 + i * 0.7, 0.8, 0]}
            original={original[i]}
            encrypted={char}
            isEncrypted={true}
            delay={i * 0.5 + 0.25}
          />
        ))}

        {/* Lock */}
        <LockIcon position={[0, -0.8, 0]} />

        <Text position={[0, -1.8, 0]} fontSize={0.12} color="#6B7280" anchorX="center">
          H → K | O → R | L → O | A → D
        </Text>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  );
};

export default EncryptionScene;
