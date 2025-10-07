import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Web10Scene from '../web1-scene/Web10Scene';
import Web20Scene from '../web2-scene/Web20Scene';
import Web30Scene from '../web3-scene/Web30Scene';
import { CameraController } from '../shared';
import './WebJourney.css';

const WebJourney = () => {
  const [currentScene, setCurrentScene] = useState('web1');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSceneChange = (scene) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentScene(scene);

    setTimeout(() => setIsTransitioning(false), 2000);
  };

  return (
    <div className="web-journey-container">
      <div className="scene-navigation">
        <button
          className={`nav-btn ${currentScene === 'web1' ? 'active' : ''}`}
          onClick={() => handleSceneChange('web1')}
          disabled={isTransitioning}
        >
          🕹 Web 1.0
        </button>
        <button
          className={`nav-btn ${currentScene === 'web2' ? 'active' : ''}`}
          onClick={() => handleSceneChange('web2')}
          disabled={isTransitioning}
        >
          💬 Web 2.0
        </button>
        <button
          className={`nav-btn ${currentScene === 'web3' ? 'active' : ''}`}
          onClick={() => handleSceneChange('web3')}
          disabled={isTransitioning}
        >
          🪙 Web 3.0
        </button>
      </div>

      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          <CameraController currentScene={currentScene} />

          {/* Iluminación */}
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} />

          {/* Escenas */}
          <Web10Scene active={currentScene === 'web1'} />
          <Web20Scene active={currentScene === 'web2'} />
          <Web30Scene active={currentScene === 'web3'} />

          {/* Controles */}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            maxDistance={20}
            minDistance={5}
          />
        </Canvas>
      </div>

      <div className="scene-description">
        {currentScene === 'web1' && (
          <div>
            <h3>🕹 Web 1.0 - Los Orígenes (2000)</h3>
            <p>La web estática con documentos HTML y CSS. Información unidireccional desde el servidor al usuario.</p>
          </div>
        )}
        {currentScene === 'web2' && (
          <div>
            <h3>💬 Web 2.0 - La Interacción (2005)</h3>
            <p>Redes sociales, blogs y plataformas colaborativas. Los usuarios se convierten en creadores de contenido.</p>
          </div>
        )}
        {currentScene === 'web3' && (
          <div>
            <h3>🪙 Web 3.0 - La Autonomía (2020+)</h3>
            <p>Blockchain, IA y realidad virtual. Una web descentralizada, inteligente y inmersiva.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebJourney;
