import React from 'react';
import styles from './PythonSlides.module.css';

const LibreriasPythonSlide = () => {
  return (
    <div className={styles.slide}>
      <h2>Librerías Más Importantes</h2>
      <p>Python tiene un ecosistema rico de librerías que amplían sus capacidades.</p>

      <div className={styles.highlight}>
        <h3>🔢 Librerías para Matemáticas y Datos</h3>
        <ul>
          <li><strong>NumPy</strong> - Arrays multidimensionales y operaciones matemáticas</li>
          <li><strong>Pandas</strong> - Análisis y manipulación de datos tabulares</li>
          <li><strong>Matplotlib</strong> - Creación de gráficos y visualizaciones</li>
          <li><strong>SciPy</strong> - Computación científica avanzada</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>📊 NumPy - Arrays Potentes:</h4>
        <pre>
{`import numpy as np

# Crear arrays
arr = np.array([1, 2, 3, 4, 5])
matriz = np.array([[1, 2], [3, 4]])

# Operaciones matemáticas
print(arr + 10)        # [11 12 13 14 15]
print(arr * 2)         # [2 4 6 8 10]
print(np.mean(arr))    # 3.0 (promedio)
print(np.sum(arr))     # 15

# Arrays multidimensionales
zeros = np.zeros((3, 3))  # Matriz de ceros 3x3
ones = np.ones((2, 4))    # Matriz de unos 2x4
random = np.random.rand(3, 3)  # Números aleatorios`}
        </pre>
      </div>

      <div className={styles.example}>
        <h4>📋 Pandas - Datos Tabulares:</h4>
        <pre>
{`import pandas as pd

# Crear DataFrame
datos = {
    'Nombre': ['Ana', 'Carlos', 'María'],
    'Edad': [25, 30, 28],
    'Ciudad': ['Madrid', 'Barcelona', 'Valencia']
}
df = pd.DataFrame(datos)

# Operaciones comunes
print(df.head())           # Primeras 5 filas
print(df['Edad'].mean())   # Promedio de edad
print(df[df['Edad'] > 25]) # Filtrar mayores de 25

# Leer archivos
df_csv = pd.read_csv('datos.csv')
df_excel = pd.read_excel('datos.xlsx')`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🌐 Librerías para Web</h3>
        <ul>
          <li><strong>Requests</strong> - Peticiones HTTP simples</li>
          <li><strong>BeautifulSoup</strong> - Web scraping</li>
          <li><strong>Django</strong> - Framework web completo</li>
          <li><strong>Flask</strong> - Microframework web ligero</li>
          <li><strong>FastAPI</strong> - API REST moderna y rápida</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>📡 Requests - Peticiones HTTP:</h4>
        <pre>
{`import requests

# GET request
respuesta = requests.get('https://api.github.com/user', auth=('user', 'pass'))
print(respuesta.status_code)  # 200
print(respuesta.json())

# POST request
datos = {'username': 'usuario', 'password': 'contraseña'}
respuesta = requests.post('https://httpbin.org/post', json=datos)

# Headers
headers = {'User-Agent': 'Mi App 1.0'}
respuesta = requests.get('https://api.example.com', headers=headers)`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🤖 Librerías para IA y Machine Learning</h3>
        <ul>
          <li><strong>TensorFlow</strong> - Framework de Google para ML</li>
          <li><strong>PyTorch</strong> - Framework de Facebook para ML</li>
          <li><strong>Scikit-learn</strong> - Machine learning tradicional</li>
          <li><strong>Keras</strong> - API de alto nivel para redes neuronales</li>
          <li><strong>NLTK</strong> - Procesamiento de lenguaje natural</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>🧠 Scikit-learn - Machine Learning:</h4>
        <pre>
{`from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# Cargar datos
iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.3
)

# Entrenar modelo
modelo = RandomForestClassifier(n_estimators=100)
modelo.fit(X_train, y_train)

# Predecir
predicciones = modelo.predict(X_test)
precision = modelo.score(X_test, y_test)
print(f"Precisión: {precision:.2f}")`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🛠️ Librerías para Automatización</h3>
        <ul>
          <li><strong>Selenium</strong> - Automatización de navegadores</li>
          <li><strong>PyAutoGUI</strong> - Automatización de GUI</li>
          <li><strong>OpenPyXL</strong> - Manipulación de archivos Excel</li>
          <li><strong>PyPDF2</strong> - Manipulación de PDFs</li>
          <li><strong>Smtplib</strong> - Envío de emails</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>🤖 Selenium - Web Scraping:</h4>
        <pre>
{`from selenium import webdriver
from selenium.webdriver.common.by import By

# Configurar navegador
driver = webdriver.Chrome()
driver.get("https://example.com")

# Buscar elementos
titulo = driver.find_element(By.TAG_NAME, "h1")
print(titulo.text)

# Interactuar
busqueda = driver.find_element(By.NAME, "q")
busqueda.send_keys("Python tutorial")
busqueda.submit()

# Esperar y extraer resultados
resultados = driver.find_elements(By.CSS_SELECTOR, ".result")
for resultado in resultados:
    print(resultado.text)

driver.quit()`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🎮 Librerías para Juegos y Gráficos</h3>
        <ul>
          <li><strong>Pygame</strong> - Desarrollo de juegos 2D</li>
          <li><strong>Turtle</strong> - Gráficos vectoriales simples</li>
          <li><strong>Pillow (PIL)</strong> - Manipulación de imágenes</li>
          <li><strong>OpenCV</strong> - Visión por computadora</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>🎨 Pillow - Edición de Imágenes:</h4>
        <pre>
{`from PIL import Image, ImageFilter

# Abrir imagen
imagen = Image.open("foto.jpg")

# Operaciones básicas
imagen = imagen.resize((800, 600))        # Redimensionar
imagen = imagen.rotate(45)                # Rotar
imagen = imagen.convert("L")              # Convertir a escala de grises

# Filtros
imagen = imagen.filter(ImageFilter.BLUR)  # Desenfocar
imagen = imagen.filter(ImageFilter.SHARPEN)  # Enfocar

# Guardar
imagen.save("foto_editada.jpg")

# Crear nueva imagen
nueva = Image.new("RGB", (200, 200), "red")
nueva.save("imagen_roja.jpg")`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🏋️ Ejercicios Prácticos</h3>
        <ol>
          <li><strong>Análisis de datos:</strong> Usa NumPy para calcular estadísticas de un array</li>
          <li><strong>Visualización:</strong> Crea un gráfico simple con Matplotlib</li>
          <li><strong>Web scraping:</strong> Extrae información de una página web con Requests</li>
          <li><strong>Manipulación de imágenes:</strong> Edita una imagen con Pillow</li>
          <li><strong>API request:</strong> Consume una API REST pública</li>
        </ol>
      </div>

      <p><strong>💡 Tip:</strong> Instala solo las librerías que necesites con <code>pip install nombre_libreria</code> y usa entornos virtuales para evitar conflictos.</p>
    </div>
  );
};

export default LibreriasPythonSlide;
