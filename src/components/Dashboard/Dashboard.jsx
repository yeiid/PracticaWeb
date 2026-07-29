import React, { useState, useEffect, lazy, Suspense, useCallback, useMemo } from 'react';
import './Dashboard.css';
import ProgressSystem from '../ProgressSystem/ProgressSystem';
import { useAuth, AuthProvider } from '../../contexts/AuthContext';
import { ProgressProvider, useProgress } from '../../contexts/ProgressContext';
import { mockCourses } from '../../lib/mockData';
import CourseCard from './CourseCard';
import Header from '../Header/Header';
import RoadmapStep from './RoadmapStep';
import HistoryTimeline from './HistoryTimeline';

const HTMLCourse = lazy(() => import('../../courses/HTML/HTMLCourse'));
const CSSCourse = lazy(() => import('../../courses/CSS/CSSCourse'));
const JSCourse = lazy(() => import('../../courses/JS/JSCourse'));
const PythonCourse = lazy(() => import('../../courses/Python/PythonCourse'));
const ReactCourse = lazy(() => import('../../courses/React/ReactCourse'));
const BackendCourse = lazy(() => import('../../courses/Backend/BackendCourse'));
const GitCourse = lazy(() => import('../../courses/Git/GitCourse'));

function DashboardMain() {
  const { user, isOffline } = useAuth();
  const { progress, getCourseProgress, getOverallProgress } = useProgress();
  const [currentView, setCurrentView] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCourseSelect = useCallback((course) => {
    setSelectedCourse(course);
    setCurrentView('course');
  }, []);

  const getProgressPercentage = useCallback((courseId) => {
    const cp = getCourseProgress(courseId);
    return cp.percentage;
  }, [getCourseProgress]);

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

  const roadmapSteps = useMemo(() => [
    { id: 1, title: 'HTML5 - Los Fundamentos', description: 'Estructura básica y semántica', completed: true, course: '/html', icon: '📄' },
    { id: 2, title: 'CSS3 - El diseño Visual', description: 'Estilos y layouts modernos', completed: true, course: '/css', icon: '🎨' },
    { id: 3, title: 'JavaScript - La Interactividad', description: 'Programación y DOM', completed: true, course: '/js', icon: '⚡' },
    { id: 4, title: 'Python - Programación Versátil', description: 'Lenguaje multiuso para todo', completed: true, course: '/python', icon: '🐍' },
    { id: 5, title: 'React - Modern UI', description: 'Aplicaciones web avanzadas', completed: true, course: '/react', icon: '⚛️' },
    { id: 6, title: 'Backend - Arquitectura', description: 'Node.js y APIs', completed: false, course: '/backend', icon: '⚙️' }
  ], []);

  const handleBack = useCallback(() => setCurrentView('home'), []);

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
        <ProgressSystem />
        <Suspense fallback={<div className="loading">Cargando curso...</div>}>
          {url === '/html' && <HTMLCourse onBack={handleBack} courseId="html" />}
          {url === '/css' && <CSSCourse onBack={handleBack} courseId="css" />}
          {url === '/js' && <JSCourse onBack={handleBack} courseId="js" />}
          {url === '/python' && <PythonCourse onBack={handleBack} courseId="python" />}
          {url === '/react' && <ReactCourse onBack={handleBack} courseId="react" />}
          {url === '/backend' && <BackendCourse onBack={handleBack} courseId="backend" />}
          {url === '/git' && <GitCourse onBack={handleBack} courseId="git" />}
        
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
        </Suspense>
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
      <ProgressSystem />
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
      <section className="history-preview-section">
        <HistoryTimeline />
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <a href="/history" className="explore-history-btn" aria-label="Explorar la historia completa de la tecnología">Explorar Historia Completa →</a>
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
      <div className="footer-links">
        <a href="/support" className="footer-link" aria-label="Centro de Soporte">📩 Centro de Soporte</a>
        {user?.role === 'admin' && (
          <a href="/admin/tickets" className="footer-link admin-link" aria-label="Panel de Administración">🛡️ Panel Admin</a>
        )}
      </div>
    </footer>
    </div>
  );
}

function DashboardContent() {
  const { user, isOffline } = useAuth();
  if (!user) return null;
  return (
    <ProgressProvider user={user} isOffline={isOffline}>
      <DashboardMain />
    </ProgressProvider>
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

