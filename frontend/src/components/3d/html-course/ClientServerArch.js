import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box, Sphere, Cone } from '@react-three/drei';
import * as THREE from 'three';

// Componente para las partículas que fluyen
const FlowingParticles = () => {
  const count = 100;
  const particlesRef = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = THREE.MathUtils.randFloatSpread(0.1);
      pos[i * 3 + 1] = THREE.MathUtils.randFloat(-2, 2);
      pos[i * 3 + 2] = THREE.MathUtils.randFloatSpread(0.1);
    }
    return pos;
  }, [count]);

  useFrame(() => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += 0.02; // Movimiento hacia arriba
        if (positions[i * 3 + 1] > 2) {
          positions[i * 3 + 1] = -2; // Reiniciar abajo
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial attach="material" size={0.05} color="#00ffff" />
    </points>
  );
};


const ClientServerArch = () => {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* Frontend - Cliente */}
      <group position={[-3, 0, 0]}>
        <Box args={[2, 2, 0.2]}>
          <meshStandardMaterial color="#3498db" />
        </Box>
        <Text position={[0, 1.5, 0]} fontSize={0.5} color="white">
          Frontend
        </Text>
        <Text position={[0, -1.5, 0]} fontSize={0.3} color="white">
          (Navegador)
        </Text>
      </group>

      {/* Backend - Servidor */}
      <group position={[3, 0, 0]}>
        <Box args={[1.5, 3, 1]}>
          <meshStandardMaterial color="#2c3e50" />
        </Box>
        <Sphere args={[0.2, 16, 16]} position={[0, 1, 0.55]}>
            <meshStandardMaterial color="#2ecc71" emissive="#2ecc71" emissiveIntensity={2} />
        </Sphere>
        <Text position={[0, 2, 0]} fontSize={0.5} color="white">
          Backend
        </Text>
        <Text position={[0, -2, 0]} fontSize={0.3} color="white">
          (Servidor)
        </Text>
      </group>

      {/* Flechas de comunicación */}
      <group>
        <Cone args={[0.1, 0.4, 8]} position={[1, 0.5, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <meshStandardMaterial color="#f1c40f" />
        </Cone>
         <Box args={[2, 0.05, 0.05]} position={[-0.1, 0.5, 0]}>
            <meshStandardMaterial color="#f1c40f" />
        </Box>
        <Text position={[0, 0.8, 0]} fontSize={0.25} color="#f1c40f">
            API Request
        </Text>
      </group>
       <group>
        <Cone args={[0.1, 0.4, 8]} position={[-1, -0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
            <meshStandardMaterial color="#00ffff" />
        </Cone>
         <Box args={[2, 0.05, 0.05]} position={[0.1, -0.5, 0]}>
            <meshStandardMaterial color="#00ffff" />
        </Box>
        <Text position={[0, -0.2, 0]} fontSize={0.25} color="#00ffff">
            Data Response
        </Text>
      </group>

      {/* Partículas fluyendo para simular datos */}
      <FlowingParticles />

    </Canvas>
  );
};

export default ClientServerArch;
