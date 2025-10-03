import React from 'react';
import styles from './PythonSlides.module.css';

const CierrePythonSlide = () => {
  return (
    <div className={styles.slide}>
      <h2>¡Felicitaciones!</h2>
      <div className={styles.highlight}>
        <h3>🎉 ¡Has completado el curso de Python!</h3>
        <ul>
          <li>✅ Conoces la historia y filosofía de Python</li>
          <li>✅ Dominas la instalación y configuración</li>
          <li>✅ Entiendes la sintaxis básica</li>
          <li>✅ Controlas estructuras de control (condicionales y bucles)</li>
          <li>✅ Creas funciones reutilizables</li>
          <li>✅ Trabajas con programación orientada a objetos</li>
          <li>✅ Conoces las librerías más importantes</li>
          <li>✅ Sabes usar herramientas de desarrollo</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>🚀 ¿Qué puedes hacer ahora con Python?</h4>
        <ul>
          <li><strong>Automatización:</strong> Scripts para tareas repetitivas</li>
          <li><strong>Análisis de datos:</strong> Pandas, NumPy, visualización</li>
          <li><strong>Desarrollo web:</strong> Django, Flask, FastAPI</li>
          <li><strong>Inteligencia Artificial:</strong> TensorFlow, PyTorch, Scikit-learn</li>
          <li><strong>Web scraping:</strong> BeautifulSoup, Selenium</li>
          <li><strong>APIs:</strong> Crear y consumir servicios web</li>
          <li><strong>Games:</strong> Pygame para juegos 2D</li>
          <li><strong>Ciencia:</strong> Cálculos, simulaciones, investigación</li>
        </ul>
      </div>

      <div className={styles.highlight}>
        <h3>📚 Recursos para seguir aprendiendo:</h3>
        <ul>
          <li><strong>Documentación oficial:</strong> <code>docs.python.org</code></li>
          <li><strong>Python.org:</strong> Tutoriales y guías</li>
          <li><strong>Real Python:</strong> Artículos avanzados</li>
          <li><strong>Python Weekly:</strong> Newsletter con noticias</li>
          <li><strong>Stack Overflow:</strong> Comunidad de preguntas</li>
          <li><strong>PyPI:</strong> Repositorio de paquetes</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>🎯 Próximos pasos sugeridos:</h4>
        <ol>
          <li><strong>Proyecto personal:</strong> Crea una aplicación que te sea útil</li>
          <li><strong>Git y GitHub:</strong> Aprende control de versiones</li>
          <li><strong>Framework web:</strong> Django o Flask para aplicaciones web</li>
          <li><strong>Bases de datos:</strong> SQL (PostgreSQL, MySQL) o NoSQL (MongoDB)</li>
          <li><strong>APIs REST:</strong> Crear y documentar APIs</li>
          <li><strong>Testing:</strong> Pruebas unitarias y de integración</li>
          <li><strong>Despliegue:</strong> Docker, Heroku, AWS</li>
          <li><strong>Especialización:</strong> Data Science, IA, DevOps, etc.</li>
        </ol>
      </div>

      <div className={styles.highlight}>
        <h3>💡 Consejos para seguir practicando:</h3>
        <ul>
          <li><strong>Codifica diariamente:</strong> Un poco cada día es mejor que mucho de vez en cuando</li>
          <li><strong>Lee código ajeno:</strong> Estudia proyectos open source</li>
          <li><strong>Documenta tu código:</strong> Usa docstrings y comentarios</li>
          <li><strong>Únete a la comunidad:</strong> Foros, meetups, conferencias</li>
          <li><strong>Enseña a otros:</strong> Explicar conceptos consolida tu aprendizaje</li>
          <li><strong>Resuelve problemas:</strong> Plataformas como LeetCode, HackerRank</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>🌟 Proyectos para principiantes:</h4>
        <ul>
          <li><strong>Calculadora avanzada:</strong> Con historial y operaciones complejas</li>
          <li><strong>Analizador de texto:</strong> Cuenta palabras, busca patrones</li>
          <li><strong>Web scraper:</strong> Extrae información de sitios web</li>
          <li><strong>Generador de contraseñas:</strong> Con diferentes niveles de seguridad</li>
          <li><strong>Conversor de unidades:</strong> Monedas, temperaturas, longitudes</li>
          <li><strong>Lista de tareas:</strong> Con almacenamiento en archivo</li>
        </ul>
      </div>

      <p><em>¡Felicitaciones por completar el curso! Python es un lenguaje increíblemente versátil y poderoso. ¡Sigue explorando y creando cosas increíbles!</em></p>

      <p><strong>🐍 Recuerda:</strong> "El código es leído mucho más veces de las que se escribe. El código legible es código mantenible."</p>
    </div>
  );
};

export default CierrePythonSlide;
