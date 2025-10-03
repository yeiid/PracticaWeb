import React from 'react';
import styles from './HTMLSlides.module.css';

const FrontendBackendSlide = () => {
  return (
    <div className={styles.slide}>
      <h2>Frontend vs Backend</h2>
      <div className={styles.highlight}>
        <h3>🖥️ Frontend - La parte visible</h3>
        <ul>
          <li><strong>Lo que el usuario ve y con lo que interactúa</strong></li>
          <li>Se ejecuta en el navegador del usuario</li>
          <li>HTML estructura el contenido</li>
          <li>CSS da estilo y apariencia</li>
          <li>JavaScript agrega interactividad</li>
        </ul>
      </div>
      <div className={styles.highlight}>
        <h3>⚙️ Backend - La parte invisible</h3>
        <ul>
          <li><strong>Se ejecuta en servidores remotos</strong></li>
          <li>Procesa datos y lógica de negocio</li>
          <li>Gestiona bases de datos</li>
          <li>Proporciona APIs para el frontend</li>
          <li>Lenguajes como Python, Java, PHP, Node.js</li>
        </ul>
      </div>
      <div className={styles.example}>
        <h4>Analogía de un restaurante:</h4>
        <ul>
          <li><strong>Frontend</strong> → El salón del restaurante (mesas, decoración, menú visible)</li>
          <li><strong>Backend</strong> → La cocina (chef, ingredientes, preparación de platos)</li>
          <li><strong>Comunicación</strong> → Los meseros llevan los pedidos de un lado a otro</li>
        </ul>
      </div>
      <p><strong>🎯 Enfoque de este curso:</strong> Aprenderemos Frontend para crear interfaces web hermosas e interactivas.</p>
    </div>
  );
};

export default FrontendBackendSlide;
