import React from 'react';
import styles from '../GitSlides.module.css';

export const Day3 = () => {
  return (
    <div className={styles.slide}>
      <h1 className={styles.title}>🌿 Universos Paralelos</h1>
      <p className={styles.content}>
        Las ramas (branches) te permiten trabajar en nuevas funciones sin alterar el código principal (main).
      </p>

      <h2 className={styles.subtitle}>1. Crear y Cambiar de Rama</h2>
      <div className={styles.codeBlock}>
        <pre>
          git branch mi-nueva-funcion<br />
          git checkout mi-nueva-funcion<br />
          {/* O en un solo comando */}
          git checkout -b mi-nueva-funcion
        </pre>
      </div>

      <h2 className={styles.subtitle}>2. Fusionar Cambios</h2>
      <p className={styles.content}>
        Cuando termines tu trabajo, puedes unirlo a la rama principal con <code>merge</code>.
      </p>
      <div className={styles.codeBlock}>
        <pre>
          git checkout main<br />
          git merge mi-nueva-funcion
        </pre>
      </div>

      <div className={styles.exampleContainer}>
        <div className={styles.exampleTitle}>Tip Pro</div>
        <p>
          Mantén tus ramas enfocadas en una sola tarea. Es más fácil de revisar y fusionar más tarde.
        </p>
      </div>
    </div>
  );
};
