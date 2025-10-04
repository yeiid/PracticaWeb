import React, { useState, useEffect } from 'react';
import './ProgressSystem.css';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../config/supabase';

const ProgressSystem = () => {
  const { user } = useAuth();
  const [, setProgress] = useState({});

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('progress')
          .select('progress_data')
          .eq('user_id', user.id)
          .single();

        if (data && data.progress_data) {
          setProgress(data.progress_data);
        } else if (error && error.code !== 'PGRST116') {
          console.warn('Tabla progress no disponible, usando localStorage:', error.message);
          // Usar localStorage como fallback
          const localProgress = localStorage.getItem(`progress-${user.id}`);
          if (localProgress) {
            setProgress(JSON.parse(localProgress));
          }
        }
      } catch (err) {
        console.warn('Error al cargar progreso, usando localStorage:', err.message);
        // Usar localStorage como fallback
        const localProgress = localStorage.getItem(`progress-${user.id}`);
        if (localProgress) {
          setProgress(JSON.parse(localProgress));
        }
      }
    };

    fetchProgress();
  }, [user]);

  // ... (el resto del código de ProgressSystem.js adaptado)

  return (
    <div className="progress-system">
      {/* ... (el JSX del componente) ... */}
    </div>
  );
};

export default ProgressSystem;
