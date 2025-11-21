import React, { useState } from 'react';
import styles from './BackendSlides.module.css';

export const NodeJSSlide = () => {
  const [showExample, setShowExample] = useState(false);

  return (
    <div className={styles.slide}>
      <h1 className={styles.title}>Fundamentos de Node.js</h1>
      
      <div className={styles.content}>
        <p>Node.js es un entorno de ejecución de JavaScript del lado del servidor construido sobre el motor V8 de Chrome.</p>
        
        <div className={styles.note}>
          <div className={styles.noteTitle}>Características principales</div>
          <ul>
            <li>Asíncrono y basado en eventos</li>
            <li>No bloqueante E/S</li>
            <li>Uso de módulos con CommonJS</li>
            <li>Ecosistema de paquetes (npm)</li>
          </ul>
        </div>

        <div className={styles.exampleContainer}>
          <div className={styles.exampleTitle}>Crear un servidor HTTP básico</div>
          <button 
            onClick={() => setShowExample(!showExample)}
            className={styles.navButton}
            style={{ marginBottom: '1rem' }}
          >
            {showExample ? 'Ocultar código' : 'Mostrar ejemplo'}
          </button>
          
          {showExample && (
            <div className={styles.codeBlock}>
{`// server.js
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('¡Hola desde Node.js!\n');
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(\`Servidor ejecutándose en http://localhost:\${PORT}/\`);
});`}
            </div>
          )}
        </div>

        <h3 className={styles.subtitle}>Manejo de Módulos</h3>
        <p>Node.js usa el sistema de módulos CommonJS:</p>
        
        <div className={styles.codeBlock}>
{`// math.js
const sumar = (a, b) => a + b;
const restar = (a, b) => a - b;

module.exports = {
  sumar,
  restar
};

// app.js
const { sumar, restar } = require('./math');

console.log(sumar(5, 3)); // 8
console.log(restar(5, 3)); // 2`}
        </div>

        <div className={styles.note}>
          <div className={styles.noteTitle}>npm (Node Package Manager)</div>
          <p>Comandos básicos:</p>
          <div className={styles.codeBlock}>
{`# Inicializar un proyecto
npm init -y

# Instalar un paquete
npm install nombre-del-paquete

# Instalar como dependencia de desarrollo
npm install --save-dev nombre-del-paquete

# Ejecutar scripts definidos en package.json
npm run nombre-del-script`}
          </div>
        </div>
      </div>
    </div>
  );
};
