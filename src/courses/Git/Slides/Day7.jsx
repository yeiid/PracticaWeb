import React from 'react';
import styles from '../GitSlides.module.css';

export const Day7 = () => {
  return (
    <div className={styles.slide}>
      <h1 className={styles.title}>🤝 Flujo de Trabajo Profesional</h1>
      <p className={styles.content}>
        Aprende cómo trabajan las grandes empresas tecnológicas con Pull Requests y Gitflow.
      </p>

      <h2 className={styles.subtitle}>1. Pull Requests (PR)</h2>
      <p className={styles.content}>
        Un PR es una petición para fusionar tu código. Permite que otros revisen tu trabajo antes 
        de que se convierta en parte del producto final.
      </p>

      <h2 className={styles.subtitle}>2. Gitflow</h2>
      <p className={styles.content}>
        Es un modelo estándar de organización de ramas:<br />
        - <b>main:</b> Producción (lo que ven los usuarios).<br />
        - <b>develop:</b> Integración de nuevas funciones.<br />
        - <b>feature:</b> Trabajo en funciones específicas.
      </p>

      <div className={styles.exampleContainer}>
        <div className={styles.exampleTitle}>¡Meta Alcanzada!</div>
        <p>
          Has completado los 7 días de Git Master. Ahora tienes las herramientas necesarias 
          para trabajar en equipos profesionales de desarrollo web. 🎓
        </p>
      </div>
    </div>
  );
};
