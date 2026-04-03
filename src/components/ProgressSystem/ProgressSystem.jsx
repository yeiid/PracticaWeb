import React, { useState, useEffect } from 'react';
import './ProgressSystem.css';
import { useAuth } from '../../contexts/AuthContext';

const ProgressSystem = ({ progress: propProgress }) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState(propProgress || {});

  useEffect(() => {
    if (propProgress) {
      setProgress(propProgress);
    }
  }, [propProgress]);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user) return;

      try {
        const response = await fetch('/api/progress');
        if (response.ok) {
          const data = await response.json();
          setProgress(data || {});
        } else {
          console.warn('API progress no disponible, usando localStorage');
          const localProgress = localStorage.getItem(`progress-${user.id}`);
          if (localProgress) {
            setProgress(JSON.parse(localProgress));
          }
        }
      } catch (err) {
        console.warn('Error al cargar progreso, usando localStorage:', err.message);
        const localProgress = localStorage.getItem(`progress-${user.id}`);
        if (localProgress) {
          setProgress(JSON.parse(localProgress));
        }
      }
    };

    fetchProgress();
  }, [user]);

  // Resto del código...

  return (
    <div className="progress-system">
      {/* ... (el JSX del componente) ... */}
    </div>
  );
};

export default ProgressSystem;
