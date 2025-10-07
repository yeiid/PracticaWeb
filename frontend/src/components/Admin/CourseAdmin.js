import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const CourseAdmin = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    color: '',
    slides: 0,
    url: '',
    active: true
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses/admin');
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      } else {
        console.error('Error al cargar cursos');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingCourse
        ? `/api/courses/${editingCourse.id}`
        : '/api/courses';

      const method = editingCourse ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchCourses();
        setEditingCourse(null);
        resetForm();
      } else {
        console.error('Error al guardar curso');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      icon: course.icon,
      color: course.color,
      slides: course.slides,
      url: course.url || '',
      active: course.active
    });
  };

  const handleDelete = async (courseId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este curso?')) {
      try {
        const response = await fetch(`/api/courses/${courseId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchCourses();
        } else {
          console.error('Error al eliminar curso');
        }
      } catch (error) {
        console.error('Error de conexión:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: '',
      color: '',
      slides: 0,
      url: '',
      active: true
    });
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="admin-container">
      <h2>Administración de Cursos</h2>

      <form onSubmit={handleSubmit} className="course-form">
        <h3>{editingCourse ? 'Editar Curso' : 'Nuevo Curso'}</h3>

        <div className="form-group">
          <label>Título:</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Icono:</label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({...formData, icon: e.target.value})}
              placeholder="📄"
              required
            />
          </div>

          <div className="form-group">
            <label>Color:</label>
            <input
              type="color"
              value={formData.color}
              onChange={(e) => setFormData({...formData, color: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Slides:</label>
            <input
              type="number"
              value={formData.slides}
              onChange={(e) => setFormData({...formData, slides: parseInt(e.target.value)})}
              min="1"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>URL:</label>
          <input
            type="text"
            value={formData.url}
            onChange={(e) => setFormData({...formData, url: e.target.value})}
            placeholder="/curso/"
          />
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={formData.active}
              onChange={(e) => setFormData({...formData, active: e.target.checked})}
            />
            Activo
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {editingCourse ? 'Actualizar' : 'Crear'} Curso
          </button>
          {editingCourse && (
            <button type="button" onClick={() => {
              setEditingCourse(null);
              resetForm();
            }} className="btn-secondary">
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="courses-list">
        <h3>Cursos Existentes</h3>
        <div className="courses-grid">
          {courses.map(course => (
            <div key={course.id} className="course-item">
              <div className="course-header">
                <span className="course-icon">{course.icon}</span>
                <h4>{course.title}</h4>
                <span className={`status ${course.active ? 'active' : 'inactive'}`}>
                  {course.active ? 'Activo' : 'Inactivo'}
                </span>
              </div>
              <p>{course.description}</p>
              <div className="course-actions">
                <button onClick={() => handleEdit(course)} className="btn-edit">
                  Editar
                </button>
                <button onClick={() => handleDelete(course.id)} className="btn-delete">
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseAdmin;
