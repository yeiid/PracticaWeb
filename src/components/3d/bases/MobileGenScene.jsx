import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const Antenna = ({ position, label, year, color, height = 1.5 }) => {
  const glowRef = useRef();

  useFrame((state) => {
    if (glowRef.current) {
      glowRef.current.material.emissiveIntensity = 0.4 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.3;
    }
  });

  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[0.5, 0.15, 0.5]} />
        <meshStandardMaterial color="#374151" roughness={0.5} metalness={0.8} />
      </mesh>
      {/* Pole */}
      <mesh position={[0, height / 2 - 0.6, 0]}>
        <cylinderGeometry args={[0.04, 0.06, height, 8]} />
        <meshStandardMaterial color="#6B7280" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Top */}
      <mesh ref={glowRef} position={[0, height - 0.6, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
      {/* Signal rings */}
      {[0.3, 0.5, 0.7].map((s, i) => (
        <mesh key={i} position={[0, height - 0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[s + i * 0.2, 0.015, 8, 32]} />
          <meshStandardMaterial color={color} transparent opacity={0.3 - i * 0.08} emissive={color} emissiveIntensity={0.3} />
        </mesh>
      ))}
      <Text position={[0, -1, 0]} fontSize={0.15} color={color} anchorX="center" fontWeight="bold">
        {label}
      </Text>
      <Text position={[0, -1.3, 0]} fontSize={0.1} color="#6B7280" anchorX="center">
        {year}
      </Text>
    </group>
  );
};

const MobileGenScene = () => (
  <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
    <Canvas camera={{ position: [0, 1, 8], fov: 45 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={80} />
      <pointLight position={[-3, 2, 4]} intensity={40} color="#F97316" />
      <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />

      {/* Ground line */}
      <mesh position={[0, -0.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 0.02]} />
        <meshStandardMaterial color="#374151" />
      </mesh>

      <Antenna position={[-4, 0, 0]} label="1G" year="1980s" color="#ef4444" height={0.8} />
      <Antenna position={[-2, 0, 0]} label="2G" year="1990s" color="#f97316" height={1.0} />
      <Antenna position={[0, 0, 0]} label="3G" year="2000s" color="#eab308" height={1.3} />
      <Antenna position={[2, 0, 0]} label="4G" year="2010s" color="#22c55e" height={1.6} />
      <Antenna position={[4, 0, 0]} label="5G" year="2020s" color="#3b82f6" height={2.0} />

      <Text position={[0, 2.8, 0]} fontSize={0.18} color="#CBD5E1" anchorX="center">
        Evolución de las Redes Móviles
      </Text>
      <Text position={[0, -1.8, 0]} fontSize={0.1} color="#6B7280" anchorX="center">
        Analógico → SMS → Internet → Streaming → IoT
      </Text>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  </div>
);

export default MobileGenScene;
