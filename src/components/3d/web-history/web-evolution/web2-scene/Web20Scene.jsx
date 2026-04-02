import React, { useRef, useEffect, useMemo } from 'react';
import { Html } from '@react-three/drei';
import { gsap } from 'gsap';

// --- Constantes de Configuración de la Escena Web 2.0 ---
const SCENE_CONFIG = {
  TRANSITION_DURATION: 1.5,
  FLOAT_Y_OFFSET: 0.5,
  FLOAT_DURATION_MIN: 4,
  FLOAT_DURATION_MAX: 6,
  NUM_AMBIENT_PARTICLES: 40,
  AMBIENT_PARTICLE_COLOR: '#ffffff',
  AMBIENT_PARTICLE_RANGE: 20,
};

// --- Datos de los Iconos Sociales (Representando la Interactividad) ---
const SOCIAL_ICONS_DATA = [
  { name: 'Twitter', color: '#1da1f2', position: [-5, 2, 0], icon: '🐦' },
  { name: 'Facebook', color: '#1877f2', position: [0, 0, 0], icon: '👥' },
  { name: 'YouTube', color: '#ff0000', position: [5, -2, 0], icon: '▶️' },
  { name: 'Blog', color: '#ff8800', position: [-3, -3, 0], icon: '✍️' },
  { name: 'Comments', color: '#00cc66', position: [3, 3, 0], icon: '💬' },
];

const Web20Scene = ({ active }) => {
  const groupRef = useRef();
  // Almacenamos solo los elementos válidos (filtramos 'null's)
  const bubblesRef = useRef([]); 
  const tlRef = useRef(null);

  const ambientParticlePositions = useMemo(() => {
    // ... (Lógica de partículas de fondo sin cambios)
    const range = SCENE_CONFIG.AMBIENT_PARTICLE_RANGE / 2;
    const positions = new Float32Array(SCENE_CONFIG.NUM_AMBIENT_PARTICLES * 3);
    for (let i = 0; i < SCENE_CONFIG.NUM_AMBIENT_PARTICLES; i++) {
      positions[i * 3] = (Math.random() - 0.5) * range;
      positions[i * 3 + 1] = (Math.random() - 0.5) * range;
      positions[i * 3 + 2] = (Math.random() - 0.5) * range;
    }
    return positions;
  }, []);

  const initBubbleAnimations = () => {
    // Filtramos para asegurar que solo tenemos referencias válidas
    const validBubbles = bubblesRef.current.filter(Boolean);

    validBubbles.forEach((bubble, index) => {
        // La animación de flotación y rotación no tiene problemas, ya que modifica la posición y rotación del objeto Three.js directamente.
        
        // 1. Animación de Flotación (Movimiento sutil en Y)
        gsap.to(bubble.position, {
          y: bubble.position.y + SCENE_CONFIG.FLOAT_Y_OFFSET,
          duration: gsap.utils.random(SCENE_CONFIG.FLOAT_DURATION_MIN, SCENE_CONFIG.FLOAT_DURATION_MAX),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.1,
        });

        // 2. Animación de Rotación (Rotación en Y constante)
        gsap.to(bubble.rotation, {
          y: Math.PI * 2,
          duration: gsap.utils.random(5, 10),
          ease: "none",
          repeat: -1
        });
    });
  };

  // --- Lógica de Animación Principal con GSAP Timeline ---
  useEffect(() => {
    const group = groupRef.current;
    // Filtramos para obtener las referencias válidas a los grupos de burbujas
    const validBubbles = bubblesRef.current.filter(Boolean);
    
    if (!group || validBubbles.length === 0) return;

    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }
    gsap.killTweensOf(validBubbles);

    if (active) {
      tlRef.current = gsap.timeline({ defaults: { ease: "power2.out" } });

      // 1. Animación de ENTRADA de la Escena (Desde atrás hacia el frente)
      tlRef.current.fromTo(group.position,
        { z: -15 },
        { z: 0, duration: SCENE_CONFIG.TRANSITION_DURATION },
        0
      );

      // --- CORRECCIÓN CLAVE AQUÍ ---
      // Para evitar el error "Cannot assign to read only property 'scale'":
      // 1. En GSAP.set, configuramos la escala a 0.1 para cada burbuja.
      // 2. En GSAP.to, animamos la escala a 1 para cada burbuja.
      // 
      // NOTA: GSAP es inteligente y si le pasas el objeto THREE.Group (validBubbles), 
      // animará las propiedades x, y, z del sub-objeto .scale.
      
      // 2a. Inicializar la escala a 0.1
      gsap.set(validBubbles, { 
          scaleX: 0.1, 
          scaleY: 0.1, 
          scaleZ: 0.1,
          // Puedes usar 'scale: 0.1' si la versión de GSAP/R3F lo permite, pero
          // apuntar a los ejes (scaleX, scaleY, scaleZ) es más seguro.
      });
      
      // 2b. Animación de Aparición (Escalado a 1)
      tlRef.current.to(validBubbles, {
        scaleX: 1, 
        scaleY: 1, 
        scaleZ: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.15,
      }, 0.5);

      // 3. Inicializar los loops de flotación
      tlRef.current.add(initBubbleAnimations, ">");

    }
    
    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
      }
      gsap.killTweensOf(validBubbles);
    };
  }, [active]);


  if (!active) return null;

  // El JSX no necesita cambios
  return (
    <group ref={groupRef} name="Web20-Scene-Container">
      
      {/* 1. Burbujas de Redes Sociales/Interactividad */}
      {SOCIAL_ICONS_DATA.map((social, index) => (
        <group
          key={social.name}
          ref={el => bubblesRef.current[index] = el}
          position={social.position}
          name={`Bubble-${social.name}`}
          // IMPORTANTE: Establecer la escala inicial en 1. 
          // GSAP la cambiará a 0.1 al inicio de la animación.
          scale={[1, 1, 1]} 
        >
          {/* ... (Contenido de la burbuja) */}
          <mesh>
            <sphereGeometry args={[1.5, 32, 32]} />
            <meshStandardMaterial
              color={social.color}
              transparent
              opacity={0.7}
              emissive={social.color}
              emissiveIntensity={0.2}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>

          <Html position={[0, 0, 1.55]} center>
            <div style={{
              color: 'white',
              fontSize: '48px',
              fontWeight: 'bold',
              lineHeight: '1',
              textShadow: '0 0 15px rgba(0,0,0,1)'
            }}>
              {social.icon}
            </div>
          </Html>

          {Array.from({ length: 8 }, (_, i) => (
            <mesh key={i} position={[
              Math.cos(i * Math.PI / 4) * 2.5,
              Math.sin(i * Math.PI / 4) * 2.5,
              Math.sin(i * Math.PI / 8) * 1.5
            ]}>
              <sphereGeometry args={[0.15, 12, 12]} />
              <meshBasicMaterial color={social.color} />
            </mesh>
          ))}
        </group>
      ))}

      {/* 2. Partículas Flotantes Adicionales (Fondo dinámico) */}
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
          color={SCENE_CONFIG.AMBIENT_PARTICLE_COLOR}
          size={0.15}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.8}
        />
      </points>

      {/* 3. Iluminación */}
      <ambientLight intensity={0.8} />
      <pointLight position={[0, 5, 5]} intensity={1.5} color="#ccccff" />
      
    </group>
  );
};

export default Web20Scene;