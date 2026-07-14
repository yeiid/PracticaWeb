import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const Node = ({ position, size, color, label }) => {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });
  return (
    <group ref={meshRef} position={position}>
      <mesh>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>
      {label && (
        <Text position={[0, size + 0.15, 0]} fontSize={0.08} color="#CBD5E1" anchorX="center">
          {label}
        </Text>
      )}
    </group>
  );
};

const Connection = ({ start, end }) => {
  const points = useMemo(() => {
    const s = new Float32Array(start);
    const e = new Float32Array(end);
    return [s, e];
  }, [start, end]);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2}
          array={new Float32Array([...start, ...end])}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#38BDF8" transparent opacity={0.4} linewidth={1} />
    </line>
  );
};

const WebNetwork = () => {
  const groupRef = useRef();

  const nodes = useMemo(() => [
    { pos: [0, 0, 0], size: 0.25, color: '#F97316', label: 'WWW' },
    { pos: [-2, 0.5, -0.5], size: 0.15, color: '#38BDF8', label: 'HTML' },
    { pos: [2, 0.5, -0.5], size: 0.15, color: '#38BDF8', label: 'HTTP' },
    { pos: [-1.5, -0.8, 0.5], size: 0.12, color: '#A78BFA', label: 'URL' },
    { pos: [1.5, -0.8, 0.5], size: 0.12, color: '#A78BFA', label: 'URI' },
    { pos: [0, 1.5, -1], size: 0.18, color: '#34D399', label: 'Browser' },
    { pos: [-2.5, 0, 0.8], size: 0.1, color: '#FB7185', label: 'CSS' },
    { pos: [2.5, 0, 0.8], size: 0.1, color: '#FBBF24', label: 'JS' },
    { pos: [0, -1.5, -0.5], size: 0.14, color: '#60A5FA', label: 'Server' },
    { pos: [-1, 1.2, 1], size: 0.1, color: '#C084FC', label: 'Link' },
    { pos: [1, 1.2, 1], size: 0.1, color: '#C084FC', label: 'Link' },
    { pos: [0, 0.8, 1.2], size: 0.08, color: '#6EE7B7', label: 'Data' },
  ], []);

  const connections = useMemo(() => [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 8],
    [1, 6], [2, 7], [1, 9], [2, 10], [5, 9], [5, 10],
    [3, 6], [4, 7], [8, 3], [8, 4], [9, 11], [10, 11],
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {connections.map(([i, j], idx) => (
        <Connection key={idx} start={nodes[i].pos} end={nodes[j].pos} />
      ))}
      {nodes.map((node, i) => (
        <Node key={i} position={node.pos} size={node.size} color={node.color} label={node.label} />
      ))}
    </group>
  );
};

const BernersLeeScene = () => {
  return (
    <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={100} color="#ffffff" />
        <pointLight position={[-3, 2, 4]} intensity={50} color="#F97316" />
        <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />
        <WebNetwork />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.2} />
      </Canvas>
    </div>
  );
};

export default BernersLeeScene;
