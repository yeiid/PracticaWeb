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

      const { data, error } = await supabase
        .from('progress')
        .select('progress_data')
        .eq('user_id', user.id)
        .single();

      if (data && data.progress_data) {
        setProgress(data.progress_data);
      } else if (error && error.code !== 'PGRST116') {
        console.error('Error fetching progress:', error);
      }
    };

    fetchProgress();
  }, [user]);

  const saveProgress = async (newProgress) => {
    setProgress(newProgress);
    if (!user) return;

    await supabase
      .from('progress')
      .upsert({ user_id: user.id, progress_data: newProgress }, { onConflict: 'user_id' });
  };

  // ... (el resto del código de ProgressSystem.js adaptado)

  return (
    <div className="progress-system">
      {/* ... (el JSX del componente) ... */}
    </div>
  );
};

export default ProgressSystem;
