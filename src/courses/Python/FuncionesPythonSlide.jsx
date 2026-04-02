import React from 'react';
import styles from './PythonSlides.module.css';

const FuncionesPythonSlide = () => {
  return (
    <div className={styles.slide}>
      <h2>Funciones en Python</h2>
      <p>Las funciones son bloques de código reutilizable que realizan tareas específicas.</p>

      <div className={styles.highlight}>
        <h3>📝 Definición de Funciones</h3>
        <ul>
          <li><code>def nombre_funcion(parametros):</code> → Declaración</li>
          <li><code>return</code> → Devuelve un valor</li>
          <li><code>pass</code> → Cuerpo vacío (placeholder)</li>
          <li><strong>Indentación obligatoria</strong> dentro de la función</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>Funciones Básicas:</h4>
        <pre>
{`# Función simple sin parámetros
def saludar():
    print("¡Hola, mundo!")

# Función con parámetros
def saludar_persona(nombre):
    print(f"¡Hola, {nombre}!")

# Función que devuelve valor
def sumar(a, b):
    return a + b

# Función con valor por defecto
def crear_usuario(nombre, edad=18):
    return {"nombre": nombre, "edad": edad}

# Llamadas a funciones
saludar()                          # ¡Hola, mundo!
saludar_persona("Ana")             # ¡Hola, Ana!
resultado = sumar(5, 3)           # resultado = 8
usuario = crear_usuario("Carlos")  # edad por defecto 18`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>⚙️ Parámetros Avanzados</h3>
        <ul>
          <li><strong>Parámetros posicionales</strong> - Orden importa</li>
          <li><strong>Parámetros nombrados</strong> - Usando nombre=valor</li>
          <li><strong>Args variables</strong> - *args para múltiples argumentos</li>
          <li><strong>Kwargs</strong> - **kwargs para argumentos nombrados</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>Parámetros Avanzados:</h4>
        <pre>
{`# Args variables (*args)
def sumar_todos(*numeros):
    total = 0
    for numero in numeros:
        total += numero
    return total

print(sumar_todos(1, 2, 3, 4, 5))  # 15

# Kwargs (**kwargs)
def configurar_servidor(**config):
    for clave, valor in config.items():
        print(f"{clave}: {valor}")

configurar_servidor(
    host="localhost",
    port=8080,
    debug=True
)

# Parámetros nombrados
def crear_persona(nombre, edad, ciudad="Madrid"):
    return {"nombre": nombre, "edad": edad, "ciudad": ciudad}

# Llamada con parámetros nombrados
persona = crear_persona(edad=25, nombre="Ana", ciudad="Barcelona")`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🎯 Funciones Lambda</h3>
        <p>Funciones anónimas de una sola línea</p>
        <pre>
{`# Sintaxis: lambda parámetros: expresión

# Función tradicional
def cuadrado(x):
    return x ** 2

# Función lambda
cuadrado_lambda = lambda x: x ** 2

print(cuadrado(5))           # 25
print(cuadrado_lambda(5))    # 25

# Usadas con map, filter, sorted
numeros = [1, 2, 3, 4, 5]

# Map - aplicar función a cada elemento
cuadrados = list(map(lambda x: x ** 2, numeros))  # [1, 4, 9, 16, 25]

# Filter - filtrar elementos
pares = list(filter(lambda x: x % 2 == 0, numeros))  # [2, 4]

# Sorted - ordenar con clave
palabras = ["hola", "mundo", "python", "codigo"]
ordenadas = sorted(palabras, key=lambda x: len(x))  # ['hola', 'mundo', 'codigo', 'python']`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>📦 Funciones Built-in Útiles</h3>
        <ul>
          <li><code>len(objeto)</code> → Longitud de listas, strings, etc.</li>
          <li><code>max(iterable)</code> → Valor máximo</li>
          <li><code>min(iterable)</code> → Valor mínimo</li>
          <li><code>sum(iterable)</code> → Suma de elementos</li>
          <li><code>range(inicio, fin, paso)</code> → Secuencia de números</li>
          <li><code>enumerate(iterable)</code> → Índice y valor</li>
          <li><code>zip(*iterables)</code> → Combina iterables</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>Ejemplos de Built-in:</h4>
        <pre>
{`numeros = [3, 1, 4, 1, 5, 9, 2, 6]

print(len(numeros))                    # 8
print(max(numeros))                    # 9
print(min(numeros))                    # 1
print(sum(numeros))                    # 31

# Range
for i in range(1, 10, 2):              # 1, 3, 5, 7, 9
    print(i)

# Enumerate
frutas = ["manzana", "banana", "naranja"]
for indice, fruta in enumerate(frutas):
    print(f"{indice}: {fruta}")

# Zip
nombres = ["Ana", "Carlos", "María"]
edades = [25, 30, 28]
for nombre, edad in zip(nombres, edades):
    print(f"{nombre} tiene {edad} años")`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🏋️ Ejercicios Prácticos</h3>
        <ol>
          <li><strong>Calculadora:</strong> Crea funciones para suma, resta, multiplicación y división</li>
          <li><strong>Validador de email:</strong> Función que verifique si un email es válido</li>
          <li><strong>Contador de palabras:</strong> Función que cuente palabras en una frase</li>
          <li><strong>Lambda:</strong> Usa funciones lambda con map y filter</li>
          <li><strong>Generador de contraseñas:</strong> Función que genere contraseñas aleatorias</li>
        </ol>
      </div>

      <p><strong>💡 Tip:</strong> Usa <code>return</code> para que las funciones devuelvan valores y <code>print</code> solo para debugging.</p>
    </div>
  );
};

export default FuncionesPythonSlide;
