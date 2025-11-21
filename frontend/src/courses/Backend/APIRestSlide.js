import React, { useState } from 'react';
import styles from './BackendSlides.module.css';

export const APIRestSlide = () => {
  const [showExample, setShowExample] = useState(false);

  return (
    <div className={styles.slide}>
      <h1 className={styles.title}>APIs RESTful con Express</h1>
      
      <div className={styles.content}>
        <p>Las APIs RESTful son una forma de estructurar servicios web que siguen los principios de REST (Representational State Transfer).</p>
        
        <div className={styles.note}>
          <div className={styles.noteTitle}>Principios REST</div>
          <ul>
            <li><strong>Client-Server</strong>: Separación de responsabilidades</li>
            <li><strong>Stateless</strong>: Cada petición contiene toda la información necesaria</li>
            <li><strong>Cacheable</strong>: Las respuestas pueden ser cacheadas</li>
            <li><strong>Uniform Interface</strong>: Interfaz consistente</li>
            <li><strong>Layered System</strong>: Arquitectura en capas</li>
          </ul>
        </div>

        <h3 className={styles.subtitle}>Métodos HTTP</h3>
        <ul>
          <li><code>GET</code>: Obtener recursos</li>
          <li><code>POST</code>: Crear un nuevo recurso</li>
          <li><code>PUT</code>: Actualizar un recurso existente</li>
          <li><code>PATCH</code>: Actualizar parcialmente un recurso</li>
          <li><code>DELETE</code>: Eliminar un recurso</li>
        </ul>

        <div className={styles.exampleContainer}>
          <div className={styles.exampleTitle}>Ejemplo de API RESTful</div>
          <button 
            onClick={() => setShowExample(!showExample)}
            className={styles.navButton}
            style={{ marginBottom: '1rem' }}
          >
            {showExample ? 'Ocultar código' : 'Mostrar ejemplo'}
          </button>
          
          {showExample && (
            <div className={styles.codeBlock}>
{`// routes/usuarios.js
const express = require('express');
const router = express.Router();

// Base de datos temporal
let usuarios = [
  { id: 1, nombre: 'Usuario 1', email: 'usuario1@example.com' },
  { id: 2, nombre: 'Usuario 2', email: 'usuario2@example.com' }
];

// Obtener todos los usuarios
router.get('/', (req, res) => {
  res.json(usuarios);
});

// Obtener un usuario por ID
router.get('/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  res.json(usuario);
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre: req.body.nombre,
    email: req.body.email
  };
  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
});

// Actualizar un usuario
router.put('/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  
  usuario.nombre = req.body.nombre || usuario.nombre;
  usuario.email = req.body.email || usuario.email;
  
  res.json(usuario);
});

// Eliminar un usuario
router.delete('/:id', (req, res) => {
  const usuarioIndex = usuarios.findIndex(u => u.id === parseInt(req.params.id));
  if (usuarioIndex === -1) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  
  const usuarioEliminado = usuarios.splice(usuarioIndex, 1);
  res.json(usuarioEliminado[0]);
});

module.exports = router;`}
            </div>
          )}
        </div>

        <h3 className={styles.subtitle}>Buenas Prácticas</h3>
        <ul>
          <li>Usar sustantivos en plural para los recursos (ej: <code>/usuarios</code>)</li>
          <li>Utilizar códigos de estado HTTP apropiados</li>
          <li>Versionar tu API (ej: <code>/api/v1/usuarios</code>)</li>
          <li>Implementar paginación para colecciones grandes</li>
          <li>Usar filtros, ordenamiento y búsqueda en los endpoints</li>
          <li>Documentar la API con herramientas como Swagger/OpenAPI</li>
        </ul>

        <div className={styles.note}>
          <div className={styles.noteTitle}>Herramientas para probar APIs</div>
          <ul>
            <li>Postman</li>
            <li>Insomnia</li>
            <li>Thunder Client (extensión de VS Code)</li>
            <li>curl (línea de comandos)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
