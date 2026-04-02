import React from 'react';
import styles from '../GitSlides.module.css';

export const Day4 = () => {
  return (
    <div className={styles.slide}>
      <h1 className={styles.title}>⚠️ Resolución de Conflictos</h1>
      <p className={styles.content}>
        A veces, Git no sabe qué versión elegir porque dos ramas han cambiado la misma línea del mismo archivo.
      </p>

      <h2 className={styles.subtitle}>1. ¿Cómo sucede?</h2>
      <p className={styles.content}>
        Al intentar un <code>merge</code>, Git marcará los archivos en conflicto. Verás unos símbolos extraños:
      </p>
      <div className={styles.codeBlock}>
        <pre>
          &lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD<br />
          Color: azul;<br />
          =======<br />
          Color: rojo;<br />
          &gt;&gt;&gt;&gt;&gt;&gt;&gt; mi-rama
        </pre>
      </div>

      <h2 className={styles.subtitle}>2. ¿Cómo solucionarlo?</h2>
      <p className={styles.content}>
        1. Abre el archivo y elige qué versión prefieres.<br />
        2. Borra los marcadores de Git.<br />
        3. Haz un commit final para confirmar la resolución.
      </p>

      <div className={styles.exampleContainer}>
        <div className={styles.exampleTitle}>No entres en pánico</div>
        <p>
          Los conflictos son normales en el trabajo en equipo. Git te está avisando para que no pierdas información accidentalmente.
        </p>
      </div>
    </div>
  );
};
