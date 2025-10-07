import React, { useRef, useEffect, useMemo } from 'react';
import { Text } from '@react-three/drei';
import { gsap } from 'gsap';

/**
 * Componente que representa una escena estilizada de Web 1.0 (Estática, HTML/CSS).
 * Utiliza React-Three-Fiber, Drei, y GSAP para animación.
 * @param {object} props - Propiedades del componente.
 * @param {boolean} props.active - Controla si la escena debe ser visible y animada.
 */
const Web10Scene = ({ active }) => {
  // Referencias para el grupo de la escena y el texto
  const groupRef = useRef();
  const textRef = useRef();
  // Ref para la Timeline de GSAP para control de animaciones
  const tlRef = useRef(null);

  // --- Constantes de Configuración de la Escena Web 1.0 ---
  const SCENE_CONFIG = {
    TITLE: "HTML & CSS",
    TITLE_FONT_SIZE: 1.5,
    TITLE_COLOR: "#00ff88",
    TRANSITION_DURATION: 1.8, // Duración de la entrada
    FLOAT_DURATION: 2.5,      // Duración de la animación de flotación
    FLOAT_Y_OFFSET: 0.2,      // Desplazamiento vertical de la flotación
    FLOAT_STAGGER: 0.2,       // Retraso entre la flotación de los objetos
  };

  // --- Datos de los Objetos Representativos ---
  // Representan elementos estáticos, simples y la base de la Web 1.0
  const sceneObjects = useMemo(() => [
    // Caja (Estructura de documento)
    {
      id: 'box',
      position: [-4, 0, 0],
      geometry: <boxGeometry args={[1.2, 1.2, 1.2]} />,
      material: <meshStandardMaterial color="#ff6b6b" />,
    },
    // Esfera (Enlaces, hipervínculos)
    {
      id: 'sphere',
      position: [4, 0, 0],
      geometry: <sphereGeometry args={[1, 16, 16]} />,
      material: <meshStandardMaterial color="#4ecdc4" />,
    },
    // Cilindro (Servidor/Host único)
    {
      id: 'cylinder',
      position: [0, -3, 0],
      geometry: <cylinderGeometry args={[0.6, 0.6, 2, 16]} />,
      material: <meshStandardMaterial color="#45b7d1" />,
    },
  ], []);

  // --- Geometría de las Conexiones ---
  const linePositions = useMemo(() => new Float32Array([
    // Línea horizontal superior (Conexión caja-esfera conceptual)
    -3, 1, 0, 3, 1, 0,
    // Línea vertical central (Conexión al servidor)
    0, 2, 0, 0, -2, 0,
    // Línea horizontal inferior (Base/Estructura)
    -2, -1, 0, 2, -1, 0
  ]), []);


  // --- Lógica de Animación con GSAP Timeline ---
  useEffect(() => {
    // Capturar el valor actual del ref para evitar warnings
    const currentGroup = groupRef.current;

    // Si la escena no está activa o las referencias no están listas, no hacer nada.
    if (!currentGroup) return;

    // Asegurarse de que cualquier Timeline anterior sea matada para evitar conflictos
    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }

    if (active) {
      // Inicializar GSAP Timeline
      tlRef.current = gsap.timeline({ defaults: { ease: "power2.out" } });

      // 1. Animación de ENTRADA (Posición y Rotación)
      tlRef.current.fromTo(currentGroup.position,
        { z: 15 },
        { z: 0, duration: SCENE_CONFIG.TRANSITION_DURATION },
        0 // Inicio en el tiempo 0
      );

      tlRef.current.fromTo(currentGroup.rotation,
        { y: Math.PI },
        { y: 0, duration: SCENE_CONFIG.TRANSITION_DURATION },
        0 // Inicio en el tiempo 0
      );

      // 2. Animación SUTIL de FLOTACIÓN (Loop)
      // Se dirige a todos los hijos que no sean el texto (el primer hijo es el texto).
      const floatTargets = currentGroup.children.filter(
          (child) => child.type === 'Mesh' || child.type === 'Line'
      );

      gsap.to(floatTargets, {
        y: `+=${SCENE_CONFIG.FLOAT_Y_OFFSET}`,
        duration: SCENE_CONFIG.FLOAT_DURATION,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1, // Repetición infinita
        stagger: SCENE_CONFIG.FLOAT_STAGGER,
        // Inicia la flotación justo después de la animación de entrada
      });

    } else {
        // Opción para animar la salida si es necesario, por ahora solo resetea
        // o puedes usar un tween de fade-out/move-out aquí.
    }

    // Función de limpieza de useEffect
    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
      }
      // También mata el tween de flotación global al desmontar/desactivar
      // Apunta a los mismos elementos que se animaron para flotar
      const targets = currentGroup?.children.filter(
          (child) => child.type === 'Mesh' || child.type === 'Line'
      );
      if (targets) {
          gsap.killTweensOf(targets);
      }
    };
  }, [active]);


  // Si la escena no está activa, no se renderiza nada
  if (!active) return null;

  // --- Renderizado de la Escena ---
  return (
    <group ref={groupRef} name="Web10-Scene-Container">

      {/* 1. TÍTULO PRINCIPAL */}
      <Text
        ref={textRef}
        position={[0, 3, 0]}
        fontSize={SCENE_CONFIG.TITLE_FONT_SIZE}
        color={SCENE_CONFIG.TITLE_COLOR}
        anchorX="center"
        anchorY="middle"
        name="Web10-Title"
      >
        {SCENE_CONFIG.TITLE}
      </Text>

      {/* 2. OBJETOS REPRESENTATIVOS (Estáticos) */}
      {sceneObjects.map((obj) => (
        <mesh key={obj.id} position={obj.position} name={`Object-${obj.id}`}>
          {obj.geometry}
          {obj.material}
        </mesh>
      ))}

      {/* 3. LÍNEAS DE CONEXIÓN */}
      <line name="Connection-Lines">
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#ffffff"
          opacity={0.6}
          transparent
          depthWrite={false}
        />
      </line>

      {/* 4. Iluminación - Importante para meshStandardMaterial */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />

    </group>
  );
};

export default Web10Scene;
