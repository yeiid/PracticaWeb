import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const HTML5Logo = () => {
  const logoRef = useRef();

  useFrame((state) => {
    if (logoRef.current) {
      logoRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      logoRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={logoRef} position={[0, 0.5, 0]}>
      {/* Shield shape */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.15, 6]} />
        <meshStandardMaterial color="#e34c26" roughness={0.4} metalness={0.3} />
      </mesh>
      <Text position={[0, 0, 0.1]} fontSize={0.5} color="#ffffff" anchorX="center">
        5
      </Text>
    </group>
  );
};

const FloatingTags = () => {
  const tagsRef = useRef();
  const tags = ['video', 'canvas', 'audio', 'storage', 'geo'];

  useFrame((state, delta) => {
    if (tagsRef.current) tagsRef.current.rotation.y += delta * 0.15;
  });

  return (
    <group ref={tagsRef}>
      {tags.map((tag, i) => {
        const angle = (i / tags.length) * Math.PI * 2;
        const radius = 2.5;
        return (
          <group key={tag} position={[Math.cos(angle) * radius, Math.sin(i * 0.5) * 0.5, Math.sin(angle) * radius]}>
            <mesh>
              <boxGeometry args={[0.8, 0.3, 0.05]} />
              <meshStandardMaterial color="#f7df1e" roughness={0.4} />
            </mesh>
            <Text position={[0, 0, 0.04]} fontSize={0.08} color="#333" anchorX="center">
              {`<${tag}>`}
            </Text>
          </group>
        );
      })}
    </group>
  );
};

const HTML5Scene = () => (
  <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
    <Canvas camera={{ position: [0, 0.5, 5], fov: 45 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={80} />
      <pointLight position={[-3, 2, 4]} intensity={40} color="#F97316" />
      <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />
      <HTML5Logo />
      <FloatingTags />
      <Text position={[0, -2, 0]} fontSize={0.12} color="#CBD5E1" anchorX="center">
        HTML5 — 2008
      </Text>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  </div>
);

export default HTML5Scene;
