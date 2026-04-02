import React from 'react';
import styles from './JSSlides.module.css';

const EventosJSSlide = () => {
  return (
    <div className={styles.slide}>
      <h2>Manejo de Eventos</h2>
      <p>Los eventos son acciones que ocurren en el navegador y que puedes detectar y manejar con JavaScript.</p>

      <div className={styles.highlight}>
        <h3>🖱️ Eventos del mouse:</h3>
        <ul>
          <li><code>click</code> → Clic del mouse</li>
          <li><code>dblclick</code> → Doble clic</li>
          <li><code>mousedown</code> → Presionar botón del mouse</li>
          <li><code>mouseup</code> → Soltar botón del mouse</li>
          <li><code>mousemove</code> → Mover el mouse</li>
          <li><code>mouseenter</code> → Entrar en un elemento</li>
          <li><code>mouseleave</code> → Salir de un elemento</li>
        </ul>
      </div>

      <div className={styles.highlight}>
        <h3>⌨️ Eventos del teclado:</h3>
        <ul>
          <li><code>keydown</code> → Presionar una tecla</li>
          <li><code>keyup</code> → Soltar una tecla</li>
          <li><code>keypress</code> → Presionar y soltar una tecla (deprecated)</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>Agregando event listeners:</h4>
        <pre>
{`// Forma tradicional (todavía funciona)
function saludar() {
  alert("¡Hola desde JavaScript!");
}

const boton = document.getElementById("mi-boton");
boton.onclick = saludar;

// Forma recomendada - addEventListener
const boton2 = document.getElementById("otro-boton");
boton2.addEventListener("click", function() {
  console.log("¡Me hicieron clic!");
});

// Removiendo event listeners
function temporal() {
  console.log("Solo una vez");
}

boton.addEventListener("click", temporal);
boton.removeEventListener("click", temporal);`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>📝 Event Object:</h3>
        <p>Cada evento pasa un objeto con información útil:</p>
        <ul>
          <li><code>type</code> → Tipo de evento</li>
          <li><code>target</code> → Elemento que disparó el evento</li>
          <li><code>currentTarget</code> → Elemento que tiene el listener</li>
          <li><code>clientX/clientY</code> → Posición del mouse</li>
          <li><code>key</code> → Tecla presionada</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>Usando el event object:</h4>
        <pre>
{`function mostrarInfo(evento) {
  console.log("Tipo de evento:", evento.type);
  console.log("Elemento:", evento.target);
  console.log("Posición X:", evento.clientX);
  console.log("Posición Y:", evento.clientY);
}

const elemento = document.getElementById("mi-elemento");
elemento.addEventListener("click", mostrarInfo);

// Para eventos de teclado
function mostrarTecla(evento) {
  console.log("Tecla presionada:", evento.key);
  console.log("Código de tecla:", evento.code);
}

document.addEventListener("keydown", mostrarTecla);`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🎯 Event Delegation:</h3>
        <p>Es más eficiente agregar un listener al padre que a múltiples hijos:</p>
        <pre>
{`// En lugar de agregar a cada botón
document.querySelectorAll(".boton").forEach(boton => {
  boton.addEventListener("click", manejarClic);
});

// Mejor: agregar al contenedor padre
const contenedor = document.querySelector(".contenedor-botones");
contenedor.addEventListener("click", function(evento) {
  if (evento.target.classList.contains("boton")) {
    console.log("Clic en botón:", evento.target.textContent);
  }
});`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🏋️ Ejercicios prácticos</h3>
        <ol>
          <li><strong>Contador de clics:</strong> Crea un botón que cuente cuántas veces se hace clic</li>
          <li><strong>Teclado mágico:</strong> Muestra en consola qué tecla presionas</li>
          <li><code>Hover</code> effects: Cambia el color de un elemento cuando pases el mouse</li>
          <li><strong>Lista interactiva:</strong> Agrega elementos a una lista al hacer clic en un botón</li>
        </ol>
      </div>

      <p><strong>💡 Tip:</strong> Usa <code>addEventListener</code> en lugar de asignación directa para tener más control y poder remover listeners.</p>
    </div>
  );
};

export default EventosJSSlide;
