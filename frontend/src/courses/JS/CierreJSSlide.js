import React from 'react';
import styles from './JSSlides.module.css';

const CierreJSSlide = () => {
  return (
    <div className={styles.slide}>
      <h2>¡Felicitaciones!</h2>
      <div className={styles.highlight}>
        <h3>🎉 ¡Has completado el curso de JavaScript!</h3>
        <ul>
          <li>✅ Entiendes qué es JavaScript y su importancia</li>
          <li>✅ Dominas variables y tipos de datos</li>
          <li>✅ Sabes usar operadores aritméticos y lógicos</li>
          <li>✅ Controlas el flujo con condicionales y bucles</li>
          <li>✅ Creas funciones reutilizables</li>
          <li>✅ Trabajas con objetos y arrays</li>
          <li>✅ Manipulas el DOM dinámicamente</li>
          <li>✅ Manejas eventos del usuario</li>
          <li>✅ Usas características modernas de ES6+</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>🚀 ¿Qué puedes hacer ahora?</h4>
        <p>Con los conocimientos adquiridos puedes:</p>
        <ul>
          <li><strong>Crear sitios web interactivos:</strong> Formularios, animaciones, validaciones</li>
          <li><strong>Desarrollar juegos simples:</strong> Usando canvas y lógica de programación</li>
          <li><strong>Construir aplicaciones web:</strong> Combinando HTML, CSS y JavaScript</li>
          <li><strong>Manipular datos:</strong> Trabajar con APIs y servidores</li>
          <li><strong>Continuar aprendiendo:</strong> React, Node.js, bases de datos, etc.</li>
        </ul>
      </div>

      <div className={styles.highlight}>
        <h3>💡 Consejos para seguir practicando:</h3>
        <ul>
          <li><strong>Proyectos pequeños:</strong> Empieza con calculadoras, listas de tareas, conversores</li>
          <li><strong>Documentación:</strong> Consulta MDN Web Docs frecuentemente</li>
          <li><strong>Comunidad:</strong> Únete a comunidades de desarrolladores</li>
          <li><strong>Código limpio:</strong> Usa nombres descriptivos y comenta tu código</li>
          <li><strong>Práctica constante:</strong> Programa un poco cada día</li>
        </ul>
      </div>

      <p><em>¡Felicitaciones por completar el curso! JavaScript es un lenguaje versátil y poderoso. ¡Sigue practicando y creando cosas increíbles!</em></p>

      <p><strong>🎯 Próximos pasos sugeridos:</strong></p>
      <ol>
        <li>Profundizar en frameworks como React o Vue.js</li>
        <li>Aprender Node.js para desarrollo backend</li>
        <li>Estudiar bases de datos (MongoDB, SQL)</li>
        <li>Practicar con APIs REST</li>
        <li>Explorar testing y herramientas de desarrollo</li>
      </ol>
    </div>
  );
};

export default CierreJSSlide;
