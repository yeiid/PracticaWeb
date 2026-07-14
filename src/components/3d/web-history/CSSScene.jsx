import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const Stylesheet = () => {
  const sheetRef = useRef();

  useFrame((state) => {
    if (sheetRef.current) {
      sheetRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
      sheetRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    }
  });

  return (
    <group ref={sheetRef} position={[-1.5, 0.5, 0]}>
      {/* CSS Document */}
      <mesh>
        <boxGeometry args={[2, 2.8, 0.05]} />
        <meshStandardMaterial color="#264de4" roughness={0.6} />
      </mesh>
      <Text position={[0, 1.1, 0.03]} fontSize={0.2} color="#ffffff" anchorX="center">
        CSS
      </Text>
      {/* Code lines */}
      {[...Array(6)].map((_, i) => (
        <mesh key={i} position={[0, 0.5 - i * 0.3, 0.03]}>
          <boxGeometry args={[1.4, 0.08, 0.01]} />
          <meshStandardMaterial color="#ffffff" roughness={0.5} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
};

const HTMLElements = () => {
  const elementsRef = useRef();

  useFrame((state) => {
    if (elementsRef.current) {
      elementsRef.current.rotation.y = -Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  return (
    <group ref={elementsRef} position={[1.5, 0.5, 0]}>
      {/* HTML Document */}
      <mesh>
        <boxGeometry args={[2, 2.8, 0.05]} />
        <meshStandardMaterial color="#e34c26" roughness={0.6} />
      </mesh>
      <Text position={[0, 1.1, 0.03]} fontSize={0.2} color="#ffffff" anchorX="center">
        HTML
      </Text>
      {/* Element boxes */}
      {['div', 'h1', 'p', 'a'].map((tag, i) => (
        <group key={tag} position={[0, 0.4 - i * 0.45, 0.03]}>
          <mesh>
            <boxGeometry args={[1.2, 0.25, 0.01]} />
            <meshStandardMaterial color="#ffffff" roughness={0.4} />
          </mesh>
          <Text position={[0, 0, 0.02]} fontSize={0.08} color="#333" anchorX="center">
            {`<${tag}>`}
          </Text>
        </group>
      ))}
    </group>
  );
};

const ConnectionBeam = () => {
  const beamRef = useRef();

  useFrame((state) => {
    if (beamRef.current) {
      beamRef.current.material.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <mesh ref={beamRef} position={[0, 0.5, -0.5]} rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[0.03, 0.03, 1.5, 16]} />
      <meshStandardMaterial color="#F97316" emissive="#F97316" emissiveIntensity={0.5} />
    </mesh>
  );
};

const CSSScene = () => (
  <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
    <Canvas camera={{ position: [0, 0.5, 5], fov: 45 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={80} />
      <pointLight position={[-3, 2, 4]} intensity={40} color="#F97316" />
      <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />
      <Stylesheet />
      <HTMLElements />
      <ConnectionBeam />
      <Text position={[0, -2, 0]} fontSize={0.12} color="#CBD5E1" anchorX="center">
        CSS Estándar — 1996
      </Text>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  </div>
);

export default CSSScene;
