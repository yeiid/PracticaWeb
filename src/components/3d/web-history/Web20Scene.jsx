import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const SocialBubble = ({ position, color, icon, label }) => {
  const bubbleRef = useRef();

  useFrame((state) => {
    if (bubbleRef.current) {
      bubbleRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.15;
      bubbleRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={bubbleRef} position={position}>
      {/* Main bubble */}
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.7}
          emissive={color}
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Orbiting satellites */}
      {[...Array(6)].map((_, i) => (
        <mesh key={i} position={[
          Math.cos(i * Math.PI / 3) * 1.2,
          Math.sin(i * Math.PI / 3) * 1.2,
          0
        ]}>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
        </mesh>
      ))}

      {/* Label */}
      <Text position={[0, -1, 0]} fontSize={0.12} color="#CBD5E1" anchorX="center">
        {label}
      </Text>
    </group>
  );
};

const Web20Scene = () => (
  <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
    <Canvas camera={{ position: [0, 0.5, 5], fov: 45 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={80} />
      <pointLight position={[-3, 2, 4]} intensity={40} color="#F97316" />
      <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />

      <SocialBubble position={[-2, 0.5, 0]} color="#1da1f2" icon="🐦" label="Twitter" />
      <SocialBubble position={[0, -0.3, 0]} color="#1877f2" icon="👥" label="Facebook" />
      <SocialBubble position={[2, 0.5, 0]} color="#ff0000" icon="▶️" label="YouTube" />
      <SocialBubble position={[-1, -1.2, 0]} color="#ff8800" icon="✍️" label="Blog" />
      <SocialBubble position={[1, -1.2, 0]} color="#00cc66" icon="💬" label="Comments" />

      <Text position={[0, -2.5, 0]} fontSize={0.12} color="#CBD5E1" anchorX="center">
        Web 2.0 — La Era Social — 2004
      </Text>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  </div>
);

export default Web20Scene;
