import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Html, Text } from '@react-three/drei';
import { gsap } from 'gsap';

// --- Constantes de Configuración de la Escena JavaScript Interactiva ---
const SCENE_CONFIG = {
  TITLE: "JAVASCRIPT",
  SUBTITLE: "1995 - Netscape",
  TITLE_COLOR: "#f7df1e",
  SUBTITLE_COLOR: "#ffffff",
  TRANSITION_DURATION: 2.0,
  CONSOLE_LINES: [
    "> document.getElementById('button').style.color = 'red';",
    "< Element updated successfully!",
    "> setInterval(() => console.log('Dynamic Web!'), 1000);",
    "< Timer started - check console every second",
    "> alert('JavaScript is alive! 🎉');",
    "< [Alert displayed to user]",
    "> document.onclick = (e) => e.target.style.transform = 'scale(1.2)';",
    "< Click handler attached to document"
  ],
  NUM_CODE_PARTICLES: 15,
  NUM_INTERACTION_PARTICLES: 25,
  INTERACTION_RANGE: 15,
};

const JavaScriptScene = ({ active }) => {
  const groupRef = useRef();
  const elementsRef = useRef([]);
  const codeParticlesRef = useRef([]);
  const consoleRef = useRef();
  const tlRef = useRef(null);

  // Estados para manejar interacciones
  const [clickedElements, setClickedElements] = useState(new Set());
  const [consoleMessages, setConsoleMessages] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

  // Elementos que representan la transformación de estático a dinámico
  const staticElements = useMemo(() => [
    {
      id: 'button',
      position: [-4, 2, 0],
      type: 'button',
      text: 'Click Me!',
      code: "document.getElementById('button').style.color = 'red';",
      effect: 'color-change'
    },
    {
      id: 'form',
      position: [0, 0, 0],
      type: 'form',
      text: 'Type Here',
      code: "input.value = 'JavaScript Magic! ✨';",
      effect: 'text-fill'
    },
    {
      id: 'image',
      position: [4, -2, 0],
      type: 'image',
      text: '📷',
      code: "img.style.transform = 'rotate(360deg)';",
      effect: 'rotation'
    },
  ], []);

  // Posiciones para partículas de código flotante

  // Posiciones para partículas de interacción
  const interactionParticlePositions = useMemo(() => {
    const positions = new Float32Array(SCENE_CONFIG.NUM_INTERACTION_PARTICLES * 3);
    for (let i = 0; i < SCENE_CONFIG.NUM_INTERACTION_PARTICLES; i++) {
      positions[i * 3] = (Math.random() - 0.5) * SCENE_CONFIG.INTERACTION_RANGE;
      positions[i * 3 + 1] = (Math.random() - 0.5) * SCENE_CONFIG.INTERACTION_RANGE;
      positions[i * 3 + 2] = (Math.random() - 0.5) * SCENE_CONFIG.INTERACTION_RANGE;
    }
    return positions;
  }, []);

  // Función para manejar clics en elementos
  const handleElementClick = (elementId, element) => {
    if (clickedElements.has(elementId)) return;

    const newClicked = new Set(clickedElements);
    newClicked.add(elementId);
    setClickedElements(newClicked);

    // Agregar mensaje a la consola
    const newMessage = `> ${element.code}`;
    setConsoleMessages(prev => [...prev, newMessage]);

    // Mostrar resultado después de un delay
    setTimeout(() => {
      const resultMessage = `< Code executed: ${element.effect}`;
      setConsoleMessages(prev => [...prev, resultMessage]);
    }, 500);

    // Animación de feedback
    const elementRef = elementsRef.current.find((_, index) =>
      staticElements[index]?.id === elementId
    );

    if (elementRef) {
      // Efecto de pulsación
      gsap.to(elementRef.scale, {
        x: 1.3,
        y: 1.3,
        z: 1.3,
        duration: 0.2,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      });

      // Efecto específico según el elemento
      switch (element.effect) {
        case 'color-change':
          gsap.to(elementRef.children[0].material, {
            emissive: "#ff4444",
            duration: 0.5
          });
          break;
        case 'text-fill':
          gsap.to(elementRef.children[0].material, {
            emissive: "#44ff44",
            duration: 0.5
          });
          break;
        case 'rotation':
          gsap.to(elementRef.rotation, {
            z: Math.PI * 2,
            duration: 1,
            ease: "power2.out"
          });
          break;
        default:
          break;
      }
    }

    // Crear partículas de celebración
    createClickParticles(element.position);

    // Mostrar alert especial para el primer clic
    if (newClicked.size === 1) {
      setTimeout(() => {
        setAlertText("🎉 JavaScript Activated! The web is now interactive!");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      }, 1000);
    }
  };

  // Función para crear partículas al hacer clic
  const createClickParticles = (position) => {
    // Efecto visual simplificado - no necesitamos crear partículas reales
    // Solo usamos GSAP para efectos visuales
  };

  // Función para inicializar animaciones de elementos
  const initElementAnimations = () => {
    const validElements = elementsRef.current.filter(Boolean);

    validElements.forEach((element, index) => {
      // Animación de "despertar" - elementos que cobran vida
      gsap.to(element.scale, {
        x: 1.1,
        y: 1.1,
        z: 1.1,
        duration: 0.5,
        ease: "back.out(1.5)",
        yoyo: true,
        repeat: -1,
        delay: index * 0.3
      });

      // Rotación sutil para mostrar dinamismo
      gsap.to(element.rotation, {
        y: Math.PI * 2,
        duration: gsap.utils.random(8, 12),
        ease: "none",
        repeat: -1,
        delay: index * 0.5
      });
    });

    // Animación de partículas de código
    const validCodeParticles = codeParticlesRef.current.filter(Boolean);
    gsap.to(validCodeParticles, {
      y: "+=2",
      duration: gsap.utils.random(3, 6),
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.1
    });
  };

  // Efecto para simular escritura en consola
  useEffect(() => {
    if (!active) return;

    let messageIndex = 0;
    const interval = setInterval(() => {
      if (messageIndex < SCENE_CONFIG.CONSOLE_LINES.length) {
        setConsoleMessages(prev => [...prev, SCENE_CONFIG.CONSOLE_LINES[messageIndex]]);
        messageIndex++;
      } else {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [active]);

  // --- Lógica de Animación Principal ---
  useEffect(() => {
    const group = groupRef.current;
    const validElements = elementsRef.current.filter(Boolean);

    if (!group) return;

    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }
    gsap.killTweensOf(validElements);

    if (active) {
      tlRef.current = gsap.timeline({ defaults: { ease: "power2.out" } });

      // 1. Animación de entrada desde el lado derecho (simbolizando evolución)
      tlRef.current.fromTo(group.position,
        { x: 20 },
        { x: 0, duration: SCENE_CONFIG.TRANSITION_DURATION },
        0
      );

      // 2. Elementos aparecen uno por uno con efecto de "activación"
      gsap.set(validElements, { scale: 0.1, opacity: 0 });

      tlRef.current.to(validElements, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.3,
      }, 0.5);

      // 3. Inicializar animaciones continuas
      tlRef.current.add(initElementAnimations, ">");

      // 4. Partículas de interacción aparecen gradualmente
      tlRef.current.fromTo(".interaction-particles",
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        1.5
      );
    }

    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
      }
      gsap.killTweensOf(validElements);
    };
  }, [active]);

  if (!active) return null;

  return (
    <group ref={groupRef} name="JavaScript-Scene-Container">

      {/* Título Principal */}
      <Text
        position={[0, 4, 0]}
        fontSize={2.2}
        color={SCENE_CONFIG.TITLE_COLOR}
        anchorX="center"
        anchorY="middle"
        name="JS-Title"
      >
        {SCENE_CONFIG.TITLE}
      </Text>

      {/* Subtítulo */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={1.0}
        color={SCENE_CONFIG.SUBTITLE_COLOR}
        anchorX="center"
        anchorY="middle"
        name="JS-Subtitle"
      >
        {SCENE_CONFIG.SUBTITLE}
      </Text>

      {/* Consola JavaScript Interactiva */}
      <Html position={[-6, -1, 0]} style={{ width: '300px', height: '200px' }}>
        <div
          ref={consoleRef}
          style={{
            background: 'rgba(0, 0, 0, 0.9)',
            border: '2px solid #f7df1e',
            borderRadius: '8px',
            padding: '10px',
            fontFamily: 'monospace',
            fontSize: '12px',
            color: '#00ff00',
            height: '180px',
            overflowY: 'auto',
            boxShadow: '0 0 20px rgba(247, 223, 30, 0.3)'
          }}
        >
          <div style={{ color: '#f7df1e', marginBottom: '8px' }}>JavaScript Console</div>
          {consoleMessages.slice(-8).map((msg, index) => (
            <div key={index} style={{
              marginBottom: '2px',
              color: msg.startsWith('>') ? '#f7df1e' : '#00ff00'
            }}>
              {msg}
            </div>
          ))}
          <span style={{
            color: '#f7df1e',
            animation: 'blink 1s infinite'
          }}>_</span>
        </div>
      </Html>

      {/* Elementos Interactivos (Botones, Formularios, etc.) */}
      {staticElements.map((element, index) => {
        const isClicked = clickedElements.has(element.id);
        return (
          <group
            key={element.id}
            ref={el => elementsRef.current[index] = el}
            position={element.position}
            name={`Interactive-${element.id}`}
            onClick={() => handleElementClick(element.id, element)}
            style={{ cursor: 'pointer' }}
          >
            {/* Base del elemento */}
            <mesh>
              <boxGeometry args={[2, 1, 0.2]} />
              <meshStandardMaterial
                color={isClicked ? "#ff6b35" : "#4a90e2"}
                emissive={isClicked ? "#ff6b35" : "#4a90e2"}
                emissiveIntensity={isClicked ? 0.3 : 0.1}
              />
            </mesh>

            {/* Texto del elemento */}
            <Html position={[0, 0, 0.15]} center>
              <div
                style={{
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                  padding: '8px 16px',
                  background: isClicked
                    ? 'rgba(255, 107, 53, 0.9)'
                    : 'rgba(74, 144, 226, 0.8)',
                  borderRadius: '4px',
                  border: '2px solid #f7df1e',
                  transition: 'all 0.3s ease',
                  transform: isClicked ? 'scale(1.05)' : 'scale(1)',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
                onClick={() => handleElementClick(element.id, element)}
              >
                {isClicked ? `✓ ${element.text}` : element.text}
              </div>
            </Html>

            {/* Efecto de "energía" alrededor del elemento */}
            {Array.from({ length: 6 }, (_, i) => (
              <mesh key={i} position={[
                Math.cos(i * Math.PI / 3) * 2.5,
                Math.sin(i * Math.PI / 3) * 2.5,
                0
              ]}>
                <sphereGeometry args={[isClicked ? 0.12 : 0.08, 8, 8]} />
                <meshBasicMaterial
                  color={isClicked ? "#ff6b35" : "#f7df1e"}
                  transparent
                  opacity={isClicked ? 0.9 : 0.7}
                />
              </mesh>
            ))}

            {/* Indicador de clickability */}
            {!isClicked && (
              <Html position={[0, -0.8, 0.15]} center>
                <div style={{
                  color: '#f7df1e',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                  animation: 'pulse 2s ease-in-out infinite'
                }}>
                  Click to activate!
                </div>
              </Html>
            )}
          </group>
        );
      })}

      {/* Partículas de Código JavaScript Flotante */}
      {SCENE_CONFIG.CODE_SNIPPETS.map((code, index) => (
        <Html
          key={`code-${index}`}
          position={[
            (index % 2 === 0 ? -8 : 8),
            3 - index * 0.8,
            Math.sin(index) * 2
          ]}
          center
        >
          <div style={{
            color: '#f7df1e',
            fontSize: '12px',
            fontFamily: 'monospace',
            background: 'rgba(0, 0, 0, 0.8)',
            padding: '4px 8px',
            borderRadius: '3px',
            border: '1px solid #f7df1e',
            whiteSpace: 'nowrap',
            textShadow: '0 0 5px rgba(247, 223, 30, 0.5)',
            animation: `float 3s ease-in-out infinite ${index * 0.5}s`
          }}>
            {code}
          </div>
        </Html>
      ))}

      {/* Partículas de Interacción (representan clicks, eventos, etc.) */}
      <points className="interaction-particles" name="Interaction-Particles">
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={interactionParticlePositions.length / 3}
            array={interactionParticlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#f7df1e"
          size={0.15}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.6}
        />
      </points>

      {/* Logo de JavaScript Grande en el Centro */}
      <Html position={[0, -3, 0]} center>
        <div style={{
          fontSize: '120px',
          color: '#f7df1e',
          textShadow: '0 0 20px rgba(247, 223, 30, 0.8)',
          filter: 'drop-shadow(0 0 10px rgba(247, 223, 30, 0.5))',
          animation: 'glow 2s ease-in-out infinite alternate',
          cursor: 'pointer',
          userSelect: 'none'
        }}
        onClick={() => {
          setAlertText("🚀 JavaScript: The language that changed the web forever!");
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 4000);
        }}
        >
          JS
        </div>
      </Html>

      {/* Alert Modal */}
      {showAlert && (
        <Html center style={{ pointerEvents: 'none' }}>
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(0, 0, 0, 0.9)',
            border: '3px solid #f7df1e',
            borderRadius: '10px',
            padding: '20px',
            color: '#f7df1e',
            fontSize: '18px',
            fontWeight: 'bold',
            textAlign: 'center',
            boxShadow: '0 0 30px rgba(247, 223, 30, 0.5)',
            animation: 'slideIn 0.5s ease-out',
            zIndex: 1000,
            maxWidth: '400px'
          }}>
            {alertText}
          </div>
        </Html>
      )}

      {/* Iluminación */}
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 5, 5]} intensity={2} color="#f7df1e" />
      <pointLight position={[-5, 0, -5]} intensity={1.5} color="#4a90e2" />

    </group>
  );
};

export default JavaScriptScene;
