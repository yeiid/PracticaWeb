import React from 'react';
import styles from './ReactSlides.module.css';

export const IntroduccionReactSlide = () => {
  return (
    <div className={styles.slide}>
      <h1 className={styles.title}>Introducción a React</h1>
      
      <div className={styles.content}>
        <p>React es una biblioteca de JavaScript para construir interfaces de usuario interactivas y reutilizables.</p>
        
        <div className={styles.note}>
          <div className={styles.noteTitle}>¿Por qué usar React?</div>
          <ul>
            <li>Componentes reutilizables</li>
            <li>Virtual DOM para mejor rendimiento</li>
            <li>Gran ecosistema y comunidad</li>
            <li>Desarrollado y mantenido por Facebook</li>
          </ul>
        </div>

        <h3 className={styles.subtitle}>Crear una nueva aplicación React</h3>
        <div className={styles.codeBlock}>
          npx create-react-app mi-aplicacion
          cd mi-aplicacion
          npm start
        </div>

        <div className={styles.exampleContainer}>
          <div className={styles.exampleTitle}>Estructura básica de un componente</div>
          <div className={styles.codeBlock}>
            {`import React from 'react';

function MiComponente() {
  return (
    <div>
      <h1>Hola, React!</h1>
    </div>
  );
}

export default MiComponente;`}
          </div>
        </div>
      </div>
    </div>
  );
};
