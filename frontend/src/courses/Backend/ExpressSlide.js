import React, { useState } from 'react';
import styles from './BackendSlides.module.css';

export const ExpressSlide = () => {
  const [showExample, setShowExample] = useState(false);

  return (
    <div className={styles.slide}>
      <h1 className={styles.title}>Express.js Framework</h1>
      
      <div className={styles.content}>
        <p>Express es un framework minimalista y flexible para Node.js que proporciona un conjunto robusto de características para aplicaciones web y móviles.</p>
        
        <div className={styles.note}>
          <div className={styles.noteTitle}>Características principales</div>
          <ul>
            <li>Sistema de enrutamiento robusto</li>
            <li>Middleware para manejar peticiones y respuestas</li>
            <li>Soporte para motores de plantillas</li>
            <li>Integración con múltiples bases de datos</li>
          </ul>
        </div>

        <div className={styles.exampleContainer}>
          <div className={styles.exampleTitle}>Configuración básica de Express</div>
          <button 
            onClick={() => setShowExample(!showExample)}
            className={styles.navButton}
            style={{ marginBottom: '1rem' }}
          >
            {showExample ? 'Ocultar código' : 'Mostrar ejemplo'}
          </button>
          
          {showExample && (
            <div className={styles.codeBlock}>
{`// app.js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('¡Bienvenido a mi API con Express!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(\`Servidor Express escuchando en http://localhost:\${PORT}\`);
});`}
            </div>
          )}
        </div>

        <h3 className={styles.subtitle}>Manejo de Rutas</h3>
        
        <div className={styles.codeBlock}>
{`// Rutas básicas
app.get('/usuarios', (req, res) => {
  // Obtener lista de usuarios
  res.json([{ id: 1, nombre: 'Usuario 1' }]);
});

app.post('/usuarios', (req, res) => {
  // Crear un nuevo usuario
  const nuevoUsuario = req.body;
  // Lógica para guardar el usuario...
  res.status(201).json({ mensaje: 'Usuario creado', usuario: nuevoUsuario });
});

// Parámetros de ruta
app.get('/usuarios/:id', (req, res) => {
  const userId = req.params.id;
  // Buscar usuario por ID...
  res.json({ id: userId, nombre: 'Usuario ' + userId });
});`}
        </div>

        <h3 className={styles.subtitle}>Middleware en Express</h3>
        
        <div className={styles.codeBlock}>
{`// Middleware de nivel de aplicación
app.use((req, res, next) => {
  console.log('Tiempo:', new Date().toISOString());
  next(); // Pasar al siguiente middleware
});

// Middleware para rutas específicas
const verificarAutenticacion = (req, res, next) => {
  if (req.headers.authorization) {
    // Lógica de verificación de token...
    next();
  } else {
    res.status(401).json({ error: 'No autorizado' });
  }
};

// Usar el middleware en una ruta
app.get('/ruta-protegida', verificarAutenticacion, (req, res) => {
  res.json({ mensaje: 'Ruta protegida accedida con éxito' });
});`}
        </div>

        <div className={styles.note}>
          <div className={styles.noteTitle}>Buenas prácticas con Express</div>
          <ul>
            <li>Usar <code>express.Router()</code> para organizar rutas en archivos separados</li>
            <li>Implementar manejo de errores con middleware</li>
            <li>Validar los datos de entrada</li>
            <li>Usar variables de entorno para configuración sensible</li>
            <li>Implementar rate limiting para prevenir abusos</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
