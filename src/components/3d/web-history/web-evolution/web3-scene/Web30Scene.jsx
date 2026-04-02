import React, { useRef, useEffect, useMemo } from 'react';
import { Html, Text } from '@react-three/drei';
import { gsap } from 'gsap';

// --- Constantes de Configuración de la Escena Web 3.0 ---
const SCENE_CONFIG = {
  TITLE: "DECENTRALIZED FUTURE",
  TITLE_COLOR: "#4d96ff",
  TRANSITION_DURATION: 1.6,
  TRANSITION_Z_START: -8, // Ajustado de -20 a -8 para que los objetos se vean más rápido
  FLOAT_OFFSET: 0.8,
  ROTATION_DURATION_MIN: 8,
  ROTATION_DURATION_MAX: 12,
  NUM_AMBIENT_PARTICLES: 60,
  AMBIENT_PARTICLE_RANGE: 30,
};

// --- Datos de los Elementos Clave de Web 3.0 ---
const WEB3_ELEMENTS_DATA = [
  { name: 'Blockchain', color: '#ffd93d', position: [-4, 0, 0], icon: '⛓️', wireframeColor: '#ffbb00' },
  { name: 'AI/ML', color: '#6bcf7f', position: [0, 0, 0], icon: '🧠', wireframeColor: '#36b346' },
  { name: 'Metaverse', color: '#4d96ff', position: [4, 0, 0], icon: '🌐', wireframeColor: '#1a5cff' },
];

/**
 * Componente que representa una escena estilizada de Web 3.0 (Descentralización, IA, Metaverso).
 * @param {object} props - Propiedades del componente.
 * @param {boolean} props.active - Controla si la escena debe ser visible y animada.
 */
const Web30Scene = ({ active }) => {
  const groupRef = useRef();
  const cubesRef = useRef([]);
  const tlRef = useRef(null);

  // Genera las posiciones de las partículas de fondo (simulando datos/conexiones)
  const ambientParticlePositions = useMemo(() => {
    const range = SCENE_CONFIG.AMBIENT_PARTICLE_RANGE / 2;
    const positions = new Float32Array(SCENE_CONFIG.NUM_AMBIENT_PARTICLES * 3);
    for (let i = 0; i < SCENE_CONFIG.NUM_AMBIENT_PARTICLES; i++) {
      positions[i * 3] = (Math.random() - 0.5) * range;
      positions[i * 3 + 1] = (Math.random() - 0.5) * range;
      positions[i * 3 + 2] = (Math.random() - 0.5) * range;
    }
    return positions;
  }, []);

  // Define las líneas de conexión entre los elementos
  const connectorPositions = useMemo(() => new Float32Array([
    // Línea 1 (Blockchain a AI)
    -2, 0, 0, -0.5, 0, 0, 
    // Línea 2 (AI a Metaverse)
    0.5, 0, 0, 2, 0, 0, 
    // Líneas diagonales (Interconexión compleja)
    -2, 0, 0, 4, 0, 0, 
    4, 0, 0, -4, 0, 0,
  ]), []);

  // Función para inicializar los loops de animación
  const initElementAnimations = () => {
    const validCubes = cubesRef.current.filter(Boolean);

    validCubes.forEach((cube, index) => {
      // 1. Rotación del Elemento
      gsap.to(cube.rotation, {
        x: Math.PI * 2,
        y: Math.PI * 2,
        duration: gsap.utils.random(SCENE_CONFIG.ROTATION_DURATION_MIN, SCENE_CONFIG.ROTATION_DURATION_MAX),
        ease: "none",
        repeat: -1,
        delay: index * 0.5
      });
      
      // 2. Movimiento Sutil
      gsap.to(cube.position, {
        y: cube.position.y + SCENE_CONFIG.FLOAT_OFFSET,
        duration: gsap.utils.random(3, 5),
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });
  };

  // --- Lógica de Animación Principal con GSAP Timeline ---
  useEffect(() => {
    const group = groupRef.current;
    const validCubes = cubesRef.current.filter(Boolean);
    
    if (!group) return;

    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }
    gsap.killTweensOf(validCubes);

    if (active) {
      tlRef.current = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Animación de ENTRADA (Mover desde el fondo y rotar en X)
      tlRef.current.fromTo(group.position, 
        { z: SCENE_CONFIG.TRANSITION_Z_START }, // Usa el valor corregido
        { z: 0, duration: SCENE_CONFIG.TRANSITION_DURATION }, 
        0
      );
      tlRef.current.fromTo(group.rotation, 
        { x: Math.PI / 4 }, 
        { x: 0, duration: SCENE_CONFIG.TRANSITION_DURATION }, 
        0
      );

      // 2. Animación de Aparición de los Cubos (Escalado)
      // Usamos scaleX/Y/Z para evitar el error "Cannot assign to read only property 'scale'".
      gsap.set(validCubes, { scaleX: 0.01, scaleY: 0.01, scaleZ: 0.01 });
      
      tlRef.current.to(validCubes, {
        scaleX: 1, 
        scaleY: 1, 
        scaleZ: 1,
        duration: 1.0,
        ease: "back.out(1.2)",
        stagger: 0.2,
      }, 0.5);

      // 3. Inicializar los loops de rotación y flotación
      tlRef.current.add(initElementAnimations, ">");

    }
    
    // Función de limpieza
    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
      }
      gsap.killTweensOf(validCubes);
    };
  }, [active]);


  if (!active) return null;

  // --- Renderizado de la Escena ---
  return (
    <group ref={groupRef} name="Web30-Scene-Container">
      
      {/* 1. TÍTULO PRINCIPAL */}
      <Text
        position={[0, 6, 0]}
        fontSize={1.8}
        color={SCENE_CONFIG.TITLE_COLOR}
        anchorX="center"
        anchorY="middle"
        name="Web30-Title"
      >
        {SCENE_CONFIG.TITLE}
      </Text>

      {/* 2. CUBOS PRINCIPALES (Elementos de Web 3.0) */}
      {WEB3_ELEMENTS_DATA.map((element, index) => (
        <group
          key={element.name}
          ref={el => cubesRef.current[index] = el}
          position={element.position}
          name={`Element-${element.name}`}
          scale={[1, 1, 1]}
        >
          {/* Cubo translúcido principal */}
          <mesh>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial
              color={element.color}
              transparent
              opacity={0.4}
              roughness={0.1}
              metalness={0.9}
              depthWrite={false} // Evita problemas de orden de renderizado
            />
          </mesh>

          {/* Wireframe interno (Simulando estructura de datos) */}
          <mesh>
            <boxGeometry args={[2.01, 2.01, 2.01]} />
            <meshBasicMaterial 
              color={element.wireframeColor}
              wireframe={true}
              opacity={0.7}
              transparent
            />
          </mesh>

          {/* Texto flotante (HTML) */}
          <Html position={[0, 2.5, 0]} center>
            <div style={{
              color: 'white',
              fontSize: '22px',
              fontWeight: 'bold',
              textShadow: '0 0 10px rgba(0,0,0,0.9)',
              fontFamily: 'sans-serif'
            }}>
              {element.icon} {element.name}
            </div>
          </Html>

          {/* Partículas alrededor del cubo (Flujo de datos) */}
          {Array.from({ length: 10 }, (_, i) => (
            <mesh key={i} position={[
              Math.cos(i * Math.PI / 5) * 2.5,
              Math.sin(i * Math.PI / 5) * 2.5,
              Math.sin(i * Math.PI / 10) * 1
            ]}>
              <sphereGeometry args={[0.15, 12, 12]} />
              <meshBasicMaterial color={element.color} />
            </mesh>
          ))}
        </group>
      ))}

      {/* 3. LÍNEAS DE CONEXIÓN DE DATOS (Interconexión) */}
      <lineSegments name="Connection-Grid">
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connectorPositions.length / 3}
            array={connectorPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial 
          color="#ffffff" 
          opacity={0.5} 
          transparent 
          linewidth={2} 
        />
      </lineSegments>

      {/* 4. PARTÍCULAS AMBIENTALES (Fondo) */}
      <points name="Ambient-Particles">
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={ambientParticlePositions.length / 3}
            array={ambientParticlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#ffffff"
          size={0.1}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.7}
        />
      </points>

      {/* 5. Iluminación - Ajustada para visibilidad */}
      <ambientLight intensity={1.5} /> {/* Intensidad aumentada */}
      <pointLight position={[0, 10, 10]} intensity={5} color="#ccffcc" /> {/* Intensidad aumentada */}
      <pointLight position={[0, -10, -10]} intensity={2} color="#ffccff" />
      
    </group>
  );
};

export default Web30Scene;