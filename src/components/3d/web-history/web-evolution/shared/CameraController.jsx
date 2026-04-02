import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const CameraController = ({ currentScene }) => {
  const cameraRef = useRef();

  useEffect(() => {
    if (cameraRef.current) {
      const positions = {
        web1: { x: 0, y: 0, z: 8 },
        web2: { x: 0, y: 0, z: 12 },
        web3: { x: 0, y: 0, z: 10 }
      };

      const target = positions[currentScene];
      if (target) {
        gsap.to(cameraRef.current.position, {
          ...target,
          duration: 2,
          ease: "power2.inOut"
        });
      }
    }
  }, [currentScene]);

  return <perspectiveCamera ref={cameraRef} position={[0, 0, 8]} />;
};

export default CameraController;
