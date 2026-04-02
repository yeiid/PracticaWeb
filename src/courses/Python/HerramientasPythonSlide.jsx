import React from 'react';
import styles from './PythonSlides.module.css';

const HerramientasPythonSlide = () => {
  return (
    <div className={styles.slide}>
      <h2>Herramientas de Desarrollo</h2>
      <p>Conoce las mejores herramientas para desarrollar proyectos en Python.</p>

      <div className={styles.highlight}>
        <h3>💻 Editores de Código e IDEs</h3>
        <ul>
          <li><strong>Visual Studio Code</strong> - Gratuito, extensible, comunidad enorme</li>
          <li><strong>PyCharm</strong> - IDE profesional (Community edition gratis)</li>
          <li><strong>Sublime Text</strong> - Ligero y rápido</li>
          <li><strong>Atom</strong> - Personalizable (mantenido por GitHub)</li>
          <li><strong>Vim/Neovim</strong> - Para usuarios avanzados</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>⚙️ Configuración VS Code para Python:</h4>
        <ul>
          <li><strong>Instalar extensión</strong> "Python" de Microsoft</li>
          <li><strong>Configurar intérprete</strong> (Ctrl+Shift+P → "Python: Select Interpreter")</li>
          <li><strong>Extensiones recomendadas:</strong>
            <ul>
              <li>Python Docstring Generator</li>
              <li>Bracket Pair Colorizer 2</li>
              <li>Python Indent</li>
              <li>Code Runner</li>
            </ul>
          </li>
        </ul>
      </div>

      <div className={styles.highlight}>
        <h3>📦 Gestores de Paquetes</h3>
        <ul>
          <li><strong>pip</strong> - Gestor oficial (viene con Python)</li>
          <li><strong>conda</strong> - Para entornos científicos (Anaconda/Miniconda)</li>
          <li><strong>poetry</strong> - Moderno, gestión de dependencias y entornos</li>
          <li><strong>pipenv</strong> - Combina virtualenv + pip</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>📚 Poetry - Gestor Moderno:</h4>
        <pre>
{`# Instalar Poetry
curl -sSL https://install.python-poetry.org | python3 -

# Crear proyecto
poetry new mi-proyecto

# Agregar dependencias
poetry add requests numpy pandas

# Instalar dependencias
poetry install

# Ejecutar proyecto
poetry run python main.py

# Crear entorno virtual automáticamente
poetry shell`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🔧 Herramientas de Testing</h3>
        <ul>
          <li><strong>unittest</strong> - Framework de testing incluido en Python</li>
          <li><strong>pytest</strong> - Framework de testing más avanzado</li>
          <li><strong>coverage</strong> - Medir cobertura de código</li>
          <li><strong>tox</strong> - Testing en múltiples entornos</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>🧪 Testing con pytest:</h4>
        <pre>
{`# test_calculadora.py
def test_suma():
    assert suma(2, 3) == 5
    assert suma(-1, 1) == 0

def test_resta():
    assert resta(5, 3) == 2
    assert resta(1, 5) == -4

# Ejecutar tests
pytest test_calculadora.py -v

# Con cobertura
pytest --cov=calculadora test_calculadora.py`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>📊 Herramientas para Análisis de Código</h3>
        <ul>
          <li><strong>flake8</strong> - Linting (estilo y errores)</li>
          <li><strong>black</strong> - Formateador de código automático</li>
          <li><strong>isort</strong> - Ordena imports automáticamente</li>
          <li><strong>mypy</strong> - Type checking estático</li>
          <li><strong>bandit</strong> - Seguridad en el código</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>🎨 Formateo con Black:</h4>
        <pre>
{`# Antes
def funcion_larga(parametro_uno, parametro_dos, parametro_tres):
    return parametro_uno+parametro_dos+parametro_tres

# Después (black --line-length 60)
def funcion_larga(
    parametro_uno,
    parametro_dos,
    parametro_tres,
):
    return (
        parametro_uno
        + parametro_dos
        + parametro_tres
    )

# Formatear archivo
black archivo.py

# Formatear todo el proyecto
black .`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🚀 Herramientas para Despliegue</h3>
        <ul>
          <li><strong>Docker</strong> - Contenedorización</li>
          <li><strong>Heroku</strong> - Plataforma cloud</li>
          <li><strong>AWS Lambda</strong> - Serverless</li>
          <li><strong>DigitalOcean App Platform</strong> - Despliegue simple</li>
          <li><strong>PythonAnywhere</strong> - Hosting gratuito para Python</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>🐳 Docker para Python:</h4>
        <pre>
{`# Dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
CMD ["python", "app.py"]


# requirements.txt
Flask==2.0.3
requests==2.25.1

# Construir imagen
docker build -t mi-app .

# Ejecutar contenedor
docker run -p 5000:5000 mi-app`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>📈 Herramientas para Data Science</h3>
        <ul>
          <li><strong>Jupyter Notebook/Lab</strong> - Entorno interactivo</li>
          <li><strong>Google Colab</strong> - Jupyter en la nube (gratis)</li>
          <li><strong>Anaconda</strong> - Distribución científica completa</li>
          <li><strong>Streamlit</strong> - Apps web para datos</li>
          <li><strong>Dash</strong> - Dashboards interactivos</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>📓 Jupyter Notebook:</h4>
        <pre>
{`# Instalar
pip install jupyter

# Iniciar
jupyter notebook

# Crear notebook nuevo
# Ejecutar celdas con Shift+Enter

# Código en una celda
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('datos.csv')
df.head()

# Visualización
df.plot(kind='bar')
plt.show()`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🏋️ Ejercicios Prácticos</h3>
        <ol>
          <li><strong>Configura VS Code:</strong> Instala extensiones y configura el intérprete</li>
          <li><strong>Prueba Poetry:</strong> Crea un proyecto y agrega dependencias</li>
          <li><strong>Escribe tests:</strong> Crea tests unitarios con pytest</li>
          <li><strong>Formatea código:</strong> Usa black para formatear tus archivos</li>
          <li><strong>Contenedor Docker:</strong> Crea un Dockerfile simple para una app Python</li>
        </ol>
      </div>

      <p><strong>💡 Tip:</strong> Empieza con VS Code + extensiones básicas, y ve agregando herramientas según tus necesidades específicas.</p>
    </div>
  );
};

export default HerramientasPythonSlide;
