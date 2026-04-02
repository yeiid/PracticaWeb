import React from 'react';
import styles from './PythonSlides.module.css';

const InstalacionPythonSlide = () => {
  return (
    <div className={styles.slide}>
      <h2>Instalación y Configuración</h2>
      <p>Python es fácil de instalar en cualquier sistema operativo.</p>

      <div className={styles.highlight}>
        <h3>📥 Instalación Oficial</h3>
        <ul>
          <li><strong>Sitio oficial:</strong> <code>python.org</code></li>
          <li><strong>Versión recomendada:</strong> Python 3.8+</li>
          <li><strong>Descarga directa</strong> para Windows/macOS</li>
          <li><strong>Gestor de paquetes</strong> en Linux</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>💻 Instalación en Windows:</h4>
        <pre>
{`# 1. Ir a python.org
# 2. Descargar el instalador
# 3. Ejecutar el instalador
# 4. ✅ Marcar "Add Python to PATH"
# 5. Verificar instalación:
python --version
pip --version`}
        </pre>
      </div>

      <div className={styles.example}>
        <h4>🐧 Instalación en Linux (Ubuntu/Debian):</h4>
        <pre>
{`# Actualizar repositorios
sudo apt update

# Instalar Python 3
sudo apt install python3

# Instalar pip (gestor de paquetes)
sudo apt install python3-pip

# Verificar instalación
python3 --version
pip3 --version`}
        </pre>
      </div>

      <div className={styles.example}>
        <h4>🍎 Instalación en macOS:</h4>
        <pre>
{`# Opción 1: Descarga oficial de python.org
# Opción 2: Usar Homebrew
brew install python3

# Verificar instalación
python3 --version
pip3 --version`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🔧 Entornos Virtuales</h3>
        <p><strong>¡Imprescindible!</strong> para aislar proyectos</p>
        <pre>
{`# Crear entorno virtual
python3 -m venv mi_proyecto

# Activar entorno (Windows)
mi_proyecto\\Scripts\\activate

# Activar entorno (Linux/macOS)
source mi_proyecto/bin/activate

# Desactivar
deactivate

# Instalar dependencias en el entorno
pip install requests numpy pandas`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>📦 Gestores de Paquetes</h3>
        <ul>
          <li><strong>pip</strong> - Gestor oficial (viene con Python)</li>
          <li><strong>conda</strong> - Para entornos científicos</li>
          <li><strong>poetry</strong> - Moderno y avanzado</li>
          <li><strong>pipenv</strong> - Combina virtualenv + pip</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>⚙️ Configuración de VS Code:</h4>
        <ul>
          <li><strong>Instalar extensión</strong> "Python" de Microsoft</li>
          <li><strong>Configurar intérprete</strong> en el proyecto</li>
          <li><strong>Extensiones recomendadas:</strong>
            <ul>
              <li>Python Docstring Generator</li>
              <li>Bracket Pair Colorizer</li>
              <li>Python Indent</li>
            </ul>
          </li>
        </ul>
      </div>

      <div className={styles.highlight}>
        <h4>🏃‍♂️ Primer Programa</h4>
        <pre>
{`# Crear archivo hola.py
print("¡Hola, Python!")

# Ejecutar
python hola.py

# O ejecutar directamente
python3 -c "print('¡Hola desde línea de comandos!')" `}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🔍 IDEs y Editores Recomendados</h3>
        <ul>
          <li><strong>VS Code</strong> - Gratuito, potente, extensible</li>
          <li><strong>PyCharm</strong> - IDE profesional (Community edition gratis)</li>
          <li><strong>Jupyter Notebook</strong> - Para análisis interactivo</li>
          <li><strong>Spyder</strong> - Para análisis de datos</li>
          <li><strong>Thonny</strong> - Simple para principiantes</li>
        </ul>
      </div>

      <p><strong>💡 Tip:</strong> Siempre usa entornos virtuales para mantener tus proyectos organizados y evitar conflictos entre dependencias.</p>
    </div>
  );
};

export default InstalacionPythonSlide;
