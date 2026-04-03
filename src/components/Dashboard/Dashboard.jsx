import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import ProgressSystem from '../ProgressSystem/ProgressSystem';
import HTMLCourse from '../../courses/HTML/HTMLCourse';
import CSSCourse from '../../courses/CSS/CSSCourse';
import JSCourse from '../../courses/JS/JSCourse';
import PythonCourse from '../../courses/Python/PythonCourse';
import ReactCourse from '../../courses/React/ReactCourse';
import BackendCourse from '../../courses/Backend/BackendCourse';
import GitCourse from '../../courses/Git/GitCourse';
import { useAuth } from '../../contexts/AuthContext';
import { mockCourses } from '../../lib/mockData';
import CourseCard from './CourseCard';
import Header from '../Header/Header';
import RoadmapStep from './RoadmapStep';

import { AuthProvider } from '../../contexts/AuthContext';

function DashboardContent() {
  const { user, isOffline } = useAuth();
  const [currentView, setCurrentView] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    if (user) {
      const localProgress = JSON.parse(localStorage.getItem(`progress-${user.id}`) || '{}');
      setProgress(localProgress);
    }
  }, [user]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (isOffline) {
          setCourses(mockCourses);
          setLoading(false);
          return;
        }

        const response = await fetch('/api/courses');
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        } else {
          setCourses(mockCourses);
        }
      } catch (error) {
        setCourses(mockCourses);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [isOffline, user]);

  const roadmapSteps = [
    { id: 1, title: 'HTML5 - Los Fundamentos', description: 'Estructura básica y semántica', completed: true, course: '/html', icon: '📄' },
    { id: 2, title: 'CSS3 - El diseño Visual', description: 'Estilos y layouts modernos', completed: true, course: '/css', icon: '🎨' },
    { id: 3, title: 'JavaScript - La Interactividad', description: 'Programación y DOM', completed: true, course: '/js', icon: '⚡' },
    { id: 4, title: 'Python - Programación Versátil', description: 'Lenguaje multiuso para todo', completed: true, course: '/python', icon: '🐍' },
    { id: 5, title: 'React - Modern UI', description: 'Aplicaciones web avanzadas', completed: true, course: '/react', icon: '⚛️' },
    { id: 6, title: 'Backend - Arquitectura', description: 'Node.js y APIs', completed: false, course: '/backend', icon: '⚙️' }
  ];

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setCurrentView('course');
  };

  const getProgressPercentage = (courseId) => {
    const courseData = progress[courseId];
    if (!courseData) return 0;
    return Math.round((courseData.completed / courseData.total) * 100);
  };

  if (loading) {
    return (
      <div className="App">
        <div className="loading">Cargando cursos...</div>
      </div>
    );
  }

  if (currentView === 'course' && selectedCourse) {
    const url = selectedCourse.url;
    return (
      <div className="App">
        <ProgressSystem progress={progress} />
        {url === '/html' && <HTMLCourse onBack={() => setCurrentView('home')} />}
        {url === '/css' && <CSSCourse onBack={() => setCurrentView('home')} />}
        {url === '/js' && <JSCourse onBack={() => setCurrentView('home')} />}
        {url === '/python' && <PythonCourse onBack={() => setCurrentView('home')} />}
        {url === '/react' && <ReactCourse onBack={() => setCurrentView('home')} />}
        {url === '/backend' && <BackendCourse onBack={() => setCurrentView('home')} />}
        {url === '/git' && <GitCourse onBack={() => setCurrentView('home')} />}
        
        {/* Safety Check: If NO component matched the URL */}
        {!['/html', '/css', '/js', '/python', '/react', '/backend', '/git'].includes(url) && (
          <div className="course-error-modern">
            <button onClick={() => setCurrentView('home')} className="back-button">← Regresar</button>
            <div className="error-content">
              <h2>🚀 Próximamente...</h2>
              <p>Estamos puliendo los detalles finales de este curso. ¡Vuelve pronto!</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="App">
      {isOffline && (
        <div className="offline-banner">
          🚀 Estás en <strong>Modo Demo</strong>. Algunos cambios no se guardarán permanentemente.
        </div>
      )}
      <ProgressSystem progress={progress} />
      <Header />
      <main className="main-content">
        <section className="courses-section">
          <h2>📚 Cursos Disponibles</h2>
          <div className="courses-grid-modern">
            {courses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                onSelect={handleCourseSelect}
                progress={getProgressPercentage(course.id)}
              />
            ))}
          </div>
        </section>
        <section className="roadmap-section">
          <h2>🗺️ Ruta de Aprendizaje</h2>
          <div className="roadmap-modern">
            {roadmapSteps.map(step => (
              <RoadmapStep
                key={step.id}
                step={step}
                onSelect={() => {
                  const course = courses.find(c => c.url === step.course);
                  if (course) handleCourseSelect(course);
                  else console.warn(`Course with URL ${step.course} not found`);
                }}
                progress={getProgressPercentage(step.course)}
              />
            ))}
          </div>
        </section>
      </main>
      <footer className="footer">
        <p>🎓 ¡Aprende a tu ritmo, construye proyectos increíbles!</p>
        <p>💡 Recuerda: La práctica hace al maestro</p>
      </footer>
    </div>
  );
}

function Dashboard() {
  return (
    <AuthProvider>
      <DashboardContent />
    </AuthProvider>
  );
}

export default Dashboard;

