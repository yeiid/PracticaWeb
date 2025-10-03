import React from 'react';
import styles from './PythonSlides.module.css';

const EstructurasPythonSlide = () => {
  return (
    <div className={styles.slide}>
      <h2>Estructuras de Control</h2>
      <p>Las estructuras de control dirigen el flujo de ejecución de tu programa.</p>

      <div className={styles.highlight}>
        <h3>🔀 Condicionales - if/elif/else</h3>
        <ul>
          <li><code>if</code> → Ejecuta código si la condición es verdadera</li>
          <li><code>elif</code> → Condiciones adicionales (else if)</li>
          <li><code>else</code> → Ejecuta si ninguna condición anterior es verdadera</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>Ejemplos de Condicionales:</h4>
        <pre>
{`# Condicional simple
edad = 18

if edad >= 18:
    print("Eres mayor de edad")
else:
    print("Eres menor de edad")

# Múltiples condiciones
nota = 85

if nota >= 90:
    print("Excelente")
elif nota >= 80:
    print("Muy bien")
elif nota >= 70:
    print("Bien")
else:
    print("Necesitas mejorar")

# Condición con operadores lógicos
temperatura = 25
esta_lloviendo = False

if temperatura > 20 and not esta_lloviendo:
    print("¡Perfecto para salir!")
elif temperatura <= 10 or esta_lloviendo:
    print("Mejor quedarse en casa")
else:
    print("Clima regular")`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🔄 Bucles - Loops</h3>
        <ul>
          <li><code>for</code> → Iterar sobre secuencias (listas, strings, rangos)</li>
          <li><code>while</code> → Ejecutar mientras la condición sea verdadera</li>
          <li><code>break</code> → Salir del bucle</li>
          <li><code>continue</code> → Saltar a la siguiente iteración</li>
          <li><code>else</code> → Ejecutar cuando el bucle termina normalmente</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>Ejemplos de Bucles:</h4>
        <pre>
{`# Bucle for con lista
frutas = ["manzana", "banana", "naranja"]

for fruta in frutas:
    print(f"Me gusta la {fruta}")

# Bucle for con range
for i in range(5):          # 0, 1, 2, 3, 4
    print(f"Número: {i}")

for i in range(1, 6):       # 1, 2, 3, 4, 5
    print(f"Número: {i}")

# Bucle while
contador = 0
while contador < 5:
    print(f"Contador: {contador}")
    contador += 1

# Bucle con break y continue
for i in range(10):
    if i == 3:
        continue           # Salta el 3
    if i == 7:
        break              # Sale del bucle
    print(i)               # Imprime 0, 1, 2, 4, 5, 6

# Bucle con else
for i in range(5):
    print(i)
else:
    print("El bucle terminó normalmente")`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🎯 List Comprehensions</h3>
        <p>Sintaxis compacta para crear listas</p>
        <pre>
{`# Tradicional
cuadrados = []
for i in range(10):
    cuadrados.append(i ** 2)

# List comprehension
cuadrados = [i ** 2 for i in range(10)]

# Con condición
pares = [i for i in range(20) if i % 2 == 0]

# Con strings
mayusculas = [palabra.upper() for palabra in ["hola", "mundo"]]

# Diccionario comprehension
cuadrados_dict = {i: i ** 2 for i in range(5)}`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>⚠️ Manejo de Excepciones</h3>
        <pre>
{`# Try/Except - Capturar errores
try:
    numero = int(input("Ingresa un número: "))
    resultado = 10 / numero
    print(f"Resultado: {resultado}")
except ValueError:
    print("¡Debes ingresar un número!")
except ZeroDivisionError:
    print("¡No se puede dividir por cero!")
else:
    print("Operación exitosa")
finally:
    print("Esto siempre se ejecuta")`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🏋️ Ejercicios Prácticos</h3>
        <ol>
          <li><strong>Clasificador de edades:</strong> Pide la edad y clasifícala (niño, adolescente, adulto, anciano)</li>
          <li><strong>Tabla de multiplicar:</strong> Muestra la tabla del número que ingrese el usuario</li>
          <li><strong>Contador de vocales:</strong> Cuenta las vocales en una palabra</li>
          <li><strong>Lista de números pares:</strong> Usa list comprehension para crear una lista de pares del 1 al 20</li>
          <li><strong>Calculadora simple:</strong> Crea una calculadora que sume, reste, multiplique y divida</li>
        </ol>
      </div>

      <p><strong>💡 Tip:</strong> Usa <code>elif</code> para múltiples condiciones y <code>try/except</code> para manejar errores de manera elegante.</p>
    </div>
  );
};

export default EstructurasPythonSlide;
