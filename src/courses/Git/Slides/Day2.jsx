import React from 'react';
import styles from '../GitSlides.module.css';

export const Day2 = () => {
  return (
    <div className={styles.slide}>
      <h1 className={styles.title}>🕰️ Viaje en el Tiempo</h1>
      <p className={styles.content}>
        Git te permite ver el pasado de tu proyecto y deshacer cambios si algo sale mal.
      </p>

      <h2 className={styles.subtitle}>1. Historial de Commits</h2>
      <p className={styles.content}>
        Usa <code>git log</code> para ver la lista de cambios realizados. Cada commit tiene un SHA (ID único).
      </p>
      <div className={styles.codeBlock}>
        <pre>
          git log --oneline
        </pre>
      </div>

      <h2 className={styles.subtitle}>2. Deshacer Cambios</h2>
      <p className={styles.content}>
        Si te equivocas en un archivo, puedes "viajar al pasado" y recuperarlo.
      </p>
      <div className={styles.codeBlock}>
        <pre>
          git checkout -- nombre_archivo.html
        </pre>
      </div>

      <div className={styles.exampleContainer}>
        <div className={styles.exampleTitle}>HEAD</div>
        <p>
          El <b>HEAD</b> es un puntero que indica en qué commit te encuentras actualmente. 
          Es como el "tú estás aquí" en un mapa del tiempo.
        </p>
      </div>
    </div>
  );
};
