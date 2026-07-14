import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const PythonWindow = ({ position, delay }) => {
  const meshRef = useRef();
  const [codeLine, setCodeLine] = useState(0);
  const codeLines = ['>>> import this', '>>> import antigravity', '>>> print("Hello")', '>>> def life():', '...    return True'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCodeLine(prev => (prev + 1) % codeLines.length);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      <mesh>
        <boxGeometry args={[0.8, 0.55, 0.05]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.23, 0.03]}>
        <boxGeometry args={[0.8, 0.08, 0.01]} />
        <meshStandardMaterial color="#252E42" />
      </mesh>
      {[-0.32, -0.24, -0.16].map((x, i) => (
        <mesh key={i} position={[x, 0.23, 0.04]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color={['#FF5F56', '#FFBD2E', '#27C93F'][i]} />
        </mesh>
      ))}
      <mesh position={[0, -0.02, 0.03]}>
        <boxGeometry args={[0.7, 0.35, 0.01]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      <Text position={[-0.28, 0.08, 0.04]} fontSize={0.04} color="#38BDF8" anchorX="left">
        {codeLines[codeLine]}
      </Text>
      <Text position={[-0.28, 0.02, 0.04]} fontSize={0.04} color="#F97316" anchorX="left">
        {'Python 3.x'}
      </Text>
    </group>
  );
};

const Snake = ({ position }) => {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.7) * 0.06;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    }
  });
  return (
    <group ref={meshRef} position={position}>
      {/* Body coils */}
      {[0, 0.3, 0.6].map((x, i) => (
        <mesh key={i} position={[x * 0.3, Math.sin(x * 3) * 0.05, 0]}>
          <torusGeometry args={[0.12, 0.04, 8, 16]} />
          <meshStandardMaterial color={i === 2 ? '#F97316' : '#38BDF8'} roughness={0.4} />
        </mesh>
      ))}
      {/* Head */}
      <mesh position={[0.5, 0.08, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#38BDF8" roughness={0.4} />
      </mesh>
      {/* Eyes */}
      <mesh position={[0.54, 0.12, 0.04]}>
        <sphereGeometry args={[0.02, 6, 6]} />
        <meshStandardMaterial color="#F97316" />
      </mesh>
      <mesh position={[0.54, 0.12, -0.04]}>
        <sphereGeometry args={[0.02, 6, 6]} />
        <meshStandardMaterial color="#F97316" />
      </mesh>
      {/* Tongue */}
      <mesh position={[0.58, 0.08, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.005, 0.005, 0.06, 4]} />
        <meshStandardMaterial color="#FF4444" />
      </mesh>
    </group>
  );
};

const VanRossumCharacter = () => {
  return (
    <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={100} />
        <pointLight position={[-3, 2, 4]} intensity={50} color="#F97316" />
        <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />
        {/* Avatar */}
        <group>
          <mesh position={[0, 1.2, 0]}>
            <sphereGeometry args={[0.45, 24, 24]} />
            <meshStandardMaterial color="#D4A574" roughness={0.3} metalness={0.3} />
          </mesh>
          <mesh position={[-0.15, 1.3, 0.4]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
          <mesh position={[0.15, 1.3, 0.4]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
          {/* Glasses */}
          <mesh position={[-0.15, 1.32, 0.42]}>
            <torusGeometry args={[0.08, 0.01, 8, 16]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0.15, 1.32, 0.42]}>
            <torusGeometry args={[0.08, 0.01, 8, 16]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 1.32, 0.43]}>
            <boxGeometry args={[0.06, 0.015, 0.01]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
          {/* Hair */}
          <mesh position={[0, 1.6, -0.05]}>
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshStandardMaterial color="#8B7355" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.25, 0.35, 1, 16]} />
            <meshStandardMaterial color="#F5F5DC" roughness={0.4} metalness={0.2} />
          </mesh>
          <mesh position={[0, -0.15, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 0.1, 24]} />
            <meshStandardMaterial color="#252E42" roughness={0.6} metalness={0.4} />
          </mesh>
        </group>
        <PythonWindow position={[-1.1, 0.6, 0.5]} delay={0} />
        <PythonWindow position={[1.1, 0.8, -0.3]} delay={1.5} />
        <Snake position={[0, -0.2, 1]} />
        <Text position={[0, -0.6, 0]} fontSize={0.15} color="#F8FAFC" anchorX="center">Guido van Rossum</Text>
        <Text position={[0, -0.8, 0]} fontSize={0.08} color="#F97316" anchorX="center">1956 —</Text>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  );
};

export default VanRossumCharacter;
