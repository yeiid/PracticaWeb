import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

const AnalogWave = () => {
  const lineRef = useRef();

  useFrame((state) => {
    if (lineRef.current) {
      const positions = lineRef.current.geometry.attributes.position;
      const time = state.clock.elapsedTime;
      for (let i = 0; i < positions.count; i++) {
        const x = (i / positions.count) * 8 - 4;
        const y = Math.sin(x * 2 + time * 3) * 0.8;
        positions.setY(i, y);
      }
      positions.needsUpdate = true;
    }
  });

  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 200; i++) {
      const x = (i / 200) * 8 - 4;
      pts.push(new THREE.Vector3(x, 0, 0));
    }
    return pts;
  }, []);

  return (
    <group position={[0, 1.2, 0]}>
      <line ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length}
            array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#F97316" linewidth={2} />
      </line>
      <Text position={[0, -1.5, 0]} fontSize={0.2} color="#F97316" anchorX="center">
        Señal Analógica (continua)
      </Text>
    </group>
  );
};

const DigitalWave = () => {
  const lineRef = useRef();

  useFrame((state) => {
    if (lineRef.current) {
      const positions = lineRef.current.geometry.attributes.position;
      const time = state.clock.elapsedTime;
      const step = 1.0;
      for (let i = 0; i < positions.count; i++) {
        const x = (i / positions.count) * 8 - 4;
        const high = Math.floor((x + time * 2) / step) % 2 === 0;
        const y = high ? 0.8 : -0.8;
        positions.setY(i, y);
      }
      positions.needsUpdate = true;
    }
  });

  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 200; i++) {
      pts.push(new THREE.Vector3((i / 200) * 8 - 4, 0, 0));
    }
    return pts;
  }, []);

  return (
    <group position={[0, -1.2, 0]}>
      <line ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length}
            array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#38BDF8" linewidth={2} />
      </line>
      <Text position={[0, -1.5, 0]} fontSize={0.2} color="#38BDF8" anchorX="center">
        Señal Digital (0 y 1)
      </Text>
    </group>
  );
};

const SignalScene = () => (
  <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
    <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={80} />
      <pointLight position={[-3, 2, 4]} intensity={40} color="#F97316" />
      <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />

      <AnalogWave />
      <DigitalWave />

      <Text position={[0, 3, 0]} fontSize={0.18} color="#CBD5E1" anchorX="center">
        Las señales transportan información
      </Text>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
    </Canvas>
  </div>
);

export default SignalScene;
