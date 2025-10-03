import React from 'react';
import styles from './HTMLSlides.module.css';

const HerramientasSlide = () => {
  return (
    <div className={styles.slide}>
      <h2>Herramientas necesarias</h2>
      <div className={styles.highlight}>
        <h3>🛠️ Herramientas esenciales para desarrollo web</h3>
        <ul>
          <li><strong>Editor de código:</strong> VS Code (gratuito, potente, con miles de extensiones)</li>
          <li><strong>Navegador:</strong> Chrome, Firefox, Edge (para probar tu código)</li>
          <li><strong>Terminal:</strong> Para ejecutar comandos y servidores locales</li>
          <li><strong>Git:</strong> Para control de versiones y colaboración</li>
        </ul>
      </div>
      <div className={styles.highlight}>
        <h3>📁 Estructura de archivos típica</h3>
        <ul>
          <li><code>index.html</code> → Archivo principal de la página</li>
          <li><code>styles.css</code> → Estilos y apariencia</li>
          <li><code>script.js</code> → Funcionalidad JavaScript</li>
          <li><code>assets/</code> → Carpeta para imágenes, fuentes, etc.</li>
        </ul>
      </div>
      <div className={styles.example}>
        <h4>💡 Recomendaciones de setup:</h4>
        <ul>
          <li><strong>Extensiones VS Code:</strong> Live Server, Prettier, HTML/CSS Support</li>
          <li><strong>Herramientas de desarrollador:</strong> Presiona F12 en el navegador para inspeccionar</li>
          <li><strong>Live Server:</strong> Para ver cambios en tiempo real sin recargar</li>
        </ul>
      </div>
      <p><strong>🚀 Extra:</strong> Usa las herramientas de desarrollador del navegador (F12) para inspeccionar y experimentar con el código.</p>
    </div>
  );
};

export default HerramientasSlide;
