import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';

const ProgressContext = createContext(null);

export const useProgress = () => {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress debe usarse dentro de ProgressProvider');
  return ctx;
};

const STORAGE_KEY_PREFIX = 'progress-';

const getStorageKey = (userId) => `${STORAGE_KEY_PREFIX}${userId}`;

const loadFromStorage = (userId) => {
  try {
    const raw = localStorage.getItem(getStorageKey(userId));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const saveToStorage = (userId, data) => {
  try {
    localStorage.setItem(getStorageKey(userId), JSON.stringify(data));
  } catch (e) {
    console.warn('Error saving progress to localStorage:', e);
  }
};

export const ProgressProvider = ({ children, user, isOffline }) => {
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const lastSavedRef = useRef('');

  useEffect(() => {
    if (!user) {
      setProgress({});
      setLoading(false);
      return;
    }
    if (isOffline) {
      setProgress(loadFromStorage(user.id));
      setLoading(false);
      return;
    }
    const fetchProgress = async () => {
      try {
        const res = await fetch('/api/progress');
        if (res.ok) {
          const data = await res.json();
          const merged = { ...loadFromStorage(user.id), ...(data || {}) };
          setProgress(merged);
          saveToStorage(user.id, merged);
        } else {
          setProgress(loadFromStorage(user.id));
        }
      } catch {
        setProgress(loadFromStorage(user.id));
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, [user, isOffline]);

  useEffect(() => {
    if (!user || loading) return;
    const serialized = JSON.stringify(progress);
    if (serialized !== lastSavedRef.current) {
      lastSavedRef.current = serialized;
      saveToStorage(user.id, progress);
    }
  }, [progress, user, loading]);

  const syncToApi = useCallback(async (data) => {
    if (!user || isOffline) return;
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ progress_data: data }),
      });
    } catch {
      // silent fail, localStorage has the data
    }
  }, [user, isOffline]);

  const markSlideCompleted = useCallback((courseId, totalSlides) => {
    setProgress(prev => {
      const course = prev[courseId];
      const currentCompleted = course?.completed || 0;
      if (currentCompleted >= totalSlides) return prev;
      const newCompleted = Math.min(currentCompleted + 1, totalSlides);
      const newData = {
        ...prev,
        [courseId]: {
          completed: newCompleted,
          total: totalSlides,
          completedAt: newCompleted >= totalSlides ? (course?.completedAt || new Date().toISOString()) : null,
        },
      };
      syncToApi(newData);
      return newData;
    });
  }, [syncToApi]);

  const getCourseProgress = useCallback((courseId) => {
    const course = progress[courseId];
    if (!course || !course.total) return { completed: 0, total: 0, percentage: 0, isComplete: false };
    return {
      completed: course.completed,
      total: course.total,
      percentage: Math.round((course.completed / course.total) * 100),
      isComplete: course.completed >= course.total,
      completedAt: course.completedAt || null,
    };
  }, [progress]);

  const getOverallProgress = useCallback(() => {
    const entries = Object.values(progress).filter(p => p.total > 0);
    if (entries.length === 0) return { completed: 0, total: 0, percentage: 0 };
    const completed = entries.reduce((s, p) => s + (p.completed || 0), 0);
    const total = entries.reduce((s, p) => s + (p.total || 0), 0);
    return { completed, total, percentage: Math.round((completed / total) * 100) };
  }, [progress]);

  const resetCourse = useCallback((courseId) => {
    setProgress(prev => {
      const newData = { ...prev };
      delete newData[courseId];
      syncToApi(newData);
      return newData;
    });
  }, [syncToApi]);

  const value = {
    progress,
    loading,
    markSlideCompleted,
    getCourseProgress,
    getOverallProgress,
    resetCourse,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};
