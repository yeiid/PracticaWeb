import React, { useState } from 'react';
import styles from './ReactSlides.module.css';

export const PropsStateSlide = () => {
  const [contador, setContador] = useState(0);

  return (
    <div className={styles.slide}>
      <h1 className={styles.title}>Props y Estado</h1>
      
      <div className={styles.content}>
        <h3 className={styles.subtitle}>Props</h3>
        <p>Las props (propiedades) son datos de solo lectura que se pasan de un componente padre a un componente hijo.</p>
        
        <div className={styles.exampleContainer}>
          <div className={styles.exampleTitle}>Uso de props</div>
          <div className={styles.codeBlock}>
            {`// Componente padre
function App() {
  return <Saludo nombre="Ana" />;
}

// Componente hijo
function Saludo(props) {
  return <h1>Hola, {props.nombre}!</h1>;
}`}
          </div>
        </div>

        <h3 className={styles.subtitle}>Estado</h3>
        <p>El estado es un objeto que contiene datos que pueden cambiar durante el ciclo de vida del componente.</p>
        
        <div className={styles.exampleContainer}>
          <div className={styles.exampleTitle}>Uso del estado con Hooks</div>
          <div className={styles.codeBlock}>
            {`import { useState } from 'react';

function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <div>
      <p>Contador: {contador}</p>
      <button onClick={() => setContador(contador + 1)}>
        Incrementar
      </button>
    </div>
  );
}`}
          </div>
        </div>

        <div className={styles.note}>
          <div className={styles.noteTitle}>Diferencia clave</div>
          <ul>
            <li><strong>Props:</strong> Datos inmutables pasados al componente (como parámetros de función)</li>
            <li><strong>Estado:</strong> Datos gestionados dentro del componente que pueden cambiar</li>
          </ul>
        </div>

        <div className={styles.exampleContainer}>
          <div className={styles.exampleTitle}>Ejemplo interactivo</div>
          <div style={{ textAlign: 'center', margin: '1rem 0' }}>
            <p>Contador: {contador}</p>
            <button 
              onClick={() => setContador(contador + 1)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#4299e1',
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer'
              }}
            >
              Incrementar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
