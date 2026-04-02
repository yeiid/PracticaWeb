import React, { useRef, useEffect, useState } from 'react';
import { Html, Text } from '@react-three/drei';
import { gsap } from 'gsap';
import * as THREE from 'three';

// --- Constantes de Configuración de la Escena del Nacimiento de la WWW ---
const SCENE_CONFIG = {
  TITLE: "WORLD WIDE WEB",
  SUBTITLE: "1991 - CERN, Switzerland",
  TITLE_COLOR: "#4a90e2",
  SUBTITLE_COLOR: "#ffffff",
  ZOOM_DURATION: 4.0,
  ZOOM_START_DISTANCE: 25,
  MONITOR_SCALE: 1.2,
  SCREEN_WIDTH: 1.6,
  SCREEN_HEIGHT: 1.2,
  HYPERLINK_COLOR: "#0000ff",
  HYPERLINK_HOVER_COLOR: "#ff0000",
  PARTICLE_COUNT: 50,
  CODE_SNIPPETS: [
    "<HTML>",
    "<HEAD>",
    "<TITLE>The World Wide Web project</TITLE>",
    "</HEAD>",
    "<BODY>",
    "<H1>World Wide Web</H1>",
    "<P>The WorldWideWeb (W3) is a wide-area",
    "<A HREF=\"#\">hypermedia</A> information retrieval",
    "initiative aiming to give universal",
    "access to a large universe of documents.</P>",
    "</BODY>",
    "</HTML>"
  ]
};

// Contenido de la primera página web (simplificado)

const WebBirthScene = ({ active }) => {
  const groupRef = useRef();
  const monitorRef = useRef();
  const screenRef = useRef();
  const textRef = useRef();
  const networkRef = useRef();
  const tlRef = useRef(null);

  const [currentCodeLine, setCurrentCodeLine] = useState(0);
  const [showCode, setShowCode] = useState(false);

  // Generar una red wireframe simple
  const networkGeometry = React.useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const numNodes = 12; // Más nodos para una red más densa

    // Crear nodos en un patrón de red global
    for (let i = 0; i < numNodes; i++) {
      const angle = (i / numNodes) * Math.PI * 2;
      const radius = 10; // Radio más grande
      vertices.push(
        Math.cos(angle) * radius, // x
        Math.sin(angle) * radius, // y
        (Math.random() - 0.5) * 6 // z con más variación
      );
    }

    // Crear conexiones entre nodos (más conexiones para una red más densa)
    const indices = [];
    for (let i = 0; i < numNodes; i++) {
      for (let j = i + 1; j < numNodes; j++) {
        const distance = Math.sqrt(
          Math.pow(vertices[i * 3] - vertices[j * 3], 2) +
          Math.pow(vertices[i * 3 + 1] - vertices[j * 3 + 1], 2) +
          Math.pow(vertices[i * 3 + 2] - vertices[j * 3 + 2], 2)
        );
        if (distance < 15 && Math.random() > 0.6) { // Más conexiones
          indices.push(i, j);
        }
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    return geometry;
  }, []);



  // Función para manejar click en el monitor
  const handleMonitorClick = () => {
    // Efecto de brillo temporal
    if (screenRef.current) {
      gsap.to(screenRef.current.material, {
        emissiveIntensity: 0.5,
        duration: 0.2,
        yoyo: true,
        repeat: 1
      });
    }
  };

  // --- Lógica de Animación Principal ---
  useEffect(() => {
    const group = groupRef.current;

    if (!group) return;

    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }

    if (active) {
      tlRef.current = gsap.timeline({ defaults: { ease: "power2.out" } });

      // 1. Configurar posición inicial de la cámara (lejos)
      gsap.set(group.position, { z: SCENE_CONFIG.ZOOM_START_DISTANCE });

      // 2. Animación de zoom dramático hacia el monitor
      tlRef.current.to(group.position, {
        z: 0,
        duration: SCENE_CONFIG.ZOOM_DURATION,
        ease: "power2.inOut"
      }, 0);

      // 3. Aparecer el texto "World Wide Web"
      tlRef.current.fromTo(textRef.current?.position || {}, {
        y: -5,
        opacity: 0
      }, {
        y: 2,
        opacity: 1,
        duration: 2
      }, 1);

      // 4. Iluminar gradualmente la red wireframe
      tlRef.current.fromTo(networkRef.current?.material || {}, {
        opacity: 0
      }, {
        opacity: 0.4,
        duration: 3
      }, 0.5);

      // 5. Iniciar la escritura del código después del zoom
      tlRef.current.add(() => {
        setShowCode(true);
        // Animación de escritura línea por línea
        let lineIndex = 0;
        const writeInterval = setInterval(() => {
          if (lineIndex < SCENE_CONFIG.CODE_SNIPPETS.length) {
            setCurrentCodeLine(lineIndex + 1);
            lineIndex++;
          } else {
            clearInterval(writeInterval);
          }
        }, 300);
      }, SCENE_CONFIG.ZOOM_DURATION + 1);

    } else {
      // Reset cuando no está activa
      gsap.set(group.position, { z: 0 });
      setCurrentCodeLine(0);
      setShowCode(false);
    }

    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
      }
    };
  }, [active]);

  if (!active) return null;

  return (
    <group ref={groupRef} name="WebBirth-Scene-Container">

      {/* Red wireframe de fondo (representando la incipiente red global) */}
      <lineSegments ref={networkRef} geometry={networkGeometry}>
        <lineBasicMaterial
          color="#4a90e2"
          opacity={0.3}
          transparent
          linewidth={1}
        />
      </lineSegments>

      {/* Título principal flotante */}
      <Text
        ref={textRef}
        position={[0, 2, 0]}
        fontSize={1.5}
        color={SCENE_CONFIG.TITLE_COLOR}
        anchorX="center"
        anchorY="middle"
        name="WWW-Title"
      >
        {SCENE_CONFIG.TITLE}
      </Text>

      {/* Subtítulo */}
      <Text
        position={[0, 1.2, 0]}
        fontSize={0.8}
        color={SCENE_CONFIG.SUBTITLE_COLOR}
        anchorX="center"
        anchorY="middle"
        name="WWW-Subtitle"
      >
        {SCENE_CONFIG.SUBTITLE}
      </Text>

      {/* Monitor NeXTcube */}
      <group ref={monitorRef} position={[0, 0, 0]} scale={[SCENE_CONFIG.MONITOR_SCALE, SCENE_CONFIG.MONITOR_SCALE, SCENE_CONFIG.MONITOR_SCALE]}>

        {/* Base del monitor (cilindro simplificado) */}
        <mesh position={[0, -1.5, 0]}>
          <cylinderGeometry args={[0.8, 1.0, 0.5, 16]} />
          <meshStandardMaterial color="#2c2c2c" />
        </mesh>

        {/* Cuerpo del monitor */}
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[2.5, 1.5, 1.0]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>

        {/* Pantalla del monitor */}
        <mesh
          ref={screenRef}
          position={[0, 0, 0.51]}
          onClick={handleMonitorClick}
          style={{ cursor: 'pointer' }}
        >
          <planeGeometry args={[SCENE_CONFIG.SCREEN_WIDTH, SCENE_CONFIG.SCREEN_HEIGHT]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#000000"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Contenido de la pantalla (animación de escritura del código) */}
        <Html
          position={[0, 0, 0.52]}
          transform
          occlude="blending"
          style={{
            width: `${SCENE_CONFIG.SCREEN_WIDTH * 100}px`,
            height: `${SCENE_CONFIG.SCREEN_HEIGHT * 100}px`,
            pointerEvents: 'auto'
          }}
        >
          <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#000000',
            color: '#00ff00',
            fontFamily: 'monospace',
            fontSize: '11px',
            padding: '15px',
            overflow: 'hidden',
            border: '2px solid #333',
            position: 'relative'
          }}>
            {/* Terminal/Editor simulado */}
            <div style={{
              position: 'absolute',
              top: '5px',
              left: '5px',
              color: '#666',
              fontSize: '9px'
            }}>
              CERN Terminal - WorldWideWeb Project
            </div>

            {/* Código HTML siendo escrito */}
            {showCode && (
              <div style={{
                marginTop: '20px',
                lineHeight: '1.4',
                fontFamily: 'Courier New, monospace'
              }}>
                {SCENE_CONFIG.CODE_SNIPPETS.slice(0, currentCodeLine).map((line, index) => (
                  <div key={index} style={{
                    marginBottom: '2px',
                    color: line.includes('<') && line.includes('>') ? '#ff6b6b' :
                           line.includes('HREF') ? '#4a90e2' : '#00ff00',
                    animation: `fadeIn 0.3s ease-in ${index * 0.1}s both`
                  }}>
                    {line}
                    {index === currentCodeLine - 1 && (
                      <span style={{
                        color: '#fff',
                        animation: 'blink 1s infinite'
                      }}>_</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Indicador de progreso */}
            {showCode && currentCodeLine < SCENE_CONFIG.CODE_SNIPPETS.length && (
              <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '15px',
                right: '15px',
                height: '3px',
                backgroundColor: '#333',
                borderRadius: '2px'
              }}>
                <div style={{
                  height: '100%',
                  width: `${(currentCodeLine / SCENE_CONFIG.CODE_SNIPPETS.length) * 100}%`,
                  backgroundColor: '#00ff00',
                  borderRadius: '2px',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            )}
          </div>
        </Html>

        {/* Marco de la pantalla */}
        <mesh position={[0, 0, 0.5]}>
          <planeGeometry args={[SCENE_CONFIG.SCREEN_WIDTH + 0.1, SCENE_CONFIG.SCREEN_HEIGHT + 0.1]} />
          <meshBasicMaterial color="#2c2c2c" side={THREE.BackSide} />
        </mesh>

      </group>


      {/* Iluminación dramática */}
      <ambientLight intensity={0.2} />
      <pointLight
        position={[0, 5, 5]}
        intensity={3}
        color="#4a90e2"
        castShadow
      />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={0.1}
        intensity={2}
        color="#ffffff"
        target-position={[0, 0, 0]}
      />

    </group>
  );
};

export default WebBirthScene;
