import React from 'react';
import styles from '../GitSlides.module.css';

export const Day6 = () => {
  return (
    <div className={styles.slide}>
      <h1 className={styles.title}>⚡ Herramientas de Poder</h1>
      <p className={styles.content}>
        Herramientas avanzadas para situaciones de emergencia o limpieza profunda.
      </p>

      <h2 className={styles.subtitle}>1. Git Stash: Guardado Rápido</h2>
      <p className={styles.content}>
        ¿Necesitas cambiar de rama pero tus cambios actuales no están listos para un commit? 
        ¡Guárdalos en el "cajón"!
      </p>
      <div className={styles.codeBlock}>
        <pre>
          git stash       # Guardar<br />
          git stash pop   # Recuperar
        </pre>
      </div>

      <h2 className={styles.subtitle}>2. Git Reset: Volver Atrás</h2>
      <p className={styles.content}>
        Si quieres borrar todo lo que has hecho y volver al último commit:
      </p>
      <div className={styles.codeBlock}>
        <pre>
          git reset --hard HEAD
        </pre>
      </div>

      <div className={styles.exampleContainer}>
        <div className={styles.exampleTitle}>Cuidado Máximo</div>
        <p>
          <code>git reset --hard</code> borra tus cambios permanentemente si no han sido comiteados. 
          ¡Úsalo con sabiduría!
        </p>
      </div>
    </div>
  );
};
