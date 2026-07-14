import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const LogicGate = ({ position, type, color }) => {
  const gateRef = useRef();
  const [active, setActive] = useState(false);

  useFrame((state) => {
    if (gateRef.current) {
      gateRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1;
      const glow = active ? 0.6 : 0.2;
      gateRef.current.children[0].material.emissiveIntensity = glow + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group ref={gateRef} position={position} onClick={() => setActive(!active)}>
      <mesh>
        <cylinderGeometry args={[0.4, 0.5, 0.8, 6]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
      
      <Text position={[0, 0, 0.45]} fontSize={0.15} color="#ffffff" anchorX="center">
        {type}
      </Text>

      <mesh position={[-0.3, 0.6, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.3, 8]} />
        <meshStandardMaterial color="#94A3B8" />
      </mesh>
      <mesh position={[0.3, 0.6, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.3, 8]} />
        <meshStandardMaterial color="#94A3B8" />
      </mesh>
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.3, 8]} />
        <meshStandardMaterial color="#94A3B8" />
      </mesh>

      <Text position={[0, -1, 0]} fontSize={0.08} color="#6B7280" anchorX="center">
        {type === 'AND' && '1 AND 1 = 1'}
        {type === 'OR' && '1 OR 0 = 1'}
        {type === 'NOT' && 'NOT 1 = 0'}
        {type === 'XOR' && '1 XOR 0 = 1'}
      </Text>
    </group>
  );
};

const LogicGateScene = () => (
  <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
    <Canvas camera={{ position: [0, 0.5, 6], fov: 45 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={80} />
      <pointLight position={[-3, 2, 4]} intensity={40} color="#F97316" />
      <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />

      <LogicGate position={[-3, 0, 0]} type="AND" color="#F97316" />
      <LogicGate position={[-1, 0, 0]} type="OR" color="#38BDF8" />
      <LogicGate position={[1, 0, 0]} type="NOT" color="#10b981" />
      <LogicGate position={[3, 0, 0]} type="XOR" color="#8b5cf6" />

      <Text position={[0, 2, 0]} fontSize={0.15} color="#CBD5E1" anchorX="center">
        Puertas Lógicas
      </Text>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  </div>
);

export default LogicGateScene;
