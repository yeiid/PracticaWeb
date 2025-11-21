import React from 'react';
import styles from './HTMLSlides.module.css';
import ClientServerArch from '../../components/3d/html-course/ClientServerArch';

const FrontendBackendSlide = () => {
  return (
    <div className={styles.slide}>
      <h2>Frontend vs Backend</h2>
      <p className={styles.introText}>Una arquitectura fundamental en el desarrollo web moderno.</p>
      <div className={styles.slideContentWrapper}>
        <div className={styles.textContainer}>
          <div className={styles.highlight}>
            <h3>🖥️ Frontend - La parte visible</h3>
            <ul>
              <li><strong>Lo que el usuario ve y con lo que interactúa</strong></li>
              <li>Se ejecuta en el navegador del usuario (Cliente)</li>
              <li>Tecnologías: HTML, CSS, JavaScript</li>
            </ul>
          </div>
          <div className={styles.highlight}>
            <h3>⚙️ Backend - La parte invisible</h3>
            <ul>
              <li><strong>Se ejecuta en servidores remotos</strong></li>
              <li>Procesa datos y lógica de negocio</li>
              <li>Gestiona bases de datos y APIs</li>
              <li>Tecnologías: Python, Java, Node.js</li>
            </ul>
          </div>
        </div>
        <div className={styles.threeContainer}>
          <ClientServerArch />
        </div>
      </div>
       <div className={styles.example}>
        <h4>Analogía de un restaurante:</h4>
        <ul>
          <li><strong>Frontend</strong> → El salón (mesas, menú)</li>
          <li><strong>Backend</strong> → La cocina (chef, ingredientes)</li>
          <li><strong>Comunicación</strong> → Los meseros (API)</li>
        </ul>
      </div>
    </div>
  );
};

export default FrontendBackendSlide;
