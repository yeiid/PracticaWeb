import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const BrowserWindow = () => {
  const windowRef = useRef();
  const [urlText, setUrlText] = useState('');
  const fullUrl = 'http://www.ncsa.mosaic/';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullUrl.length) {
        setUrlText(fullUrl.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  useFrame((state) => {
    if (windowRef.current) {
      windowRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <group ref={windowRef} position={[0, 0.3, 0]}>
      {/* Browser frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.6, 2.8, 0.1]} />
        <meshStandardMaterial color="#c0c0c0" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* Title bar */}
      <mesh position={[0, 1.25, 0.06]}>
        <boxGeometry args={[3.4, 0.25, 0.02]} />
        <meshStandardMaterial color="#000080" roughness={0.4} />
      </mesh>
      <Text position={[0, 1.25, 0.08]} fontSize={0.1} color="#ffffff" anchorX="center">
        NCSA Mosaic
      </Text>

      {/* URL bar */}
      <mesh position={[0, 0.95, 0.06]}>
        <boxGeometry args={[3.2, 0.2, 0.02]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>
      <Text position={[0, 0.95, 0.08]} fontSize={0.07} color="#000000" anchorX="center">
        {urlText}
      </Text>

      {/* Content area */}
      <mesh position={[0, -0.1, 0.06]}>
        <boxGeometry args={[3.2, 1.8, 0.02]} />
        <meshStandardMaterial color="#d0d0d0" roughness={0.5} />
      </mesh>

      {/* Image placeholder */}
      <mesh position={[-0.8, 0.1, 0.08]}>
        <boxGeometry args={[1, 0.8, 0.01]} />
        <meshStandardMaterial color="#4a90d9" roughness={0.3} />
      </mesh>

      {/* Text lines */}
      {[...Array(4)].map((_, i) => (
        <mesh key={i} position={[0.6, 0.3 - i * 0.2, 0.08]}>
          <boxGeometry args={[1.2, 0.08, 0.01]} />
          <meshStandardMaterial color="#333" roughness={0.5} />
        </mesh>
      ))}

      {/* Navigation buttons */}
      {['Back', 'Forward', 'Home'].map((label, i) => (
        <group key={label} position={[-1.2 + i * 0.8, 1.0, 0.08]}>
          <mesh>
            <boxGeometry args={[0.6, 0.15, 0.01]} />
            <meshStandardMaterial color="#d4d0c8" roughness={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

const MosaicScene = () => (
  <div style={{ height: '300px', width: '100%', cursor: 'grab' }}>
    <Canvas camera={{ position: [0, 0.5, 4.5], fov: 45 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={80} />
      <pointLight position={[-3, 2, 4]} intensity={40} color="#F97316" />
      <pointLight position={[0, -2, 3]} intensity={25} color="#38BDF8" />
      <BrowserWindow />
      <Text position={[0, -2, 0]} fontSize={0.12} color="#CBD5E1" anchorX="center">
        Navegador Mosaic — 1993
      </Text>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  </div>
);

export default MosaicScene;
