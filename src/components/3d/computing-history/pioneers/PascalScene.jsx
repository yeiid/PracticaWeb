import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const Gear = ({ position, size, speed, color, teeth = 0 }) => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) meshRef.current.rotation.z += delta * speed;
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Main gear body */}
      <mesh>
        <torusGeometry args={[size, size * 0.2, 12, 32]} />
        <meshStandardMaterial color={color} metalness={0.85} roughness={0.15} />
      </mesh>
      {/* Center hub */}
      <mesh>
        <cylinderGeometry args={[size * 0.3, size * 0.3, 0.3, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Teeth */}
      {teeth > 0 && [...Array(teeth)].map((_, i) => {
        const angle = (i / teeth) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * size, Math.sin(angle) * size, 0]}>
            <boxGeometry args={[size * 0.18, size * 0.12, 0.25]} />
            <meshStandardMaterial color={color} metalness={0.85} roughness={0.15} />
          </mesh>
        );
      })}
    </group>
  );
};

const NumberWheel = ({ position, size, speed }) => {
  const meshRef = useRef();
  const [digit, setDigit] = React.useState(0);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * speed;
      const newDigit = Math.floor((state.clock.elapsedTime * speed * 2) % 10);
      setDigit(newDigit);
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <cylinderGeometry args={[size, size, 0.2, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#B8860B" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, size + 0.11]}>
        <boxGeometry args={[size * 1.2, size * 1.2, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>
      <Text
        position={[0, 0, size + 0.13]}
        fontSize={size * 0.9}
        color="#00ff41"
        anchorX="center"
        anchorY="middle"
      >
        {digit.toString()}
      </Text>
    </group>
  );
};

const PascalinaMachine = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Base box */}
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[3.5, 0.4, 2.5]} />
        <meshStandardMaterial color="#5C4033" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Side walls */}
      <mesh position={[-1.6, -0.3, 0]}>
        <boxGeometry args={[0.3, 1.2, 2.5]} />
        <meshStandardMaterial color="#6B4423" roughness={0.6} metalness={0.2} />
      </mesh>
      <mesh position={[1.6, -0.3, 0]}>
        <boxGeometry args={[0.3, 1.2, 2.5]} />
        <meshStandardMaterial color="#6B4423" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* Top plate */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[3.2, 0.1, 2.3]} />
        <meshStandardMaterial color="#8B7355" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Number wheels - 6 positions */}
      {[-1.2, -0.48, 0.24, 0.96, 1.68, 2.4].map((x, i) => (
        <NumberWheel
          key={`wheel-${i}`}
          position={[x - 0.6, 0.2, 0]}
          size={0.22}
          speed={0.3 + i * 0.15}
        />
      ))}

      {/* Side gears */}
      <Gear position={[-1.4, 0.1, 1.2]} size={0.3} speed={0.5} color="#C0C0C0" teeth={10} />
      <Gear position={[1.4, 0.1, 1.2]} size={0.25} speed={-0.6} color="#DAA520" teeth={8} />
      <Gear position={[0, 0.1, -1.2]} size={0.35} speed={0.4} color="#B8860B" teeth={12} />

      {/* Crank handle */}
      <group position={[1.8, 0.5, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 0.8, 8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.6} />
        </mesh>
        <mesh position={[0.45, 0, 0]}>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial color="#5C4033" roughness={0.5} />
        </mesh>
      </group>

      {/* Label */}
      <Text position={[0, -1.4, 0]} fontSize={0.12} color="#CBD5E1" anchorX="center">
        La Pascalina — 1642
      </Text>
    </group>
  );
};

const PascalScene = () => {
  return (
    <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 1.5, 5], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={100} color="#ffffff" />
        <pointLight position={[-3, 2, 4]} intensity={50} color="#F97316" />
        <pointLight position={[0, -1, 3]} intensity={25} color="#38BDF8" />
        <PascalinaMachine />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
      </Canvas>
    </div>
  );
};

export default PascalScene;
