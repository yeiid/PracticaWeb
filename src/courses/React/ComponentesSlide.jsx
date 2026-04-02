import React from 'react';
import styles from './ReactSlides.module.css';

export const ComponentesSlide = () => {
  return (
    <div className={styles.slide}>
      <h1 className={styles.title}>Componentes en React</h1>
      
      <div className={styles.content}>
        <p>Los componentes son los bloques de construcción fundamentales en React. Pueden ser de dos tipos:</p>
        
        <div className={styles.exampleContainer}>
          <div className={styles.exampleTitle}>1. Componentes de función</div>
          <div className={styles.codeBlock}>
            {`import React from 'react';

function Saludo(props) {
  return <h1>Hola, {props.nombre}!</h1>;
}

export default Saludo;`}
          </div>
        </div>

        <div className={styles.exampleContainer}>
          <div className={styles.exampleTitle}>2. Componentes de clase</div>
          <div className={styles.codeBlock}>
            {`import React, { Component } from 'react';

class Saludo extends Component {
  render() {
    return <h1>Hola, {this.props.nombre}!</h1>;
  }
}

export default Saludo;`}
          </div>
        </div>

        <div className={styles.note}>
          <div className={styles.noteTitle}>Buenas prácticas</div>
          <ul>
            <li>Usar componentes de función con Hooks (recomendado)</li>
            <li>Nombres de componentes en PascalCase</li>
            <li>Un componente por archivo</li>
            <li>Mantener los componentes pequeños y enfocados</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
