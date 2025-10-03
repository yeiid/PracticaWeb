// Dashboard principal del usuario
import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import ProgressSystem from '../ProgressSystem/ProgressSystem';
import HTMLCourse from '../../courses/HTML/HTMLCourse';
import CSSCourse from '../../courses/CSS/CSSCourse';
import JSCourse from '../../courses/JS/JSCourse';
import PythonCourse from '../../courses/Python/PythonCourse';
import { useAuth } from '../../contexts/AuthContext';
import CourseCard from './CourseCard';
import Header from '../Header/Header';
import RoadmapStep from './RoadmapStep';

function Dashboard() {
  const { user, signOut } = useAuth();
  const [currentView, setCurrentView] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Simulación de carga de progreso desde un backend
  const [progress, setProgress] = useState({});

  useEffect(() => {
    if (user) {
      // Aquí llamarías a tu API para obtener el progreso del usuario
      // Por ahora, simulamos con datos locales
      const localProgress = JSON.parse(localStorage.getItem(`progress-${user.id}`) || '{}');
      setProgress(localProgress);
    }
  }, [user]);

  const courses = [
    {
      id: 'html',
      title: 'HTML5',
      icon: '📄',
      description: 'Aprende los fundamentos del lenguaje de marcado que estructura el contenido web.',
      url: '/HTML/',
      color: '#e34f26',
      slides: 7
    },
    {
      id: 'css',
      title: 'CSS3',
      icon: '🎨',
      description: 'Domina el arte del diseño web con estilos modernos y layouts avanzados.',
      url: '/CSS/',
      color: '#1572b6',
      slides: 8
    },
    {
      id: 'js',
      title: 'JavaScript',
      icon: '⚡',
      description: 'Haz que tus páginas cobren vida con programación interactiva moderna.',
      url: '/JS/',
      color: '#f7df1e',
      slides: 11
    },
    {
      id: 'python',
      title: 'Python',
      icon: '🐍',
      description: 'Aprende el lenguaje de programación más versátil para datos, web y automatización.',
      url: '/Python/',
      color: '#3776ab',
      slides: 10
    }
  ];

  const roadmapSteps = [
    { id: 1, title: 'HTML5 - Los Fundamentos', description: 'Estructura básica y semántica', completed: true, course: 'html', icon: '📄' },
    { id: 2, title: 'CSS3 - El diseño Visual', description: 'Estilos y layouts modernos', completed: true, course: 'css', icon: '🎨' },
    { id: 3, title: 'JavaScript - La Interactividad', description: 'Programación y DOM', completed: true, course: 'js', icon: '⚡' },
    { id: 4, title: 'Python - Programación Versátil', description: 'Lenguaje multiuso para todo', completed: true, course: 'python', icon: '🐍' },
    { id: 5, title: 'React - Próximamente', description: 'Aplicaciones web avanzadas', completed: false, course: 'react', icon: '⚛️' },
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

  if (currentView === 'course' && selectedCourse) {
    return (
      <div className="App">
        <header className="header">
          <button className="back-button" onClick={() => setCurrentView('home')}>
            ← Volver al inicio
          </button>
          <h1>🚀 Academia Web</h1>
          <button onClick={signOut} className="auth-button-logout">Cerrar Sesión</button>
        </header>
        <ProgressSystem progress={progress} />
        {selectedCourse.id === 'html' && <HTMLCourse />}
        {selectedCourse.id === 'css' && <CSSCourse />}
        {selectedCourse.id === 'js' && <JSCourse />}
        {selectedCourse.id === 'python' && <PythonCourse />}
      </div>
    );
  }

  return (
    <div className="App">
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
