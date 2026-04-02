import React from 'react';
import styles from './PythonSlides.module.css';

const POO_PythonSlide = () => {
  return (
    <div className={styles.slide}>
      <h2>Programación Orientada a Objetos</h2>
      <p>Python es un lenguaje multiparadigma que soporta completamente la programación orientada a objetos.</p>

      <div className={styles.highlight}>
        <h3>📦 Conceptos Fundamentales</h3>
        <ul>
          <li><strong>Clase</strong> → Plantilla para crear objetos</li>
          <li><strong>Objeto</strong> → Instancia de una clase</li>
          <li><strong>Atributos</strong> → Variables que pertenecen a la clase/objeto</li>
          <li><strong>Métodos</strong> → Funciones que pertenecen a la clase/objeto</li>
          <li><strong>Herencia</strong> → Una clase hereda de otra</li>
          <li><strong>Polimorfismo</strong> → Múltiples formas para un mismo método</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>🐕 Definición de una Clase:</h4>
        <pre>
{`class Perro:
    # Atributos de clase (compartidos por todas las instancias)
    especie = "Canis familiaris"

    # Constructor (__init__)
    def __init__(self, nombre, edad, raza="Mestizo"):
        # Atributos de instancia
        self.nombre = nombre
        self.edad = edad
        self.raza = raza
        self.energia = 100

    # Métodos
    def ladrar(self):
        return f"¡{self.nombre} dice: Guau guau!"

    def jugar(self):
        if self.energia > 20:
            self.energia -= 20
            return f"{self.nombre} jugó y ahora tiene {self.energia} de energía"
        else:
            return f"{self.nombre} está muy cansado para jugar"

    def dormir(self):
        self.energia = 100
        return f"{self.nombre} durmió y recuperó toda su energía"

    def __str__(self):
        return f"Perro: {self.nombre}, {self.edad} años, {self.raza}"`}
        </pre>
      </div>

      <div className={styles.example}>
        <h4>🎯 Usando la Clase:</h4>
        <pre>
{`# Crear instancias (objetos)
firulais = Perro("Firulais", 3, "Golden Retriever")
luna = Perro("Luna", 2)  # Usa raza por defecto

# Acceder a atributos
print(firulais.nombre)      # Firulais
print(luna.raza)           # Mestizo
print(Perro.especie)       # Canis familiaris

# Llamar métodos
print(firulais.ladrar())   # ¡Firulais dice: Guau guau!
print(firulais.jugar())    # Firulais jugó y ahora tiene 80 de energía
print(firulais.jugar())    # Firulais jugó y ahora tiene 60 de energía
print(firulais.dormir())   # Firulais durmió y recuperó toda su energía

# Método __str__
print(firulais)            # Perro: Firulais, 3 años, Golden Retriever`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🏗️ Herencia</h3>
        <p>Crear nuevas clases basadas en clases existentes</p>
        <pre>
{`# Clase padre
class Animal:
    def __init__(self, nombre):
        self.nombre = nombre

    def hacer_sonido(self):
        pass  # Método abstracto

    def describir(self):
        return f"Soy {self.nombre}, un animal"

# Clase hija (hereda de Animal)
class Gato(Animal):
    def __init__(self, nombre, color):
        super().__init__(nombre)  # Llama al constructor padre
        self.color = color

    def hacer_sonido(self):
        return "¡Miau!"

    def describir(self):
        return f"Soy {self.nombre}, un gato {self.color}"

# Clase nieta
class GatoDomestico(Gato):
    def __init__(self, nombre, color, dueno):
        super().__init__(nombre, color)
        self.dueno = dueno

    def ronronear(self):
        return f"{self.nombre} ronronea felizmente con {self.dueno}"`}
        </pre>
      </div>

      <div className={styles.example}>
        <h4>🔄 Polimorfismo:</h4>
        <pre>
{`# Función que usa polimorfismo
def hacer_hablar(animal):
    print(animal.hacer_sonido())

# Crear diferentes animales
perro = Perro("Rex", 5)
gato = Gato("Michi", "naranja")
animal_generico = Animal("Desconocido")

# Todos responden al mismo método
hacer_hablar(perro)           # ¡Rex dice: Guau guau!
hacer_hablar(gato)            # ¡Miau!
hacer_hablar(animal_generico) # (silencio - método vacío)

# Pero cada uno lo implementa diferente
print(perro.describir())      # Soy Rex, un animal
print(gato.describir())       # Soy Michi, un gato naranja`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🔒 Encapsulamiento</h3>
        <ul>
          <li><strong>Público</strong> - Accesible desde cualquier lugar</li>
          <li><strong>Protegido</strong> - _atributo (convención)</li>
          <li><strong>Privado</strong> - __atributo (name mangling)</li>
          <li><strong>Properties</strong> - Controlar acceso con @property</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>💊 Encapsulamiento:</h4>
        <pre>
{`class CuentaBancaria:
    def __init__(self, titular, saldo_inicial=0):
        self.titular = titular
        self.__saldo = saldo_inicial  # Privado
        self._historial = []         # Protegido

    @property
    def saldo(self):
        return self.__saldo

    @saldo.setter
    def saldo(self, nuevo_saldo):
        if nuevo_saldo >= 0:
            self._historial.append(f"Saldo cambiado a {nuevo_saldo}")
            self.__saldo = nuevo_saldo
        else:
            print("No se puede tener saldo negativo")

    def depositar(self, cantidad):
        self.saldo += cantidad

    def retirar(self, cantidad):
        self.saldo -= cantidad

# Uso
cuenta = CuentaBancaria("Ana", 1000)
print(cuenta.saldo)           # 1000 (usando property)

cuenta.saldo = 1500           # Usando setter
cuenta.depositar(500)         # 2000
cuenta.retirar(300)          # 1700

# cuenta.__saldo = -500      # ¡Error! No se puede acceder directamente`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🏋️ Ejercicios Prácticos</h3>
        <ol>
          <li><strong>Clase Coche:</strong> Crea una clase con atributos y métodos para un coche</li>
          <li><strong>Herencia Animal:</strong> Crea clases Perro, Gato, Pájaro que hereden de Animal</li>
          <li><strong>Sistema de Usuarios:</strong> Clase Usuario con métodos de login/logout</li>
          <li><strong>Cuenta Bancaria:</strong> Implementa una cuenta bancaria con propiedades</li>
          <li><strong>Figuras Geométricas:</strong> Clases para calcular área y perímetro</li>
        </ol>
      </div>

      <p><strong>💡 Tip:</strong> Usa clases cuando necesites modelar entidades del mundo real con comportamiento y propiedades compartidas.</p>
    </div>
  );
};

export default POO_PythonSlide;
