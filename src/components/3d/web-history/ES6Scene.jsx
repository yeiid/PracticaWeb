import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const CodeBlock = ({ code, position, color }) => {
  const blockRef = useRef();

  useFrame((state) => {
    if (blockRef.current) {
      blockRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.1;
    }
  });

  return (
    <group ref={blockRef} position={position}>
      <mesh>
        <boxGeometry args={[2.2, 0.4, 0.05]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.3} />
      </mesh>
      <Text position={[0, 0, 0.04]} fontSize={0.08} color="#ffffff" anchorX="center">
        {code}
      </Text>
    </group>
  );
};

const RotatingLogo = () => {
  const logoRef = useRef();

  useFrame((state) => {
    if (logoRef.current) {
      logoRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={logoRef} position={[0, 1.2, 0]}>
      <mesh>
        <boxGeometry args={[1.5, 0.6, 0.1]} />
        <meshStandardMaterial color="#f7df1e" roughness={0.4} />
      </mesh>
      <Text position={[0, 0, 0.06]} fontSize={0.25} color="#333" anchorX="center">
        ES6
      </Text>
    </group>
  );
};

const ES6Scene = () => (
  <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
    <Canvas camera={{ position: [0, 0.5, 5], fov: 45 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={80} />
      <pointLight position={[-3, 2, 4]} intensity={40} color="#F97316" />
      <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />

      <RotatingLogo />
      <CodeBlock code="const name = 'JS'" position={[-1.5, 0.4, 0]} color="#38BDF8" />
      <CodeBlock code="let count = 0" position={[1.5, 0.4, 0]} color="#F97316" />
      <CodeBlock code="() => arrow function" position={[-1.5, -0.2, 0]} color="#10b981" />
      <CodeBlock code={`template literals`} position={[1.5, -0.2, 0]} color="#8b5cf6" />
      <CodeBlock code="import/export module" position={[0, -0.8, 0]} color="#ef4444" />

      <Text position={[0, -2, 0]} fontSize={0.12} color="#CBD5E1" anchorX="center">
        JavaScript Moderno — 2015
      </Text>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  </div>
);

export default ES6Scene;
