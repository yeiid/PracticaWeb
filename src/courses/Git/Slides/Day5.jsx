import React from 'react';
import styles from '../GitSlides.module.css';

export const Day5 = () => {
  return (
    <div className={styles.slide}>
      <h1 className={styles.title}>🌐 El Puente al Mundo</h1>
      <p className={styles.content}>
        Aprende a conectar tu trabajo local con repositorios remotos en GitHub, GitLab o Bitbucket.
      </p>

      <h2 className={styles.subtitle}>1. Añadir un Remoto</h2>
      <div className={styles.codeBlock}>
        <pre>
          git remote add origin https://github.com/tu-usuario/repo.git
        </pre>
      </div>

      <h2 className={styles.subtitle}>2. Push y Pull</h2>
      <p className={styles.content}>
        <b>Push:</b> Sube tus cambios a la nube.<br />
        <b>Pull:</b> Trae los cambios de otros a tu PC.
      </p>
      <div className={styles.codeBlock}>
        <pre>
          git push -u origin main<br />
          git pull origin main
        </pre>
      </div>

      <div className={styles.exampleContainer}>
        <div className={styles.exampleTitle}>Clonar</div>
        <p>
          Usa <code>git clone [URL]</code> para descargar un proyecto completo que ya existe en Internet a tu computadora.
        </p>
      </div>
    </div>
  );
};
