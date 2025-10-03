import React, { useState, useEffect } from 'react';
import './CertificationSystem.css';

const CertificationSystem = () => {
  const [certificates, setCertificates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('html');
  const [showCertificates, setShowCertificates] = useState(false);

  const courses = [
    { id: 'html', name: 'HTML5', icon: '📄', color: '#e34f26' },
    { id: 'css', name: 'CSS3', icon: '🎨', color: '#1572b6' },
    { id: 'js', name: 'JavaScript', icon: '⚡', color: '#f7df1e' }
  ];

  const achievements = [
    {
      id: 'first-steps',
      title: 'Primeros Pasos',
      description: 'Completaste tu primer slide',
      icon: '🎯',
      requirement: 1,
      unlocked: false
    },
    {
      id: 'html-master',
      title: 'Maestro HTML',
      description: 'Completaste todo el curso de HTML5',
      icon: '🏆',
      requirement: 8,
      course: 'html',
      unlocked: false
    },
    {
      id: 'css-artist',
      title: 'Artista CSS',
      description: 'Completaste todo el curso de CSS3',
      icon: '🎨',
      requirement: 8,
      course: 'css',
      unlocked: false
    },
    {
      id: 'js-wizard',
      title: 'Mago JavaScript',
      description: 'Completaste todo el curso de JavaScript',
      icon: '⚡',
      requirement: 10,
      course: 'js',
      unlocked: false
    },
    {
      id: 'full-stack',
      title: 'Full Stack',
      description: 'Completaste todos los cursos básicos',
      icon: '🚀',
      requirement: 3,
      unlocked: false
    }
  ];

  useEffect(() => {
    // Cargar progreso y verificar logros
    const progress = JSON.parse(localStorage.getItem('academia-web-progress') || '{}');
    const userId = 'current-user';

    if (progress[userId]) {
      checkAchievements(progress[userId]);
    }

    // Cargar certificados
    loadCertificates();
  }, []);

  const checkAchievements = (progress) => {
    const updatedAchievements = achievements.map(achievement => {
      if (achievement.course) {
        const courseProgress = progress[achievement.course];
        if (courseProgress && courseProgress.completed >= achievement.requirement) {
          return { ...achievement, unlocked: true };
        }
      } else if (achievement.id === 'first-steps') {
        const totalCompleted = Object.values(progress).reduce((sum, course) => sum + course.completed, 0);
        if (totalCompleted >= achievement.requirement) {
          return { ...achievement, unlocked: true };
        }
      } else if (achievement.id === 'full-stack') {
        const completedCourses = Object.values(progress).filter(course => course.completed === course.total).length;
        if (completedCourses >= achievement.requirement) {
          return { ...achievement, unlocked: true };
        }
      }
      return achievement;
    });

    // Actualizar estado local
    achievements.forEach((achievement, index) => {
      if (updatedAchievements[index].unlocked && !achievement.unlocked) {
        // Mostrar notificación de logro desbloqueado
        showAchievementNotification(updatedAchievements[index]);
      }
    });
  };

  const showAchievementNotification = (achievement) => {
    // Crear notificación visual
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <span class="achievement-icon">${achievement.icon}</span>
        <div class="achievement-text">
          <h4>¡Logro Desbloqueado!</h4>
          <p>${achievement.title}</p>
          <small>${achievement.description}</small>
        </div>
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 5000);
  };

  const loadCertificates = async () => {
    // En un sistema real, esto haría una llamada API
    // Por ahora, simulamos con localStorage
    const savedCertificates = localStorage.getItem('academia-certificates');
    if (savedCertificates) {
      setCertificates(JSON.parse(savedCertificates));
    }
  };

  const generateCertificate = async () => {
    if (!studentName.trim()) {
      alert('Por favor ingresa tu nombre');
      return;
    }

    const newCertificate = {
      id: Date.now().toString(),
      studentName,
      courseId: selectedCourse,
      completionDate: new Date().toISOString(),
      certificateNumber: `CERT-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    const updatedCertificates = [...certificates, newCertificate];
    setCertificates(updatedCertificates);
    localStorage.setItem('academia-certificates', JSON.stringify(updatedCertificates));

    // En un sistema real, aquí harías una llamada API
    alert('¡Certificado generado exitosamente!');
    setShowForm(false);
    setStudentName('');
  };

  const downloadCertificate = (certificate) => {
    // Crear un PDF simple (en un sistema real usarías una librería como jsPDF)
    const certificateHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Certificado - ${certificate.studentName}</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
          .certificate {
            border: 5px solid #667eea;
            padding: 40px;
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          }
          .title { color: #667eea; font-size: 2.5em; margin-bottom: 30px; }
          .student-name { font-size: 2em; color: #2c3e50; margin: 20px 0; }
          .course { font-size: 1.5em; color: #495057; margin: 15px 0; }
          .date { font-size: 1.2em; color: #6c757d; margin: 20px 0; }
          .cert-number { font-size: 1em; color: #868e96; }
        </style>
      </head>
      <body>
        <div class="certificate">
          <h1 class="title">🏆 Certificado de Finalización</h1>
          <h2 class="student-name">${certificate.studentName}</h2>
          <p class="course">Ha completado exitosamente el curso de ${courses.find(c => c.id === certificate.courseId)?.name}</p>
          <p class="date">Fecha de finalización: ${new Date(certificate.completionDate).toLocaleDateString()}</p>
          <p class="cert-number">Número de certificado: ${certificate.certificateNumber}</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([certificateHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `certificado-${certificate.studentName}-${certificate.courseId}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="certification-system">
      <h2>🏆 Sistema de Certificaciones</h2>

      <div className="certification-content">
        <div className="achievements-section">
          <h3>🎖️ Logros Desbloqueados</h3>
          <div className="achievements-grid">
            {achievements.map(achievement => (
              <div
                key={achievement.id}
                className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
              >
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-content">
                  <h4>{achievement.title}</h4>
                  <p>{achievement.description}</p>
                  {achievement.unlocked && (
                    <span className="unlocked-badge">✅ Desbloqueado</span>
                  )}
                  {!achievement.unlocked && (
                    <span className="locked-badge">🔒 Bloqueado</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="certificates-section">
          <div className="certificates-header">
            <h3>📜 Mis Certificados</h3>
            <button
              onClick={() => setShowForm(!showForm)}
              className="generate-cert-btn"
            >
              {showForm ? 'Cancelar' : '🎓 Generar Certificado'}
            </button>
          </div>

          {showForm && (
            <div className="certificate-form">
              <h4>Generar Nuevo Certificado</h4>
              <div className="form-group">
                <label>Tu Nombre:</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Ingresa tu nombre completo"
                />
              </div>
              <div className="form-group">
                <label>Curso Completado:</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.icon} {course.name}
                    </option>
                  ))}
                </select>
              </div>
              <button onClick={generateCertificate} className="submit-cert-btn">
                Generar Certificado
              </button>
            </div>
          )}

          <div className="certificates-list">
            {certificates.length === 0 ? (
              <p className="no-certificates">Aún no tienes certificados. ¡Completa un curso para obtener el primero!</p>
            ) : (
              certificates.map(certificate => (
                <div key={certificate.id} className="certificate-item">
                  <div className="certificate-info">
                    <h4>{courses.find(c => c.id === certificate.courseId)?.name}</h4>
                    <p>{certificate.studentName}</p>
                    <small>{new Date(certificate.completionDate).toLocaleDateString()}</small>
                  </div>
                  <button
                    onClick={() => downloadCertificate(certificate)}
                    className="download-btn"
                  >
                    📥 Descargar
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationSystem;
