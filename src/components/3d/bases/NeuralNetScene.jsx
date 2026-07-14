import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const Neuron = ({ position, layer, color }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2 + layer * 1.5 + position[1]) * 0.15 + 0.85;
      meshRef.current.scale.set(pulse, pulse, pulse);
      meshRef.current.material.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 3 + position[1]) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.15, 12, 12]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        roughness={0.3}
        metalness={0.7}
      />
    </mesh>
  );
};

const Connection = ({ start, end, color }) => {
  const lineRef = useRef();

  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.material.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 2 + start[1] + end[1]) * 0.1;
    }
  });

  const points = useMemo(() => {
    const arr = new Float32Array([...start, ...end]);
    return arr;
  }, [start, end]);

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={2} array={points} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.2} />
    </line>
  );
};

const SignalPulse = ({ from, to, color }) => {
  const pulseRef = useRef();

  useFrame((state) => {
    if (pulseRef.current) {
      const t = (state.clock.elapsedTime * 0.6 + from[1] * 0.5) % 1;
      pulseRef.current.position.x = from[0] + (to[0] - from[0]) * t;
      pulseRef.current.position.y = from[1] + (to[1] - from[1]) * t;
      pulseRef.current.position.z = from[2] + (to[2] - from[2]) * t;
    }
  });

  return (
    <mesh ref={pulseRef}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
    </mesh>
  );
};

const NeuralNetScene = () => {
  const layers = [
    { count: 3, x: -3, color: '#38BDF8', label: 'Input' },
    { count: 4, x: -1, color: '#F97316', label: 'Hidden 1' },
    { count: 4, x: 1, color: '#10b981', label: 'Hidden 2' },
    { count: 2, x: 3, color: '#ec4899', label: 'Output' },
  ];

  const neurons = useMemo(() => {
    const result = [];
    layers.forEach((layer, li) => {
      for (let ni = 0; ni < layer.count; ni++) {
        const y = (ni - (layer.count - 1) / 2) * 0.7;
        result.push({
          position: [layer.x, y, 0],
          layer: li,
          color: layer.color,
        });
      }
    });
    return result;
  }, []);

  const connections = useMemo(() => {
    const result = [];
    let prevLayer = [];
    layers.forEach((layer, li) => {
      const currentLayer = [];
      for (let ni = 0; ni < layer.count; ni++) {
        const y = (ni - (layer.count - 1) / 2) * 0.7;
        currentLayer.push([layer.x, y, 0]);
      }
      if (li > 0) {
        prevLayer.forEach((prev) => {
          currentLayer.forEach((curr) => {
            result.push({ start: prev, end: curr, color: layer.color });
          });
        });
      }
      prevLayer = currentLayer;
    });
    return result;
  }, []);

  const pulses = useMemo(() => {
    return connections.filter((_, i) => i % 3 === 0).map((c) => ({
      from: c.start,
      to: c.end,
      color: c.color,
    }));
  }, [connections]);

  return (
    <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={80} />
        <pointLight position={[-3, 2, 4]} intensity={40} color="#F97316" />
        <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />

        {connections.map((c, i) => (
          <Connection key={i} {...c} />
        ))}

        {neurons.map((n, i) => (
          <Neuron key={i} {...n} />
        ))}

        {pulses.map((p, i) => (
          <SignalPulse key={i} {...p} />
        ))}

        {/* Layer labels */}
        {layers.map((layer, i) => (
          <Text key={i} position={[layer.x, -2.2, 0]} fontSize={0.11} color="#6B7280" anchorX="center">
            {layer.label}
          </Text>
        ))}

        <Text position={[0, 2.5, 0]} fontSize={0.16} color="#CBD5E1" anchorX="center">
          Red Neuronal: capas de neuronas artificiales
        </Text>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
      </Canvas>
    </div>
  );
};

export default NeuralNetScene;
