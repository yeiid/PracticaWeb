import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const Node = ({ position, color, label, size = 0.3 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
      <Text position={[position[0], position[1] - size - 0.2, position[2]]} fontSize={0.1} color="#CBD5E1" anchorX="center">
        {label}
      </Text>
    </group>
  );
};

const DataPacket = ({ start, end, color }) => {
  const packetRef = useRef();

  useFrame((state) => {
    if (packetRef.current) {
      const t = (state.clock.elapsedTime * 0.5) % 1;
      packetRef.current.position.x = start[0] + (end[0] - start[0]) * t;
      packetRef.current.position.y = start[1] + (end[1] - start[1]) * t + Math.sin(t * Math.PI) * 0.5;
      packetRef.current.position.z = start[2] + (end[2] - start[2]) * t;
    }
  });

  return (
    <mesh ref={packetRef}>
      <boxGeometry args={[0.12, 0.12, 0.12]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
    </mesh>
  );
};

const ConnectionLine = ({ start, end }) => {
  const positions = useMemo(() => new Float32Array([...start, ...end]), [start, end]);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={2} array={positions} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color="#374151" opacity={0.5} transparent />
    </line>
  );
};

const NetworkScene = () => {
  const nodes = [
    { pos: [0, 1, 0], color: '#F97316', label: 'Servidor', size: 0.4 },
    { pos: [-2, -0.5, 0], color: '#38BDF8', label: 'Cliente 1' },
    { pos: [0, -1, 0], color: '#10b981', label: 'Cliente 2' },
    { pos: [2, -0.5, 0], color: '#8b5cf6', label: 'Cliente 3' },
    { pos: [-1, 0, 0.5], color: '#ec4899', label: 'Router' },
    { pos: [1, 0, 0.5], color: '#eab308', label: 'Router 2' },
  ];

  const connections = [
    [[0, 1, 0], [-1, 0, 0.5]],
    [[0, 1, 0], [1, 0, 0.5]],
    [[-1, 0, 0.5], [-2, -0.5, 0]],
    [[-1, 0, 0.5], [0, -1, 0]],
    [[1, 0, 0.5], [0, -1, 0]],
    [[1, 0, 0.5], [2, -0.5, 0]],
  ];

  return (
    <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 0.5, 5], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={80} />
        <pointLight position={[-3, 2, 4]} intensity={40} color="#F97316" />
        <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />

        {nodes.map((node, i) => (
          <Node key={i} position={node.pos} color={node.color} label={node.label} size={node.size} />
        ))}

        {connections.map((conn, i) => (
          <ConnectionLine key={i} start={conn[0]} end={conn[1]} />
        ))}

        <DataPacket start={[0, 1, 0]} end={[-2, -0.5, 0]} color="#F97316" />
        <DataPacket start={[0, 1, 0]} end={[2, -0.5, 0]} color="#38BDF8" />
        <DataPacket start={[-1, 0, 0.5]} end={[0, -1, 0]} color="#10b981" />

        <Text position={[0, 2, 0]} fontSize={0.12} color="#CBD5E1" anchorX="center">
          Red: Datos viajan en paquetes
        </Text>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  );
};

export default NetworkScene;
