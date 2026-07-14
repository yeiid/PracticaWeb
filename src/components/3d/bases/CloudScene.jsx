import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const Server = ({ position, color }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.children[2].material.emissiveIntensity =
        0.3 + Math.sin(state.clock.elapsedTime * 3 + position[0] * 2) * 0.3;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      <mesh>
        <boxGeometry args={[0.5, 0.12, 0.35]} />
        <meshStandardMaterial color="#374151" roughness={0.4} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.14, 0]}>
        <boxGeometry args={[0.5, 0.12, 0.35]} />
        <meshStandardMaterial color="#4B5563" roughness={0.4} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.28, 0]}>
        <boxGeometry args={[0.5, 0.12, 0.35]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} roughness={0.3} metalness={0.7} />
      </mesh>
      {/* LED */}
      <mesh position={[0.2, 0.28, 0.18]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={1} />
      </mesh>
    </group>
  );
};

const DataPacket = ({ from, to, color }) => {
  const packetRef = useRef();

  useFrame((state) => {
    if (packetRef.current) {
      const t = (state.clock.elapsedTime * 0.4) % 1;
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      packetRef.current.position.x = from[0] + (to[0] - from[0]) * ease;
      packetRef.current.position.y = from[1] + (to[1] - from[1]) * ease + Math.sin(ease * Math.PI) * 0.8;
      packetRef.current.position.z = from[2] + (to[2] - from[2]) * ease;
    }
  });

  return (
    <mesh ref={packetRef}>
      <octahedronGeometry args={[0.08]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
    </mesh>
  );
};

const CloudShape = ({ position }) => {
  return (
    <group position={position}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#1E3A5F" transparent opacity={0.15} />
      </mesh>
      <mesh position={[0.4, 0.1, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#1E3A5F" transparent opacity={0.12} />
      </mesh>
      <mesh position={[-0.4, 0.05, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#1E3A5F" transparent opacity={0.12} />
      </mesh>
      <mesh position={[0.15, 0.3, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#1E3A5F" transparent opacity={0.1} />
      </mesh>
    </group>
  );
};

const CloudScene = () => (
  <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
    <Canvas camera={{ position: [0, 1, 7], fov: 45 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={80} />
      <pointLight position={[-3, 2, 4]} intensity={40} color="#F97316" />
      <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />

      {/* Cloud outline */}
      <CloudShape position={[0, 2, 0]} />
      <Text position={[0, 2.8, 0]} fontSize={0.18} color="#38BDF8" anchorX="center">
        ☁️ Cloud Computing
      </Text>

      {/* Servers inside cloud */}
      <Server position={[-1, 1.8, 0]} color="#F97316" />
      <Server position={[0, 1.8, 0]} color="#38BDF8" />
      <Server position={[1, 1.8, 0]} color="#10b981" />

      {/* User devices below */}
      <mesh position={[-2, -0.5, 1]}>
        <boxGeometry args={[0.3, 0.4, 0.1]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.3} />
      </mesh>
      <Text position={[-2, -0.9, 1]} fontSize={0.08} color="#CBD5E1" anchorX="center">Usuario</Text>

      <mesh position={[0, -0.5, 1]}>
        <boxGeometry args={[0.4, 0.25, 0.1]} />
        <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.3} />
      </mesh>
      <Text position={[0, -0.9, 1]} fontSize={0.08} color="#CBD5E1" anchorX="center">Empresa</Text>

      <mesh position={[2, -0.5, 1]}>
        <boxGeometry args={[0.35, 0.2, 0.1]} />
        <meshStandardMaterial color="#eab308" emissive="#eab308" emissiveIntensity={0.3} />
      </mesh>
      <Text position={[2, -0.9, 1]} fontSize={0.08} color="#CBD5E1" anchorX="center">IoT</Text>

      {/* Data packets flowing */}
      <DataPacket from={[-2, -0.3, 1]} to={[0, 1.8, 0]} color="#8b5cf6" />
      <DataPacket from={[0, -0.3, 1]} to={[0, 1.8, 0]} color="#ec4899" />
      <DataPacket from={[2, -0.3, 1]} to={[1, 1.8, 0]} color="#eab308" />
      <DataPacket from={[1, 1.8, 0]} to={[2, -0.3, 1]} color="#10b981" />

      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  </div>
);

export default CloudScene;
