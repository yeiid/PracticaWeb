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

function Dashboard() {
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
          // Merge with Git course if not present in DB
          const hasGit = data.find(c => c.url === '/git' || c.id === 'git');
          if (!hasGit) {
            data.unshift(mockCourses[0]);
          }
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
  }, [isOffline]);

  const roadmapSteps = [
    { id: 1, title: 'HTML5 - Los Fundamentos', description: 'Estructura básica y semántica', completed: true, course: 'html', icon: '📄' },
    { id: 2, title: 'CSS3 - El diseño Visual', description: 'Estilos y layouts modernos', completed: true, course: 'css', icon: '🎨' },
    { id: 3, title: 'JavaScript - La Interactividad', description: 'Programación y DOM', completed: true, course: 'js', icon: '⚡' },
    { id: 4, title: 'Python - Programación Versátil', description: 'Lenguaje multiuso para todo', completed: true, course: 'python', icon: '🐍' },
    { id: 5, title: 'React - Próximamente', description: 'Aplicaciones web avanzadas', completed: true, course: 'react', icon: '⚛️' },
    { id: 6, title: 'Backend - Próximamente', description: 'Node.js y APIs', completed: false, course: 'backend', icon: '⚙️' }
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
    return (
      <div className="App">
        <header className="header">
          <button className="back-button" onClick={() => setCurrentView('home')}>
            ← Volver al inicio
          </button>
          <h1>🚀 Academia Web</h1>
        </header>
        <ProgressSystem progress={progress} />
        {selectedCourse.id === 'html' && <HTMLCourse onBack={() => setCurrentView('home')} />}
        {selectedCourse.id === 'css' && <CSSCourse onBack={() => setCurrentView('home')} />}
        {selectedCourse.id === 'js' && <JSCourse onBack={() => setCurrentView('home')} />}
        {selectedCourse.id === 'python' && <PythonCourse onBack={() => setCurrentView('home')} />}
        {selectedCourse.id === 'react' && <ReactCourse onBack={() => setCurrentView('home')} />}
        {selectedCourse.id === 'backend' && <BackendCourse onBack={() => setCurrentView('home')} />}
        {(selectedCourse.id === 'git' || selectedCourse.url === '/git') && <GitCourse onBack={() => setCurrentView('home')} />}
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
                onSelect={() => handleCourseSelect(courses.find(c => c.id === step.course))}
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

export default Dashboard;

