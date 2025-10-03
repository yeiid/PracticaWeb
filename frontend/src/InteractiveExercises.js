import React, { useState } from 'react';
import './InteractiveExercises.css';

const InteractiveExercises = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [userCode, setUserCode] = useState('');
  const [results, setResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const exercises = {
    html: [
      {
        id: 'html-1',
        title: 'Tu primera etiqueta HTML',
        description: 'Crea un párrafo simple con el texto "¡Hola, HTML!"',
        initialCode: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Mi primera página</title>\n</head>\n<body>\n    <!-- Escribe tu párrafo aquí -->\n</body>\n</html>',
        solution: '<p>¡Hola, HTML!</p>',
        validator: (code) => {
          const hasParagraph = code.includes('<p>') && code.includes('</p>');
          const hasText = code.includes('¡Hola, HTML!');
          return { passed: hasParagraph && hasText, message: hasParagraph && hasText ? '¡Perfecto! Has creado tu primer párrafo.' : 'Asegúrate de incluir la etiqueta <p> con el texto "¡Hola, HTML!"' };
        }
      },
      {
        id: 'html-2',
        title: 'Estructura básica HTML',
        description: 'Completa la estructura HTML básica con head, body y un título',
        initialCode: '<!DOCTYPE html>\n<html lang="es">\n<!-- Completa aquí -->\n</html>',
        solution: '<head>\n    <title>Mi página web</title>\n</head>\n<body>\n    <h1>¡Hola, mundo!</h1>\n</body>',
        validator: (code) => {
          const hasHead = code.includes('<head>') && code.includes('</head>');
          const hasBody = code.includes('<body>') && code.includes('</body>');
          const hasTitle = code.includes('<title>') && code.includes('</title>');
          const hasH1 = code.includes('<h1>') && code.includes('</h1>');
          return { passed: hasHead && hasBody && hasTitle && hasH1, message: hasHead && hasBody && hasTitle && hasH1 ? '¡Excelente! Estructura HTML completa.' : 'Faltan elementos: head, body, title o h1' };
        }
      }
    ],
    css: [
      {
        id: 'css-1',
        title: 'Tu primer estilo CSS',
        description: 'Cambia el color del texto a azul usando CSS',
        initialCode: '<style>\n    /* Escribe tu CSS aquí */\n</style>',
        solution: 'p {\n    color: blue;\n}',
        validator: (code) => {
          const hasColor = code.includes('color:') && code.includes('blue');
          const hasSelector = code.includes('p') || code.includes('*');
          return { passed: hasColor && hasSelector, message: hasColor && hasSelector ? '¡Perfecto! Has aplicado color azul.' : 'Asegúrate de incluir "color: blue" y un selector válido' };
        }
      },
      {
        id: 'css-2',
        title: 'Flexbox básico',
        description: 'Crea un contenedor flex con tres elementos centrados',
        initialCode: '.container {\n    /* Convierte en flex */\n}\n\n.item {\n    /* Centra los items */\n}',
        solution: '.container {\n    display: flex;\n    justify-content: center;\n}\n\n.item {\n    margin: 0 10px;\n}',
        validator: (code) => {
          const hasDisplayFlex = code.includes('display: flex');
          const hasJustifyContent = code.includes('justify-content');
          return { passed: hasDisplayFlex && hasJustifyContent, message: hasDisplayFlex && hasJustifyContent ? '¡Excelente! Layout flex implementado.' : 'Faltan propiedades: display: flex y justify-content' };
        }
      }
    ],
    js: [
      {
        id: 'js-1',
        title: 'Variables y console.log',
        description: 'Declara una variable y muéstrala en consola',
        initialCode: '// Declara una variable\n// Muéstrala en consola',
        solution: 'let mensaje = "¡Hola, JavaScript!";\nconsole.log(mensaje);',
        validator: (code) => {
          const hasLet = code.includes('let ') || code.includes('const ') || code.includes('var ');
          const hasConsoleLog = code.includes('console.log');
          const hasSemicolon = code.includes(';');
          return { passed: hasLet && hasConsoleLog && hasSemicolon, message: hasLet && hasConsoleLog && hasSemicolon ? '¡Perfecto! Variables y consola funcionando.' : 'Asegúrate de incluir declaración de variable, console.log y punto y coma' };
        }
      },
      {
        id: 'js-2',
        title: 'Funciones básicas',
        description: 'Crea una función que sume dos números',
        initialCode: '// Crea una función que sume a + b\nfunction sumar(a, b) {\n    // Tu código aquí\n}',
        solution: 'function sumar(a, b) {\n    return a + b;\n}',
        validator: (code) => {
          const hasFunction = code.includes('function sumar');
          const hasReturn = code.includes('return');
          const hasParameters = code.includes('(a, b)');
          return { passed: hasFunction && hasReturn && hasParameters, message: hasFunction && hasReturn && hasParameters ? '¡Excelente! Función creada correctamente.' : 'Faltan elementos: function, parámetros (a, b) o return' };
        }
      }
    ]
  };

  const runCode = async (exercise) => {
    setIsRunning(true);
    setResults(null);

    // Simular validación (en un entorno real usarías un sandbox como jsfiddle o similar)
    setTimeout(() => {
      const validation = exercise.validator(userCode);
      setResults(validation);
      setIsRunning(false);

      // Si pasa, actualizar progreso en localStorage
      if (validation.passed) {
        const progress = JSON.parse(localStorage.getItem('academia-web-progress') || '{}');
        const userId = 'current-user'; // En un sistema real, usarías el ID real del usuario

        if (!progress[userId]) {
          progress[userId] = { html: { completed: 0, total: 8 }, css: { completed: 0, total: 8 }, js: { completed: 0, total: 10 } };
        }

        // Incrementar contador del curso correspondiente
        const course = exercise.id.split('-')[0];
        progress[userId][course].completed += 1;

        localStorage.setItem('academia-web-progress', JSON.stringify(progress));
      }
    }, 1000);
  };

  const resetExercise = () => {
    setUserCode(selectedExercise.initialCode);
    setResults(null);
  };

  return (
    <div className="interactive-exercises">
      <h2>🏋️ Ejercicios Interactivos</h2>

      {!selectedExercise ? (
        <div className="exercises-grid">
          {Object.entries(exercises).map(([course, courseExercises]) => (
            <div key={course} className="course-section">
              <h3>{course.toUpperCase()}</h3>
              {courseExercises.map(exercise => (
                <div
                  key={exercise.id}
                  className="exercise-card"
                  onClick={() => {
                    setSelectedExercise(exercise);
                    setUserCode(exercise.initialCode);
                  }}
                >
                  <h4>{exercise.title}</h4>
                  <p>{exercise.description}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="exercise-workspace">
          <div className="exercise-header">
            <h3>{selectedExercise.title}</h3>
            <p>{selectedExercise.description}</p>
            <button onClick={() => setSelectedExercise(null)} className="back-btn">
              ← Volver a ejercicios
            </button>
          </div>

          <div className="code-editor">
            <div className="editor-toolbar">
              <span>Ejercicio: {selectedExercise.title}</span>
              <div className="toolbar-buttons">
                <button onClick={resetExercise} className="reset-btn">🔄 Reset</button>
                <button
                  onClick={() => runCode(selectedExercise)}
                  disabled={isRunning}
                  className="run-btn"
                >
                  {isRunning ? '⚡ Ejecutando...' : '▶️ Ejecutar'}
                </button>
              </div>
            </div>

            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              placeholder="Escribe tu código aquí..."
              className="code-textarea"
            />
          </div>

          {results && (
            <div className={`results ${results.passed ? 'success' : 'error'}`}>
              <div className="results-header">
                <span>{results.passed ? '✅ ¡Correcto!' : '❌ Inténtalo de nuevo'}</span>
              </div>
              <p>{results.message}</p>
            </div>
          )}

          <div className="exercise-hints">
            <h4>💡 Consejos:</h4>
            <ul>
              <li>Revisa la sintaxis (etiquetas, punto y coma, etc.)</li>
              <li>Asegúrate de que el código sea exactamente como se pide</li>
              <li>Usa las herramientas de desarrollador del navegador para depurar</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveExercises;
