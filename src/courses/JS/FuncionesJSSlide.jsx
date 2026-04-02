import React from 'react';
import styles from './JSSlides.module.css';

const FuncionesJSSlide = () => {
  return (
    <div className={styles.slide}>
      <h2>Funciones en JavaScript</h2>
      <p>Las funciones son bloques de código reutilizable que realizan tareas específicas.</p>

      <div className={styles.highlight}>
        <h3>📝 Declaración de funciones:</h3>
        <ul>
          <li><code>function nombreFuncion()</code> {'→'} Declaración tradicional</li>
          <li><code>const nombreFuncion = () {'=>'}</code> {'→'} Arrow function (ES6)</li>
          <li><code>function (parametro)</code> → Funciones anónimas</li>
          <li><code>return</code> → Devuelve un valor de la función</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>Formas de declarar funciones:</h4>
        <pre>
{`// Función tradicional
function saludar(nombre) {
  return "Hola, " + nombre + "!";
}

// Arrow function
const sumar = (a, b) => {
  return a + b;
};

// Arrow function corta (una línea)
const multiplicar = (a, b) => a * b;

// Función sin parámetros
const decirHola = () => {
  return "Hola!";
}

// Llamando funciones
console.log(saludar("Ana"));     // "Hola, Ana!"
console.log(sumar(5, 3));        // 8
console.log(multiplicar(4, 6));  // 24`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>⚙️ Parámetros y argumentos:</h3>
        <ul>
          <li><strong>Parámetros:</strong> Variables en la definición de la función</li>
          <li><strong>Argumentos:</strong> Valores que se pasan al llamar la función</li>
          <li><strong>Parámetros por defecto:</strong> Valores que se usan si no se pasa argumento</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>Ejemplo con parámetros por defecto:</h4>
        <pre>
{`function crearUsuario(nombre, edad = 18, ciudad = "Desconocida") {
  return {
    nombre: nombre,
    edad: edad,
    ciudad: ciudad
  };
}

const usuario1 = crearUsuario("Carlos", 25, "Madrid");
const usuario2 = crearUsuario("María"); // edad = 18, ciudad = "Desconocida"

console.log(usuario1);
console.log(usuario2);`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🏋️ Ejercicios prácticos</h3>
        <ol>
          <li><strong>Calculadora:</strong> Crea funciones para suma, resta, multiplicación y división</li>
          <li><strong>Validador:</strong> Crea una función que verifique si un número es par o impar</li>
          <li><strong>Generador:</strong> Crea una función que genere un saludo personalizado</li>
          <li><strong>Contador:</strong> Crea una función que cuente las vocales en una palabra</li>
        </ol>
      </div>

      <p><strong>💡 Tip:</strong> Las arrow functions son más concisas y mantienen el contexto del <code>this</code> correctamente.</p>
    </div>
  );
};

export default FuncionesJSSlide;
