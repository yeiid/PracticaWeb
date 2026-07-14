import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const DecentralizedNode = ({ position, color, label }) => {
  const nodeRef = useRef();
  const wireRef = useRef();

  useFrame((state) => {
    if (nodeRef.current) {
      nodeRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      nodeRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      nodeRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1;
    }
    if (wireRef.current) {
      wireRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group position={position}>
      {/* Outer translucent cube */}
      <mesh ref={nodeRef}>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.3}
          roughness={0.1}
          metalness={0.9}
          depthWrite={false}
        />
      </mesh>

      {/* Inner wireframe */}
      <mesh ref={wireRef}>
        <boxGeometry args={[1.21, 1.21, 1.21]} />
        <meshBasicMaterial color={color} wireframe opacity={0.6} transparent />
      </mesh>

      {/* Label */}
      <Text position={[0, -1, 0]} fontSize={0.12} color="#CBD5E1" anchorX="center">
        {label}
      </Text>
    </group>
  );
};

const ConnectionLines = () => {
  const linesRef = useRef();

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const positions = useMemo(() => new Float32Array([
    -2, 0, 0, 0, 0, 0,
    0, 0, 0, 2, 0, 0,
    -2, 0, 0, 2, 0, 0,
    2, 0, 0, -2, 0, 0,
  ]), []);

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color="#F97316" opacity={0.5} transparent />
    </lineSegments>
  );
};

const Web30Scene = () => (
  <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
    <Canvas camera={{ position: [0, 0.5, 5], fov: 45 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={80} />
      <pointLight position={[-3, 2, 4]} intensity={40} color="#F97316" />
      <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />

      <DecentralizedNode position={[-2, 0.3, 0]} color="#ffd93d" label="Blockchain" />
      <DecentralizedNode position={[0, 0.3, 0]} color="#6bcf7f" label="AI/ML" />
      <DecentralizedNode position={[2, 0.3, 0]} color="#4d96ff" label="Metaverse" />

      <ConnectionLines />

      <Text position={[0, -2, 0]} fontSize={0.12} color="#CBD5E1" anchorX="center">
        Web3 — Descentralización — 2017+
      </Text>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  </div>
);

export default Web30Scene;
