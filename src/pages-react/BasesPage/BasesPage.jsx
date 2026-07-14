import React, { useState, lazy, Suspense } from 'react';
import Header from '../../components/Header/Header';
import './BasesPage.css';

const BitScene = lazy(() => import('../../components/3d/bases/BitScene'));
const PixelGridScene = lazy(() => import('../../components/3d/bases/PixelGridScene'));
const LogicGateScene = lazy(() => import('../../components/3d/bases/LogicGateScene'));
const NetworkScene = lazy(() => import('../../components/3d/bases/NetworkScene'));
const SignalScene = lazy(() => import('../../components/3d/bases/SignalScene'));
const WiFiScene = lazy(() => import('../../components/3d/bases/WiFiScene'));
const MobileGenScene = lazy(() => import('../../components/3d/bases/MobileGenScene'));
const CloudScene = lazy(() => import('../../components/3d/bases/CloudScene'));
const EncryptionScene = lazy(() => import('../../components/3d/bases/EncryptionScene'));
const NeuralNetScene = lazy(() => import('../../components/3d/bases/NeuralNetScene'));

const LoadingFallback = () => (
  <div className="loading-3d">
    <div className="loading-spinner" />
    <p>Cargando escena 3D...</p>
  </div>
);

const categories = [
  {
    id: 'fundamentos',
    title: 'Fundamentos',
    description: 'Los bloques básicos de la informática.',
    color: '#F97316',
  },
  {
    id: 'conectividad',
    title: 'Conectividad',
    description: 'Cómo se comunican las máquinas.',
    color: '#38BDF8',
  },
  {
    id: 'tecnologias',
    title: 'Tecnologías Emergentes',
    description: 'Las innovaciones que definen el futuro.',
    color: '#10b981',
  },
];

const topics = [
  // ── FUNDAMENTOS ──
  {
    id: 'bits',
    category: 'fundamentos',
    title: 'Bits y Binario',
    icon: '🔢',
    color: '#F97316',
    description: 'La unidad más pequeña de información: el bit (0 o 1).',
    Scene: BitScene,
    content: {
      intro: 'Todo en una computadora se reduce a unos y ceros. Un bit es la unidad más pequeña de información digital — puede ser 0 (apagado) o 1 (encendido).',
      sections: [
        {
          title: '¿Qué es un Bit?',
          text: 'Un bit es como un interruptor: solo tiene dos estados. OFF (0) y ON (1). Todos los datos que procesa una computadora — texto, imágenes, sonido, video — están representados como secuencias de bits.',
          example: '10110010'
        },
        {
          title: 'Sistema Binario',
          text: 'El sistema binario (base 2) usa solo dos dígitos: 0 y 1. Cada posición representa una potencia de 2, de derecha a izquierda: 1, 2, 4, 8, 16, 32...',
          example: '1011 = 1×8 + 0×4 + 1×2 + 1×1 = 11'
        },
        {
          title: '¿Por qué Binario?',
          text: 'Los circuitos electrónicos son naturalmente binarios: un transistor puede estar encendido o apagado. Esto hace que el binario sea la forma más confiable de procesar información.',
          example: 'Transistor encendido = 1, apagado = 0'
        }
      ],
      funFact: 'El primer computador electrónico (ENIAC, 1945) usaba 18,000 tubos de vacío como "bits" — cada uno tan grande como un tubo de luz.'
    }
  },
  {
    id: 'representacion',
    category: 'fundamentos',
    title: 'Representación de Información',
    icon: '🎨',
    color: '#38BDF8',
    description: 'Cómo se convierten texto, imágenes y sonido en bits.',
    Scene: PixelGridScene,
    content: {
      intro: 'Para que una computadora pueda procesar cualquier tipo de información, todo debe convertirse en una secuencia de bits.',
      sections: [
        {
          title: 'Texto: ASCII y Unicode',
          text: 'Cada letra, número y símbolo tiene un código numérico. ASCII usaba 7 bits (128 caracteres). Unicode usa hasta 32 bits y puede representar más de 1 millón de caracteres, incluyendo emojis y caracteres de todos los idiomas.',
          example: 'A = 65 = 01000001'
        },
        {
          title: 'Imágenes: Píxeles',
          text: 'Una imagen digital es una cuadrícula de píxeles. Cada píxel tiene un color representado por valores RGB (Rojo, Verde, Azul), cada uno de 8 bits (0-255).',
          example: 'Rojo puro = RGB(255, 0, 0) = #FF0000'
        },
        {
          title: 'Sonido: Sampling',
          text: 'El sonido se mide miles de veces por segundo (sampling). Cada medición se guarda como un número de 16 bits. CD de audio: 44,100 muestras por segundo, 2 canales (estéreo).',
          example: '44,100 muestras/seg × 16 bits × 2 canales = 1.4 Mbps'
        }
      ],
      funFact: 'Una foto de smartphone de 12 megapíxeles ocupa ~36 MB porque cada píxel necesita 3 bytes (RGB).'
    }
  },
  {
    id: 'unidades',
    category: 'fundamentos',
    title: 'Unidades de Almacenamiento',
    icon: '📦',
    color: '#10b981',
    description: 'De bits a terabytes: cómo medimos la información.',
    Scene: null,
    content: {
      intro: 'Usamos unidades para expresar grandes cantidades de datos de forma práctica.',
      sections: [
        {
          title: 'Las Unidades',
          text: '1 Byte = 8 Bits. 1 Kilobyte (KB) = 1,024 Bytes. 1 Megabyte (MB) = 1,024 KB. 1 Gigabyte (GB) = 1,024 MB. 1 Terabyte (TB) = 1,024 GB.',
          example: '1 TB = 1,024 GB = 1,048,576 MB = 1,073,741,824 Bytes'
        },
        {
          title: 'Referencias Prácticas',
          text: 'Un email de texto ≈ 2 KB. Una canción MP3 ≈ 4 MB. Una película HD ≈ 4 GB. Un disco duro moderno ≈ 1-20 TB.',
          example: 'Un libro de 500 páginas en texto = ~1 MB'
        },
        {
          title: '¿Por qué 1024 y no 1000?',
          text: 'Los ingenieros usaron 1024 porque es 2^10, lo cual es natural para sistemas binarios. Las empresas de almacenamiento usan 1000 para que los números suenen más grandes.',
          example: '1 KB (binario) = 1,024 B vs 1 kB (decimal) = 1,000 B'
        }
      ],
      funFact: 'En 1956, el primer disco duro de IBM (RAMAC 305) pesaba más de 1 tonelada y almacenaba solo 5 MB — hoy cabría en tu bolsillo.'
    }
  },
  {
    id: 'logica',
    category: 'fundamentos',
    title: 'Lógica y CPU',
    icon: '⚙️',
    color: '#8b5cf6',
    description: 'Puertas lógicas y cómo una CPU procesa datos.',
    Scene: LogicGateScene,
    content: {
      intro: 'Las puertas lógicas son los bloques fundamentales de toda computadora. Combinadas, pueden realizar cualquier operación matemática.',
      sections: [
        {
          title: 'Puertas Lógicas Básicas',
          text: 'AND: retorna 1 solo si ambos inputs son 1. OR: retorna 1 si al menos un input es 1. NOT: invierte el input (0→1, 1→0). XOR: retorna 1 si los inputs son diferentes.',
          example: 'AND: 1 AND 1 = 1 | OR: 1 OR 0 = 1 | NOT: NOT 1 = 0'
        },
        {
          title: 'La CPU',
          text: 'La Unidad Central de Procesamiento (CPU) contiene millones de puertas lógicas organizadas en: ALU (unidad aritmético-lógica), registros (memoria rápida) y unidad de control.',
          example: 'Un chip moderno tiene ~100 mil millones de transistores'
        },
        {
          title: 'Ciclo de Instrucción',
          text: 'La CPU ejecuta un ciclo infinito: Fetch (obtener instrucción) → Decode (decodificar) → Execute (ejecutar) → Store (guardar resultado). Esto ocurre miles de millones de veces por segundo.',
          example: 'Un procesador a 3 GHz = 3,000 millones de ciclos por segundo'
        }
      ],
      funFact: 'El primer microprocesador (Intel 4004, 1971) tenía 2,300 transistores. Un Apple M3 tiene 25,000 millones — 10 millones de veces más.'
    }
  },
  // ── CONECTIVIDAD ──
  {
    id: 'redes',
    category: 'conectividad',
    title: 'Redes Básicas',
    icon: '🌐',
    color: '#ec4899',
    description: 'Cómo viaja la información a través de internet.',
    Scene: NetworkScene,
    content: {
      intro: 'Internet es una red global de computadoras conectadas. Cuando visitas un sitio web, tu solicitud viaja por todo el mundo en milisegundos.',
      sections: [
        {
          title: 'Paquetes de Datos',
          text: 'Los datos se dividen en paquetes pequeños, cada uno con dirección de origen y destino. Los paquetes pueden tomar rutas diferentes y se reensamblan al llegar.',
          example: 'Un email se divide en ~50 paquetes de 1,500 bytes cada uno'
        },
        {
          title: 'Direcciones IP',
          text: 'Cada dispositivo en internet tiene una dirección IP (IPv4: 4 números de 0-255 separados por puntos). IPv6 usa 128 bits para abordar la escasez de direcciones.',
          example: 'IPv4: 192.168.1.1 | IPv6: 2001:0db8:85a3::8a2e:0370:7334'
        },
        {
          title: 'Modelo Cliente-Servidor',
          text: 'Tu navegador (cliente) envía una solicitud a un servidor web. El servidor procesa la solicitud y retorna la página web. Esto usa el protocolo HTTP/HTTPS.',
          example: 'GET https://ejemplo.com → 200 OK (página HTML)'
        }
      ],
      funFact: 'Un ping de ida y vuelta entre Nueva York y Tokio toma ~150 milisegundos — la luz viaja ~30,000 km en ese tiempo.'
    }
  },
  {
    id: 'senales',
    category: 'conectividad',
    title: 'Señales y Telecomunicaciones',
    icon: '📡',
    color: '#F97316',
    description: 'Analógico vs digital, frecuencia y modulación.',
    Scene: SignalScene,
    content: {
      intro: 'Las señales son la base de toda comunicación. Viajan por el aire, cables o fibra óptica llevando información desde un punto a otro.',
      sections: [
        {
          title: 'Señal Analógica vs Digital',
          text: 'La señal analógica es continua — varía suavemente en el tiempo (como una voz humana). La señal digital usa valores discretos (0 y 1), lo que la hace más resistente al ruido y más fácil de procesar.',
          example: 'Analógica: onda sinusoidal continua | Digital: pulsos 01010110'
        },
        {
          title: 'Frecuencia y Espectro',
          text: 'La frecuencia mide cuántas oscilaciones por segundo tiene una señal (Hertz). El espectro electromagnético va desde ondas de radio (kHz) hasta rayos gamma (THz). Cada rango tiene un uso específico.',
          example: 'FM: 88-108 MHz | WiFi: 2.4/5 GHz | GPS: 1.5 GHz'
        },
        {
          title: 'Modulación',
          text: 'La modulación es la técnica de adaptar una señal para transmitirla. AM (amplitud) varía la altura de la onda. FM (frecuencia) varía la velocidad de oscilación. Ambas permiten enviar información por el aire.',
          example: 'AM: varía amplitud | FM: varía frecuencia | PM: varía fase'
        }
      ],
      funFact: 'La primera transmisión de radio de Marconi (1895) viajó solo 30 metros. Hoy, las señales WiFi alcanzan 100 metros y los satélites cubren todo el planeta.'
    }
  },
  {
    id: 'wifi',
    category: 'conectividad',
    title: 'WiFi y Conexiones Inalámbricas',
    icon: '📶',
    color: '#38BDF8',
    description: 'Cómo funciona WiFi: bandas, protocolos y seguridad.',
    Scene: WiFiScene,
    content: {
      intro: 'WiFi es la tecnología que nos permite conectar dispositivos a internet sin cables, usando ondas de radio.',
      sections: [
        {
          title: 'Bandas de Frecuencia',
          text: 'WiFi opera en 2.4 GHz (mayor alcance, más interferencia) y 5 GHz (mayor velocidad, menor alcance). WiFi 6E agrega la banda de 6 GHz con más canales disponibles.',
          example: '2.4 GHz: ~70 m alcance, ~150 Mbps | 5 GHz: ~35 m, ~500 Mbps'
        },
        {
          title: 'Protocolos 802.11',
          text: 'Cada generación de WiFi mejora velocidad y eficiencia: 802.11b (11 Mbps) → 802.11g (54 Mbps) → 802.11n (600 Mbps) → 802.11ac (3.5 Gbps) → 802.11ax/WiFi 6 (9.6 Gbps).',
          example: 'WiFi 6 puede conectar 100+ dispositivos simultáneamente'
        },
        {
          title: 'Seguridad WiFi',
          text: 'WEP (casi roto) → WPA (mejor) → WPA2 (estándar actual) → WPA3 (más seguro). Siempre usa contraseña fuerte y cifrado WPA2/WPA3 para proteger tu red.',
          example: 'WPA3 resistente a ataques de fuerza bruta'
        }
      ],
      funFact: 'El nombre "WiFi" no significa "Wireless Fidelity" — es un nombre comercial de la Wi-Fi Alliance, similar a como "Bluetooth" viene del rey vikingo Harald Bluetooth.'
    }
  },
  {
    id: 'movil',
    category: 'conectividad',
    title: 'Evolución Móvil (1G→5G)',
    icon: '📱',
    color: '#10b981',
    description: 'Del analógico al IoT: las generaciones de red móvil.',
    Scene: MobileGenScene,
    content: {
      intro: 'Cada generación de red móvil trajo innovaciones que cambiaron cómo nos comunicamos, trabajamos y vivimos.',
      sections: [
        {
          title: '1G — Analógico (1980s)',
          text: 'Solo voz, sin cifrado. Los teléfonos eran grandes y costosos. Primer servicio: NTT en Japón (1979). En EE.UU., AMPS fue el estándar predominante.',
          example: 'Nokia 1011 (1992): primer GSM — ya era 2G'
        },
        {
          title: '2G — Digital y SMS (1990s)',
          text: 'Digitalización permitió SMS y mejor calidad de voz. GSM (Europa) y CDMA (EE.UU.) compitieron. Roaming internacional. La era del Nokia 3310.',
          example: 'GSM: 9.6 Kbps | GPRS (2.5G): 56 Kbps | EDGE (2.75G): 236 Kbps'
        },
        {
          title: '3G — Internet Móvil (2000s)',
          text: 'Permitió navegar web, email y video en el teléfono. UMTS y HSPA. Aparecieron los smartphones. El iPhone (2007) explotó el potencial de 3G.',
          example: 'UMTS: 2 Mbps | HSPA+: 42 Mbps'
        },
        {
          title: '4G — Streaming (2010s)',
          text: 'Velocidades de 100+ Mbps. LTE permitió streaming HD, videoconferencias y apps complejas. La era de Netflix, Uber y TikTok.',
          example: 'LTE: 100 Mbps | LTE-A: 1 Gbps'
        },
        {
          title: '5G — IoT y Latencia Ultra (2020s)',
          text: 'Velocidades de 1-10 Gbps, latencia de 1ms. Conecta millones de dispositivos IoT por km². Habilita ciudades inteligentes, autos autónomos y realidad aumentada masiva.',
          example: '5G: 10 Gbps | Latencia: 1ms | Dispositivos: 1M/km²'
        }
      ],
      funFact: 'En 2024, hay más de 5,500 millones de suscripciones móviles en el mundo — más de 2/3 de la población humana.'
    }
  },
  // ── TECNOLOGÍAS ──
  {
    id: 'cloud',
    category: 'tecnologias',
    title: 'Cloud Computing',
    icon: '☁️',
    color: '#8b5cf6',
    description: 'Servidores remotos, virtualización y escalabilidad.',
    Scene: CloudScene,
    content: {
      intro: 'El cloud computing permite acceder a recursos de computación (servidores, almacenamiento, bases de datos) por internet, sin poseer el hardware.',
      sections: [
        {
          title: 'Modelos de Servicio',
          text: 'IaaS (Infrastructure as a Service): máquinas virtuales. PaaS (Platform as a Service): entorno de desarrollo gestionado. SaaS (Software as a Service): aplicaciones listas para usar.',
          example: 'IaaS: AWS EC2 | PaaS: Heroku | SaaS: Gmail, Netflix'
        },
        {
          title: 'Virtualización',
          text: 'Un servidor físico puede ejecutar múltiples máquinas virtuales aisladas. Los contenedores (Docker) van más allá: comparten el mismo kernel pero aíslan la aplicación.',
          example: 'Un servidor con 64 GB RAM puede correr 32 contenedores de 2 GB cada uno'
        },
        {
          title: 'Proveedores Principales',
          text: 'AWS (Amazon), Azure (Microsoft) y GCP (Google) dominan el mercado. Ofrecen cientos de servicios: computación, bases de datos, IA, almacenamiento, red y más.',
          example: 'AWS tiene 200+ servicios en 30+ regiones globales'
        }
      ],
      funFact: 'Si AWS fuera un país, sería el mayor consumidor de electricidad del mundo — consume tanta energía como algunos países medianos.'
    }
  },
  {
    id: 'seguridad',
    category: 'tecnologias',
    title: 'Ciberseguridad Básica',
    icon: '🔒',
    color: '#ef4444',
    description: 'Encriptación, autenticación y amenazas comunes.',
    Scene: EncryptionScene,
    content: {
      intro: 'La ciberseguridad protege datos, sistemas y redes de ataques digitales. Es una carrera en constante crecimiento con alta demanda.',
      sections: [
        {
          title: 'Cifrado (Encriptación)',
          text: 'Convierte datos legibles en código ilegible sin la clave. Cifrado simétrico (misma clave para cifrar y descifrar) y asimétrico (clave pública + privada). HTTPS usa ambos.',
          example: 'César: HOLA → KROD (+3) | AES-256: 2^256 combinaciones posibles'
        },
        {
          title: 'Hashing',
          text: 'Transforma datos en una huella digital de longitud fija. No se puede revertir. Se usa para verificar contraseñas: el sistema guarda el hash, no la contraseña original.',
          example: 'SHA-256("password") = 5e884898da28047151d0e56f8dc... (64 caracteres)'
        },
        {
          title: 'Amenazas Comunes',
          text: 'Phishing (emails falsos), malware (software malicioso), ransomware (secuestro de datos), DDoS (saturar un servidor), SQL injection (inyección en bases de datos).',
          example: '90% de los breaches comienzan con phishing'
        }
      ],
      funFact: 'La contraseña más común del mundo sigue siendo "123456". Usar un gestor de contraseñas y autenticación de dos factores (2FA) es esencial.'
    }
  },
  {
    id: 'ia',
    category: 'tecnologias',
    title: 'Inteligencia Artificial',
    icon: '🤖',
    color: '#eab308',
    description: 'Machine Learning, redes neuronales y LLMs.',
    Scene: NeuralNetScene,
    content: {
      intro: 'La IA permite que las máquinas aprendan de datos, reconozcan patrones y tomen decisiones — cada vez más como los humanos.',
      sections: [
        {
          title: 'Machine Learning',
          text: 'En lugar de programar reglas, se alimenta al algoritmo con miles de ejemplos y aprende patrones. Tipos: supervisado (con etiquetas), no supervisado (sin etiquetas) y refuerzo (recompensas).',
          example: 'Un modelo de ML analiza 1M de fotos para reconocer gatos'
        },
        {
          title: 'Redes Neuronales',
          text: 'Inspiradas en el cerebro humano. Capas de "neuronas" artificiales que procesan datos. Cada conexión tiene un "peso" que se ajusta durante el entrenamiento. Deep learning = redes con muchas capas.',
          example: 'GPT-4 tiene ~1.7 trillones de parámetros'
        },
        {
          title: 'LLMs y ChatGPT',
          text: 'Los Large Language Models se entrenan con billones de palabras. Predicen la siguiente palabra en una secuencia. Pueden generar texto, código, traducir y razonar — aunque no "piensan" como humanos.',
          example: 'Entrenar GPT-4 costó ~$100 millones en computación'
        }
      ],
      funFact: 'AlphaGo de DeepMind derrotó al campeón mundial de Go en 2016 — un juego con más combinaciones que átomos en el universo observable.'
    }
  },
];

const StorageAnimation = () => {
  const units = [
    { name: 'Bit', size: '0/1', width: 8, color: '#F97316' },
    { name: 'Byte', size: '8 bits', width: 40, color: '#F97316' },
    { name: 'KB', size: '1,024 B', width: 80, color: '#38BDF8' },
    { name: 'MB', size: '1,024 KB', width: 140, color: '#10b981' },
    { name: 'GB', size: '1,024 MB', width: 220, color: '#8b5cf6' },
    { name: 'TB', size: '1,024 GB', width: 320, color: '#ec4899' }
  ];

  return (
    <div className="storage-animation">
      {units.map((unit, i) => (
        <div key={unit.name} className="storage-bar" style={{ animationDelay: `${i * 0.15}s` }}>
          <div className="storage-bar-fill" style={{ width: `${unit.width}px`, background: unit.color }} />
          <span className="storage-bar-label">{unit.name}</span>
          <span className="storage-bar-size">{unit.size}</span>
        </div>
      ))}
    </div>
  );
};

const TopicDetail = ({ topic, onBack }) => {
  const Scene = topic.Scene;

  return (
    <div className="topic-detail">
      <button onClick={onBack} className="back-btn">← Volver a Bases</button>
      <div className="topic-detail-header">
        <span className="topic-detail-icon" style={{ color: topic.color }}>{topic.icon}</span>
        <h2>{topic.title}</h2>
      </div>
      <p className="topic-detail-intro">{topic.content.intro}</p>

      {Scene && (
        <div className="topic-3d-section">
          <Suspense fallback={<LoadingFallback />}>
            <Scene />
          </Suspense>
        </div>
      )}

      {topic.id === 'unidades' && <StorageAnimation />}

      <div className="topic-sections">
        {topic.content.sections.map((section, i) => (
          <div key={i} className="topic-section-card">
            <h3>{section.title}</h3>
            <p>{section.text}</p>
            {section.example && (
              <div className="topic-example">
                <code>{section.example}</code>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="topic-fun-fact">
        <h4>💡 Dato Curioso</h4>
        <p>{topic.content.funFact}</p>
      </div>
    </div>
  );
};

const BasesPage = () => {
  const [view, setView] = useState('hub');
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
    setView('detail');
  };

  const handleGoBack = () => {
    setView('hub');
    setSelectedTopic(null);
  };

  return (
    <div className="page-container">
      <Header />
      <main className="main-content-bases">
        {view === 'hub' ? (
          <>
            <div className="bases-header">
              <h2>💡 Bases de la Informática</h2>
              <p>Los fundamentos de cómo funciona el mundo digital.</p>
            </div>
            {categories.map(category => {
              const categoryTopics = topics.filter(t => t.category === category.id);
              if (categoryTopics.length === 0) return null;
              return (
                <div key={category.id} className="bases-category">
                  <div className="bases-category-header" style={{ '--cat-color': category.color }}>
                    <h3>{category.title}</h3>
                    <p>{category.description}</p>
                  </div>
                  <div className="bases-topics-grid">
                    {categoryTopics.map(topic => (
                      <div
                        key={topic.id}
                        className="bases-topic-card"
                        onClick={() => handleSelectTopic(topic)}
                        style={{ '--topic-color': topic.color }}
                      >
                        <div className="bases-topic-icon">{topic.icon}</div>
                        <h3>{topic.title}</h3>
                        <p>{topic.description}</p>
                        <span className="bases-topic-explore">Explorar →</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <TopicDetail topic={selectedTopic} onBack={handleGoBack} />
        )}
      </main>
    </div>
  );
};

export default BasesPage;
