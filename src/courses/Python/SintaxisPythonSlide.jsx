import React from 'react';
import styles from './PythonSlides.module.css';

const SintaxisPythonSlide = () => {
  return (
    <div className={styles.slide}>
      <h2>Sintaxis Básica de Python</h2>
      <p>Python se caracteriza por su sintaxis clara y legible.</p>

      <div className={styles.highlight}>
        <h3>📝 Características de la Sintaxis</h3>
        <ul>
          <li><strong>Sensible a mayúsculas</strong> - Python != python</li>
          <li><strong>Indentación obligatoria</strong> - Usa 4 espacios o tabulaciones</li>
          <li><strong>Sin punto y coma</strong> - Las líneas terminan con salto de línea</li>
          <li><strong>Comentarios</strong> con # para una línea</li>
          <li><strong>Docstrings</strong> con """ para múltiples líneas</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>🔤 Variables y Tipos de Datos:</h4>
        <pre>
{`# Variables (no necesitan declaración previa)
nombre = "Ana"           # String
edad = 25                # Integer
altura = 1.65           # Float
es_estudiante = True    # Boolean

# Tipos dinámicos
edad = "veinticinco"    # Ahora es string
print(type(edad))       # <class 'str'>

# Constantes (convención: mayúsculas)
PI = 3.14159
GRAVEDAD = 9.81`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🔢 Tipos de Datos Principales</h3>
        <ul>
          <li><strong>Números:</strong> int, float, complex</li>
          <li><strong>Texto:</strong> str (strings)</li>
          <li><strong>Booleanos:</strong> bool (True/False)</li>
          <li><strong>Listas:</strong> list (mutables)</li>
          <li><strong>Tuplas:</strong> tuple (inmutables)</li>
          <li><strong>Diccionarios:</strong> dict (clave-valor)</li>
          <li><strong>Conjuntos:</strong> set (únicos, no ordenados)</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>📋 Estructuras de Datos:</h4>
        <pre>
{`# Listas (mutables)
frutas = ["manzana", "banana", "naranja"]
frutas.append("uva")           # Agregar elemento
frutas[0] = "pera"             # Modificar elemento
print(frutas)                  # ['pera', 'banana', 'naranja', 'uva']

# Tuplas (inmutables)
coordenadas = (10, 20)
# coordenadas[0] = 15         # ¡Error!

# Diccionarios
persona = {
    "nombre": "Carlos",
    "edad": 30,
    "ciudad": "Madrid"
}
print(persona["nombre"])       # Carlos
persona["profesion"] = "ingeniero"  # Agregar clave`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🎯 Operadores</h3>
        <ul>
          <li><strong>Aritméticos:</strong> +, -, *, /, %, **, //</li>
          <li><strong>Comparación:</strong> ==, !=, &gt;, &lt;, &gt;=, &lt;=</li>
          <li><strong>Lógicos:</strong> and, or, not</li>
          <li><strong>Pertenencia:</strong> in, not in</li>
          <li><strong>Identidad:</strong> is, is not</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>💡 Ejemplos de Operadores:</h4>
        <pre>
{`# Aritméticos
suma = 10 + 5           # 15
potencia = 2 ** 3       # 8
division_entera = 10 // 3  # 3

# Comparación
es_mayor = 10 > 5       # True
es_igual = "hola" == "Hola"  # False

# Lógicos
llueve = True
tengo_paraguas = False
salgo = not llueve or tengo_paraguas  # True

# Pertenencia
numeros = [1, 2, 3, 4, 5]
print(3 in numeros)     # True
print(6 in numeros)     # False`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>📝 Entrada y Salida</h3>
        <pre>
{`# Salida
nombre = "Ana"
edad = 25
print(f"Hola, {nombre}. Tienes {edad} años")

# Entrada
nombre = input("¿Cómo te llamas? ")
print(f"¡Hola, {nombre}!")

# Conversión de tipos
edad = int(input("¿Cuántos años tienes? "))
altura = float(input("¿Cuál es tu altura? "))`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🏋️ Ejercicios Prácticos</h3>
        <ol>
          <li><strong>Variables:</strong> Crea variables de diferentes tipos y muéstralas</li>
          <li><strong>Listas:</strong> Crea una lista de tus hobbies y modifícala</li>
          <li><strong>Diccionarios:</strong> Crea un diccionario con información personal</li>
          <li><strong>Operadores:</strong> Calcula el área de un triángulo</li>
          <li><strong>Entrada/Salida:</strong> Pide nombre y edad al usuario y muestra un mensaje personalizado</li>
        </ol>
      </div>

      <p><strong>💡 Tip:</strong> Usa nombres de variables descriptivos y sigue la convención snake_case (mi_variable).</p>
    </div>
  );
};

export default SintaxisPythonSlide;
