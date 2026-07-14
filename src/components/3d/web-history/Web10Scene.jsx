import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const WebPage = () => {
  const pageRef = useRef();

  useFrame((state) => {
    if (pageRef.current) {
      pageRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      pageRef.current.position.y = 0.3 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={pageRef} position={[0, 0.3, 0]}>
      {/* Browser window frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 2.4, 0.1]} />
        <meshStandardMaterial color="#c0c0c0" roughness={0.6} />
      </mesh>

      {/* Title bar */}
      <mesh position={[0, 1, 0.06]}>
        <boxGeometry args={[2.8, 0.2, 0.02]} />
        <meshStandardMaterial color="#000080" roughness={0.4} />
      </mesh>
      <Text position={[0, 1, 0.08]} fontSize={0.08} color="#ffffff" anchorX="center">
        Netscape Navigator
      </Text>

      {/* Content area - simple HTML page */}
      <mesh position={[0, -0.1, 0.06]}>
        <boxGeometry args={[2.6, 1.6, 0.02]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>

      {/* Header text */}
      <Text position={[0, 0.5, 0.08]} fontSize={0.15} color="#000000" anchorX="center">
        Welcome to My Page!
      </Text>

      {/* Navigation links */}
      <Text position={[0, 0.2, 0.08]} fontSize={0.06} color="#0000ff" anchorX="center">
        Home | About | Links | Contact
      </Text>

      {/* Content lines */}
      {[...Array(3)].map((_, i) => (
        <mesh key={i} position={[0, -0.1 - i * 0.15, 0.08]}>
          <boxGeometry args={[2, 0.06, 0.001]} />
          <meshStandardMaterial color="#333" roughness={0.5} />
        </mesh>
      ))}

      {/* Blue underlined links */}
      {[0, 1, 2].map((i) => (
        <mesh key={`link-${i}`} position={[-0.5 + i * 0.5, -0.5, 0.08]}>
          <boxGeometry args={[0.4, 0.04, 0.001]} />
          <meshStandardMaterial color="#0000ff" roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
};

const ServerTower = () => {
  const serverRef = useRef();

  useFrame((state) => {
    if (serverRef.current) {
      serverRef.current.children.forEach((child, i) => {
        if (child.material && child.material.emissiveIntensity !== undefined) {
          child.material.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.3;
        }
      });
    }
  });

  return (
    <group ref={serverRef} position={[2.5, -0.5, -1]}>
      {/* Server body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.6, 1.2, 0.4]} />
        <meshStandardMaterial color="#333" roughness={0.5} metalness={0.5} />
      </mesh>
      {/* LED indicators */}
      {[...Array(4)].map((_, i) => (
        <mesh key={i} position={[0.2, 0.3 - i * 0.15, 0.21]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  );
};

const Web10Scene = () => (
  <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
    <Canvas camera={{ position: [0, 0.5, 4.5], fov: 45 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={80} />
      <pointLight position={[-3, 2, 4]} intensity={40} color="#F97316" />
      <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />
      <WebPage />
      <ServerTower />
      <Text position={[0, -2, 0]} fontSize={0.12} color="#CBD5E1" anchorX="center">
        Web 1.0 — HTML &amp; CSS — 1996
      </Text>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  </div>
);

export default Web10Scene;
