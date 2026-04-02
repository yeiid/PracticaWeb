import React from 'react';
import styles from '../GitSlides.module.css';

export const Day1 = () => {
  return (
    <div className={styles.slide}>
      <h1 className={styles.title}>🚀 Los Cimientos de Git</h1>
      <p className={styles.content}>
        Git es un sistema de control de versiones distribuido que te permite rastrear cambios en tus archivos 
        y colaborar con otros desarrolladores de manera eficiente.
      </p>

      <h2 className={styles.subtitle}>1. Instalación y Configuración</h2>
      <p className={styles.content}>
        Antes de empezar, debemos identificarnos. Git necesita saber quién eres para firmar tus commits.
      </p>
      <div className={styles.codeBlock}>
        <pre>
          git config --global user.name "Tu Nombre"<br />
          git config --global user.email "tu@email.com"
        </pre>
      </div>

      <h2 className={styles.subtitle}>2. Tu Primer Repositorio</h2>
      <p className={styles.content}>
        Para empezar a rastrear una carpeta, simplemente entra en ella e inicializa Git:
      </p>
      <div className={styles.codeBlock}>
        <pre>
          git init
        </pre>
      </div>

      <div className={styles.exampleContainer}>
        <div className={styles.exampleTitle}>Dato Curioso</div>
        <p>
          Git fue creado por Linus Torvalds en tan solo 2 semanas para gestionar 
          el desarrollo del Kernel de Linux. ¡Un genio en acción!
        </p>
      </div>
    </div>
  );
};
