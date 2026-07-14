import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const TerminalScreen = () => {
  const meshRef = useRef();
  const [codeLines, setCodeLines] = useState([]);
  const [cursorVisible, setCursorVisible] = useState(true);

  const cobolCode = [
    'IDENTIFICATION DIVISION.',
    'PROGRAM-ID. HELLOWORLD.',
    'PROCEDURE DIVISION.',
    '  DISPLAY "HELLO, WORLD!"',
    '  STOP RUN.',
  ];

  useEffect(() => {
    let lineIndex = 0;
    const lineInterval = setInterval(() => {
      if (lineIndex < cobolCode.length) {
        setCodeLines(prev => [...prev, cobolCode[lineIndex]]);
        lineIndex++;
      }
    }, 800);

    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);

    return () => {
      clearInterval(lineInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group position={[0, 0.8, 0]}>
      {/* Monitor casing */}
      <mesh>
        <boxGeometry args={[3, 2, 1.5]} />
        <meshStandardMaterial color="#C4B590" roughness={0.7} metalness={0.1} />
      </mesh>
      {/* Screen bezel */}
      <mesh position={[0, 0.05, 0.76]}>
        <boxGeometry args={[2.6, 1.6, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
      </mesh>
      {/* Screen */}
      <mesh ref={meshRef} position={[0, 0.05, 0.8]}>
        <boxGeometry args={[2.3, 1.3, 0.02]} />
        <meshStandardMaterial
          color="#001a00"
          emissive="#00ff41"
          emissiveIntensity={0.3}
          roughness={0.1}
        />
      </mesh>
      {/* Code text */}
      {codeLines.map((line, i) => (
        <Text
          key={i}
          position={[-0.9, 0.4 - i * 0.18, 0.85]}
          fontSize={0.08}
          color="#00ff41"
          anchorX="left"
          anchorY="middle"
        >
          {line}
        </Text>
      ))}
      {/* Cursor */}
      {cursorVisible && codeLines.length > 0 && (
        <mesh position={[-0.9 + codeLines[codeLines.length - 1].length * 0.048, 0.4 - (codeLines.length - 1) * 0.18, 0.85]}>
          <boxGeometry args={[0.06, 0.1, 0.01]} />
          <meshStandardMaterial color="#00ff41" emissive="#00ff41" emissiveIntensity={1} />
        </mesh>
      )}
      {/* Power LED */}
      <mesh position={[-1.1, -0.9, 0.78]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#00ff41" emissive="#00ff41" emissiveIntensity={1} />
      </mesh>
    </group>
  );
};

const HopperCompiler = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <TerminalScreen />
      {/* Keyboard */}
      <mesh position={[0, -0.5, 1.5]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[2.5, 0.15, 1]} />
        <meshStandardMaterial color="#C4B590" roughness={0.8} />
      </mesh>
      {/* Keyboard keys */}
      {[...Array(3)].map((_, row) =>
        [...Array(8)].map((_, col) => (
          <mesh key={`key-${row}-${col}`} position={[-0.95 + col * 0.27, -0.4 + row * 0.01, 1.2 + row * 0.28]} rotation={[-0.3, 0, 0]}>
            <boxGeometry args={[0.2, 0.06, 0.2]} />
            <meshStandardMaterial color="#E8DCC8" roughness={0.5} />
          </mesh>
        ))
      )}
      {/* "COBOL" label */}
      <Text position={[0, -1, 0]} fontSize={0.15} color="#F97316" anchorX="center" font={undefined}>
        COBOL — Primer Compilador — 1952
      </Text>
    </group>
  );
};

const HopperScene = () => {
  return (
    <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={100} color="#ffffff" />
        <pointLight position={[-3, 2, 4]} intensity={50} color="#F97316" />
        <pointLight position={[0, -1, 3]} intensity={20} color="#38BDF8" />
        <HopperCompiler />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  );
};

export default HopperScene;
