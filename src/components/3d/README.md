# Componentes 3D - Estructura Organizada por Historia

Esta carpeta contiene todos los componentes 3D de la aplicación, organizados por categorías históricas.

## 📁 Estructura de Carpetas

```
3d/
├── web-history/           # Historia de la Web
│   ├── javascript-scene/  # Escena del Auge de JavaScript (1995)
│   │   ├── JavaScriptScene.js # Componente de la escena JavaScript
│   │   └── index.js       # Export de la escena
│   ├── web-birth-scene/   # Escena del Nacimiento de la WWW (1991)
│   │   ├── WebBirthScene.js # Componente de la escena del nacimiento web
│   │   └── index.js       # Export de la escena
│   └── web-evolution/     # Evolución de la Web (2000-2024)
│       ├── web-journey/   # Componente principal del viaje por la web
│       │   ├── WebJourney.js  # Componente principal que combina todas las escenas
│       │   ├── WebJourney.css # Estilos del componente
│       │   └── index.js       # Export del componente
│       ├── web1-scene/    # Escena de la Web 1.0
│       │   ├── Web10Scene.js  # Componente de la escena Web 1.0
│       │   └── index.js       # Export de la escena
│       ├── web2-scene/    # Escena de la Web 2.0
│       │   ├── Web20Scene.js  # Componente de la escena Web 2.0
│       │   └── index.js       # Export de la escena
│       ├── web3-scene/    # Escena de la Web 3.0
│       │   ├── Web30Scene.js  # Componente de la escena Web 3.0
│       │   └── index.js       # Export de la escena
│       └── shared/        # Componentes compartidos para evolución web
│           ├── CameraController.js # Controlador de cámara para transiciones
│           └── index.js       # Exports de componentes compartidos
├── computing-history/     # Historia de la Computación
│   ├── ComputingCube.js   # Componente para eventos de computación
│   ├── IndustrialCog.js   # Componente para eventos industriales
│   └── WebGlobe.js        # Componente para eventos web iniciales
└── README.md             # Esta documentación
```

## 🎯 Funcionalidades por Categoría

### 🌐 Historia de la Web (WebJourney)
- **1991: Nacimiento de la WWW** - WebBirthScene (monitor NeXTcube con animación de escritura de código HTML, terminal simulada, red wireframe expandida, zoom cinematográfico interactivo)
- **1995: Auge de JavaScript** - JavaScriptScene (elementos interactivos clickables, consola simulada, código ejecutándose, efectos visuales dinámicos)
- **2000-2024: Evolución de la Web** - WebJourney (Web 1.0/2.0/3.0 combinadas)
  - **Web 1.0 (2000)**: Objetos estáticos con texto "HTML & CSS", líneas de conexión
  - **Web 2.0 (2005)**: Burbujas animadas representando redes sociales (Twitter, Facebook, YouTube)
  - **Web 3.0 (2020+)**: Cubos translúcidos con elementos de Blockchain, IA y VR

### 💻 Historia de la Computación
- **WebGlobe**: Representa eventos relacionados con la web inicial
- **ComputingCube**: Visualizaciones para hitos computacionales
- **IndustrialCog**: Elementos industriales y mecánicos históricos

### Características Técnicas Compartidas
- ✅ Animaciones GSAP suaves entre escenas
- ✅ Controles de cámara con OrbitControls
- ✅ Transiciones automáticas de posición de cámara
- ✅ Partículas y efectos visuales
- ✅ **Interactividad avanzada** en escena JavaScript

### 🎬 Características Cinematográficas
- **Zoom Dramático**: Escena 1991 inicia con zoom cinematográfico desde la distancia
- **Escritura de Código**: Animación línea-por-línea simulando la creación del HTML
- **Terminal Simulada**: Interfaz estilo años 90 con cursor parpadeante
- **Barra de Progreso**: Indicador visual del proceso de escritura
- **Iluminación Dinámica**: Red wireframe que se ilumina gradualmente

### Historia de la Web
```jsx
import WebGlobe from '../../components/3d/computing-history/WebGlobe';
import WebBirthScene from '../../components/3d/web-history/web-birth-scene';
import JavaScriptScene from '../../components/3d/web-history/javascript-scene';
import WebJourney from '../../components/3d/web-history/web-evolution/web-journey';

// En tu componente
<WebBirthScene />     // 1991 - Nacimiento de la WWW (monitor NeXTcube)
<JavaScriptScene />   // 1995 - Auge de JavaScript
<WebJourney />        // 2000-2024 - Evolución Web 1.0/2.0/3.0
```

### Historia de la Computación
```jsx
import WebGlobe from '../../components/3d/computing-history/WebGlobe';
import IndustrialCog from '../../components/3d/computing-history/IndustrialCog';

// En tu componente
<WebGlobe />
<ComputingCube />
<IndustrialCog />
```

## 📦 Dependencias

- `react-three/fiber` - Motor 3D para React
- `@react-three/drei` - Utilidades adicionales
- `gsap` - Animaciones
- `three` - Biblioteca Three.js

## 🎨 Expansión Futura

Esta estructura permite fácilmente:
- Agregar nuevas escenas a cada categoría histórica
- Crear componentes compartidos entre categorías si es necesario
- Mantener el código organizado y modular
- Escalar para futuras categorías históricas
