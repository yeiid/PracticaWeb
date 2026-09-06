import React, { useState, lazy, Suspense } from 'react';
import Header from '../../components/Header/Header';
import './HistoryPage.css';

const JavaScriptScene = lazy(() => import('../../components/3d/web-history/javascript-scene/JavaScriptScene'));
const WebBirthScene = lazy(() => import('../../components/3d/web-history/web-birth-scene/WebBirthScene'));
const WWWProposalScene = lazy(() => import('../../components/3d/web-history/WWWProposalScene'));
const MosaicScene = lazy(() => import('../../components/3d/web-history/MosaicScene'));
const CSSScene = lazy(() => import('../../components/3d/web-history/CSSScene'));
const Web10Scene = lazy(() => import('../../components/3d/web-history/Web10Scene'));
const Web20Scene = lazy(() => import('../../components/3d/web-history/Web20Scene'));
const HTML5Scene = lazy(() => import('../../components/3d/web-history/HTML5Scene'));
const ResponsiveScene = lazy(() => import('../../components/3d/web-history/ResponsiveScene'));
const ES6Scene = lazy(() => import('../../components/3d/web-history/ES6Scene'));
const Web30Scene = lazy(() => import('../../components/3d/web-history/Web30Scene'));
const BabbageScene = lazy(() => import('../../components/3d/computing-history/pioneers/BabbageScene'));
const LovelaceScene = lazy(() => import('../../components/3d/computing-history/pioneers/LovelaceScene'));
const TuringScene = lazy(() => import('../../components/3d/computing-history/pioneers/TuringScene'));
const AtanasoffScene = lazy(() => import('../../components/3d/computing-history/pioneers/AtanasoffScene'));
const HopperScene = lazy(() => import('../../components/3d/computing-history/pioneers/HopperScene'));
const BernersLeeScene = lazy(() => import('../../components/3d/computing-history/pioneers/BernersLeeScene'));
const PascalScene = lazy(() => import('../../components/3d/computing-history/pioneers/PascalScene'));
const PersonalComputerScene = lazy(() => import('../../components/3d/computing-history/pioneers/PCScene'));
const MicroprocesadorScene = lazy(() => import('../../components/3d/computing-history/pioneers/MicroprocesadorScene'));
const PascalCharacter = lazy(() => import('../../components/3d/personajes/PascalCharacter'));
const BabbageCharacter = lazy(() => import('../../components/3d/personajes/BabbageCharacter'));
const LovelaceCharacter = lazy(() => import('../../components/3d/personajes/LovelaceCharacter'));
const TuringCharacter = lazy(() => import('../../components/3d/personajes/TuringCharacter'));
const HopperCharacter = lazy(() => import('../../components/3d/personajes/HopperCharacter'));
const RitchieCharacter = lazy(() => import('../../components/3d/personajes/RitchieCharacter'));
const JobsCharacter = lazy(() => import('../../components/3d/personajes/JobsCharacter'));
const TorvaldsCharacter = lazy(() => import('../../components/3d/personajes/TorvaldsCharacter'));
const VanRossumCharacter = lazy(() => import('../../components/3d/personajes/VanRossumCharacter'));
const SteamEngineScene = lazy(() => import('../../components/3d/industrial-history/SteamEngineScene'));
const SpinningJennyScene = lazy(() => import('../../components/3d/industrial-history/SpinningJennyScene'));
const CottonGinScene = lazy(() => import('../../components/3d/industrial-history/CottonGinScene'));
const LocomotiveScene = lazy(() => import('../../components/3d/industrial-history/LocomotiveScene'));
const TelegraphScene = lazy(() => import('../../components/3d/industrial-history/TelegraphScene'));
const SafetyLampScene = lazy(() => import('../../components/3d/industrial-history/SafetyLampScene'));
const LightBulbScene = lazy(() => import('../../components/3d/industrial-history/LightBulbScene'));
const TelephoneScene = lazy(() => import('../../components/3d/industrial-history/TelephoneScene'));
const AutomobileScene = lazy(() => import('../../components/3d/industrial-history/AutomobileScene'));
const AssemblyLineScene = lazy(() => import('../../components/3d/industrial-history/AssemblyLineScene'));

const LoadingFallback = () => (
  <div className="loading-3d">
    <div className="loading-spinner" />
    <p>Cargando escena 3D...</p>
  </div>
);

const TimelineMap = ({ events, selectedId, onSelect }) => {
  return (
    <div className="timeline-map">
      <div className="timeline-map-track" />
      {events.map((event, index) => (
        <div
          key={event.id}
          className={`timeline-map-node ${selectedId === event.id ? 'active' : ''}`}
          onClick={() => onSelect(event.id)}
          style={{ left: events.length > 1 ? `${(index / (events.length - 1)) * 100}%` : '0%' }}
        >
          <div className="timeline-map-dot" />
          <span className="timeline-map-year">{event.year}</span>
          <span className="timeline-map-icon">{event.icon}</span>
        </div>
      ))}
    </div>
  );
};

const CharacterTimeline = ({ characters, selectedId, onSelect }) => {
  return (
    <div className="character-timeline">
      <div className="character-timeline-track" />
      {characters.map((char, index) => (
        <div
          key={char.id}
          className={`character-node ${selectedId === char.id ? 'active' : ''}`}
          onClick={() => onSelect(char.id)}
        >
          <div className="character-avatar-mini">
            <span>{char.icon}</span>
          </div>
          <div className="character-node-info">
            <span className="character-node-name">{char.name}</span>
            <span className="character-node-year">{char.year}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const CharacterInfoTable = ({ info }) => {
  if (!info) return null;
  const rows = [
    info.birth && { label: 'Nacimiento', value: info.birth },
    info.death && { label: 'Fallecimiento', value: info.death },
    info.place && { label: 'Lugar', value: info.place },
    info.field && { label: 'Campo', value: Array.isArray(info.field) ? info.field.join(', ') : info.field },
    info.knownFor && { label: 'Conocid@ por', value: info.knownFor },
    info.organization && { label: 'Organización', value: info.organization },
    info.education && { label: 'Formación', value: info.education },
    info.awards && { label: 'Reconocimientos', value: info.awards }
  ].filter(Boolean);
  if (rows.length === 0) return null;
  return (
    <div className="character-info-table">
      {rows.map((row, i) => (
        <div key={i} className="character-info-row">
          <span className="character-info-label">{row.label}</span>
          <span className="character-info-value">{row.value}</span>
        </div>
      ))}
    </div>
  );
};

const CharacterCard = ({ character }) => {
  if (!character) return null;
  const Scene = character.CharacterScene;
  const years = character.year ? `${character.year}${character.deathYear ? ` — ${character.deathYear}` : ' —'}` : '';
  return (
    <div className="character-detail-card">
      <div className="character-detail-header">
        <div className="character-avatar-large">
          <span>{character.icon}</span>
        </div>
        <div className="character-detail-info">
          <h3>{character.name}</h3>
          <div className="character-detail-meta">
            <span className="character-years">{character.year}</span>
            {character.epoca && (
              <>
                <span className="character-sep">·</span>
                <span className="character-era">{character.epoca}</span>
              </>
            )}
            {character.role && (
              <>
                <span className="character-sep">·</span>
                <span className="character-role">{character.role}</span>
              </>
            )}
            {character.nationality && (
              <>
                <span className="character-sep">·</span>
                <span className="character-nationality">{character.nationality}</span>
              </>
            )}
          </div>
        </div>
      </div>
      {character.quote && (
        <blockquote className="character-quote">"{character.quote}"</blockquote>
      )}
      <p className="character-bio">{character.bio}</p>
      {character.info && (
        <>
          <h4 className="character-ficha-title">Ficha técnica</h4>
          <CharacterInfoTable info={character.info} />
        </>
      )}
      {Scene && (
        <div className="character-scene-section">
          <h4 className="character-scene-title">{character.sceneTitle}</h4>
          <Suspense fallback={<LoadingFallback />}>
            <Scene name={character.name} years={years} />
          </Suspense>
        </div>
      )}
    </div>
  );
};

const historyData = {
  categories: [
    {
      id: 'computing',
      title: 'Historia de la Computación',
      description: 'Los pioneros que construyeron la era digital.',
      icon: '💻',
      available: true
    },
    {
      id: 'personajes',
      title: 'Personajes de la Tecnología',
      description: 'Los visionarios que cambiaron el mundo.',
      icon: '👤',
      available: true
    },
    {
      id: 'industrial',
      title: 'La Revolución Industrial',
      description: 'Cómo la mecanización transformó la humanidad.',
      icon: '🏭',
      available: true
    },
    {
      id: 'web',
      title: 'Historia de la Web',
      description: 'Los hitos que dieron forma a la World Wide Web.',
      icon: '🌐',
      available: true
    }
  ],
  events: {
    computing: [
      {
        id: 'pascal', year: '1642',
        title: 'La Pascalina — Primer Intento de Automatizar el Cálculo',
        description: 'Blaise Pascal, con solo 19 años, inventa la Pascalina para ayudar a su padre con los cálculos fiscales.',
        icon: '🔢',
        milestone: { title: '¿Por qué es importante?', text: 'La Pascalina demostró que las operaciones matemáticas podían ser ejecutadas por una máquina. Usaba engranajes interconectados donde cada posición representaba un dígito del 0 al 9.', facts: ['Pascal construyó alrededor de 50 prototipos', 'Cada unidad costía el equivalente a varios años de salario', 'Influyó a Leibniz y Babbage siglos después'] },
        pioneer: { name: 'Blaise Pascal', years: '1623 — 1662', role: 'Matemático, Físico y Filósofo', nationality: '🇫🇷 Francés', icon: '🔢', quote: 'El corazón tiene razones que la razón no entiende.', bio: 'Genio multifacético que contribuyó en matemáticas, física y filosofía. Su Pascalina fue el primer paso hacia la automatización del cálculo.', inventionTitle: 'La Pascalina', PioneerScene: PascalScene }
      },
      {
        id: 'babbage', year: '1837',
        title: 'La Máquina Analítica — El Primer Diseño de una Computadora',
        description: 'Charles Babbage diseña la Analytical Engine, la primera máquina que integraba unidad de memoria, procesamiento y entrada/salida.',
        icon: '⚙️',
        milestone: { title: '¿Por qué es importante?', text: 'Contenía todos los componentes fundamentales de una computadora moderna: la "Mill" (CPU), la "Store" (memoria), tarjetas perforadas para entrada y una impresora para salida.', facts: ['Usaba tarjetas perforadas inspiradas en el telar de Jacquard', 'Podía ejecutar bucles condicionales y subrutinas', 'Nunca se construyó completamente en vida de Babbage'] },
        pioneer: { name: 'Charles Babbage', years: '1791 — 1871', role: 'Matemático e Ingeniero Mecánico', nationality: '🇬🇧 Británico', icon: '⚙️', quote: 'Los errores nos muestran exactamente dónde la lógica falla.', bio: 'Considerado el "padre de la computación", su Analytical Engine fue el primer diseño completo de una computadora programable.', inventionTitle: 'La Difference Engine', PioneerScene: BabbageScene }
      },
      {
        id: 'lovelace', year: '1843',
        title: 'Ada Lovelace — La Primera Programadora de la Historia',
        description: 'Ada Lovelace escribe el primer algoritmo diseñado para ser procesado por una máquina.',
        icon: '📝',
        milestone: { title: '¿Por qué es importante?', text: 'Sus Notas sobre la Máquina Analítica incluyen el primer programa de computadora y una reflexión profunda sobre los límites de la computación.', facts: ['Su algoritmo calculaba números de Bernoulli', 'Previo 100 años que las computadoras pudieran crear música', 'El lenguaje "Ada" del Departamento de Defensa lleva su nombre'] },
        pioneer: { name: 'Ada Lovelace', years: '1815 — 1852', role: 'Matemática y Escritora', nationality: '🇬🇧 Británica', icon: '📝', quote: 'La Máquina Analítica teje patrones algebraicos igual que el telar de Jacquard teje flores y hojas.', bio: 'Visionaria que entendió el potencial de las máquinas computacionales antes que nadie.', inventionTitle: 'Tarjetas Perforadas', PioneerScene: LovelaceScene }
      },
      {
        id: 'turing', year: '1936',
        title: 'La Máquina de Turing — Los Límites de lo Computable',
        description: 'Alan Turing define matemáticamente qué puede y qué no puede ser computado.',
        icon: '🧮',
        milestone: { title: '¿Por qué es importante?', text: 'Su máquina hipotética definió formalmente el concepto de "algoritmo" y estableció los límites fundamentales de la computación.', facts: ['Puede simular cualquier algoritmo conceivable', 'Demostró que existen problemas irresolubles', 'Durante la WWII descifró Enigma'] },
        pioneer: { name: 'Alan Turing', years: '1912 — 1954', role: 'Matemático y Criptoanalista', nationality: '🇬🇧 Británico', icon: '🧮', quote: 'A veces es las personas las que nadie imagina cosas que nadie ha pensado.', bio: 'Padre de la ciencia de la computación e inteligencia artificial. Su trabajo en Bletchley Park fue crucial en la WWII.', inventionTitle: 'La Máquina de Turing', PioneerScene: TuringScene }
      },
      {
        id: 'atanasoff', year: '1942',
        title: 'El ABC — Primer Computador Electrónico Digital',
        description: 'John Vincent Atanasoff construye el primer dispositivo en usar electrónica digital y aritmética binaria.',
        icon: '⚡',
        milestone: { title: '¿Por qué es importante?', text: 'Demostró que la electrónica digital podía reemplazar las máquinas mecánicas para procesamiento de datos.', facts: ['Usaba 300 tubos de vacío para procesamiento digital', 'Procesaba datos en binario', 'En 1973 un tribunal lo declaró inventor del computador digital'] },
        pioneer: { name: 'John Vincent Atanasoff', years: '1903 — 1995', role: 'Físico e Ingeniero', nationality: '🇺🇸 Estadounidense', icon: '⚡', quote: 'La creatividad es ver lo que todos ven y pensar lo que nadie piensa.', bio: 'Construyó el primer computador digital electrónico con Clifford Berry en la Universidad de Iowa.', inventionTitle: 'El ABC Computer', PioneerScene: AtanasoffScene }
      },
      {
        id: 'eniac', year: '1945',
        title: 'ENIAC — El Gigante Electrónico',
        description: 'El primer computador electrónico de propósito general: 18,000 tubos de vacío, 30 toneladas.',
        icon: '💡',
        milestone: { title: '¿Por qué es importante?', text: 'Calculaba 5,000 sumas por segundo, 1,000 veces más rápido que cualquier calculadora humana.', facts: ['Pesaba 30 toneladas y ocupaba 167m²', 'Tenía 18,000 tubos de vacío', 'Sus seis programadoras fueron las primeras de la historia'] },
        pioneer: { name: 'John Mauchly & J. Presper Eckert', years: '1907-1980 / 1919-1995', role: 'Ingenieros Electrónicos', nationality: '🇺🇸 Estadounidenses', icon: '💡', quote: 'No teníamos precedentes. Cada circuito era un descubrimiento.', bio: 'Diseñaron juntos el ENIAC, la primera computadora electrónica de propósito general.', inventionTitle: 'El ENIAC', PioneerScene: AtanasoffScene }
      },
      {
        id: 'hopper', year: '1952',
        title: 'Grace Hopper — El Primer Compilador y COBOL',
        description: 'Grace Hopper desarrolla el primer compilador, permitiendo programar en inglés.',
        icon: '🐛',
        milestone: { title: '¿Por qué es importante?', text: 'Su compilador A-0 democratizó la programación. COBOL, basado en su trabajo, aún procesa el 95% de las transacciones ATM.', facts: ['Inventó el término "debugging"', 'COBOL aún se usa en sistemas bancarios', 'Fue la primera mujer Medalla de Ciencia en Computación'] },
        pioneer: { name: 'Grace Hopper', years: '1906 — 1992', role: 'Almirante y Científica Informática', nationality: '🇺🇸 Estadounidense', icon: '🐛', quote: 'Los problemas más interestantes vienen de no saber qué pregunta hacer.', bio: 'Pionera de la programación y almirante de la Marina de EE.UU. Creó el primer compilador y fue coautora de COBOL.', inventionTitle: 'El Compilador A-0', PioneerScene: HopperScene }
      },
      {
        id: 'microprocesador', year: '1971',
        title: 'El Intel 4004 — Una Computadora en un Chip',
        description: 'Intel lanza el primer microprocesador comercial: 2,300 transistores en un chip.',
        icon: '🔲',
        milestone: { title: '¿Por qué es importante?', text: 'Lo que antes requería una habitación completa ahora cabía en un chip del tamaño de una uña.', facts: ['Originalmente diseñado para una calculadora', 'Tenía 4 bits y 4KB de memoria', 'Hoy un chip M3 tiene 20,000 millones de transistores'] },
        pioneer: { name: 'Ted Hoff', years: '1937 —', role: 'Ingeniero de Intel', nationality: '🇺🇸 Estadounidense', icon: '🔲', quote: 'Pusimos una computadora completa en un solo chip de silicio.', bio: 'Lideró el diseño del Intel 4004, sentando las bases de todos los procesadores modernos.', inventionTitle: 'El Intel 4004', PioneerScene: MicroprocesadorScene }
      },
      {
        id: 'ibm-pc', year: '1981',
        title: 'El IBM PC — La Computación Personal Llega a las Masas',
        description: 'IBM presenta el Personal Computer 5150, cambiando el mundo para siempre.',
        icon: '🖥️',
        milestone: { title: '¿Por qué es importante?', text: 'Popularizó la computación personal. Era accesible, abierto y usaba MS-DOS de Microsoft.', facts: ['Procesador Intel 8088 a 4.77 MHz', 'MS-DOS era el sistema operativo', 'Los clones crearon una industria de miles de millones'] },
        pioneer: { name: 'Don Estridge', years: '1937 — 1985', role: 'Ingeniero y Director de Proyecto', nationality: '🇺🇸 Estadounidense', icon: '🖥️', quote: 'Queríamos hacer una computadora que cualquiera pudiera usar.', bio: 'Lideró el "Proyecto Chess" en IBM, creando el estándar de la industria.', inventionTitle: 'El IBM PC 5150', PioneerScene: PersonalComputerScene }
      },
      {
        id: 'berners-lee', year: '1991',
        title: 'La World Wide Web — Conectando al Mundo',
        description: 'Tim Berners-Lee crea la WWW en el CERN.',
        icon: '🌐',
        milestone: { title: '¿Por qué es importante?', text: 'Fue una filosofía: la información debe ser libre y accesible para todos.', facts: ['La primera página web fue el 6 de agosto de 1991', 'El CERN liberó el código sin patentes en 1993', 'Hoy hay más de 1.9 mil millones de sitios web'] },
        pioneer: { name: 'Tim Berners-Lee', years: '1955 —', role: 'Científico de la Computación', nationality: '🇬🇧 Británico', icon: '🌐', quote: 'La web es para todos y tiene que seguir siéndolo.', bio: 'Inventó la WWW en 1989. Su decisión de no patentarla fue revolucionaria.', inventionTitle: 'La World Wide Web', PioneerScene: BernersLeeScene }
      }
    ],
    personajes: [
      {
        id: 'char-pascal', name: 'Blaise Pascal', year: '1623', deathYear: '1662', icon: '🔢',
        role: 'Matemático y Filósofo', nationality: '🇫🇷 Francés',
        title: 'Blaise Pascal — El Visionario del Cálculo Mecánico',
        subtitle: 'A los 19 años creó la primera calculadora del mundo',
        description: 'Genio francés del siglo XVII que sentó las bases de la mecanización del pensamiento con la Pascalina.',
        quote: 'El corazón tiene razones que la razón no entiende.',
        bio: 'Pascal fue un matemático, físico y filósofo francés del siglo XVII. A los 19 años inventó la Pascalina, la primera calculadora mecánica de la historia, para ayudar a su padre con los cálculos fiscales. Además, contribuyó en matemáticas (el triángulo de Pascal), física (la presión atmosférica) y filosofía (los Pensées). Su trabajo demostró que las operaciones matemáticas podían ser ejecutadas por una máquina, sentando el primer ladrillo de la computación.',
        info: {
          birth: '19 de junio de 1623',
          death: '19 de agosto de 1662',
          place: 'Clermont-Ferrand, Francia',
          field: ['Matemáticas', 'Física', 'Filosofía'],
          knownFor: 'La Pascalina, la primera calculadora mecánica',
          organization: 'Royal Society',
          education: 'Formación autodidacta, guiada por su padre',
          awards: 'La unidad de presión "pascal" (Pa) lleva su nombre'
        },
        CharacterScene: PascalCharacter,
        sceneTitle: 'La Pascalina — Su Invención',
        milestone: { title: 'Legado', text: 'La Pascalina abrió el camino para todos los dispositivos de cálculo que siguieron. Sin Pascal, no habría existido Babbage, ni Turing, ni computadoras modernas.', facts: ['Construyó alrededor de 50 prototipos de la Pascalina', 'Su triángulo matemático se usa aún en probabilidad', 'Los Pensées son una de las obras filosóficas más importantes'] }
      },
      {
        id: 'char-babbage', name: 'Charles Babbage', year: '1791', deathYear: '1871', icon: '⚙️',
        role: 'Matemático e Ingeniero', nationality: '🇬🇧 Británico',
        title: 'Charles Babbage — El Padre de la Computación',
        subtitle: 'Concebí la primera computadora 100 años antes de que existiera',
        description: 'Ingeniero británico que diseñó la Analytical Engine, el primer diseño completo de una computadora programable.',
        quote: 'Los errores nos muestran exactamente dónde la lógica falla.',
        bio: 'Babbage pasó décadas diseñando máquinas cada vez más sofisticadas. Su Difference Engine calculaba polinomios y su Analytical Engine contenía todos los componentes de una computadora moderna: unidad de procesamiento, memoria, entrada y salida. Aunque nunca se completó en su vida, su visión anticipó la informática en un siglo.',
        info: {
          birth: '26 de diciembre de 1791',
          death: '18 de octubre de 1871',
          place: 'Londres, Inglaterra',
          field: ['Matemáticas', 'Ingeniería', 'Computación'],
          knownFor: 'La Máquina Analítica, primer diseño de computadora programable',
          organization: 'Universidad de Cambridge (profesor Lucasiano)',
          education: 'Trinity College y Peterhouse, Universidad de Cambridge',
          awards: 'Medalla de oro de la Royal Astronomical Society (1824)'
        },
        CharacterScene: BabbageCharacter,
        sceneTitle: 'La Difference Engine — Su Invención',
        milestone: { title: 'Legado', text: 'Su Analytical Engine contenía la "Mill" (CPU), la "Store" (memoria), tarjetas perforadas (entrada) y una impresora (salida). Era una computadora completa, 100 años antes de su tiempo.', facts: ['La "Store" podía guardar 1,000 números de 50 dígitos', 'Usaba programación con tarjetas perforadas', 'Ada Lovelace trabajó con su diseño'] }
      },
      {
        id: 'char-lovelace', name: 'Ada Lovelace', year: '1815', deathYear: '1852', icon: '📝',
        role: 'Matemática y Escritora', nationality: '🇬🇧 Británica',
        title: 'Ada Lovelace — La Primera Programadora',
        subtitle: 'Escribió el primer código de la historia',
        description: 'Visionaria que entendió el potencial de las máquinas computacionales antes que nadie.',
        quote: 'La Máquina Analítica teje patrones algebraicos igual que el telar de Jacquard teje flores y hojas.',
        bio: 'Hija del poeta Lord Byron, Ada fue una matemática que trabajó con Charles Babbage. Sus Notas sobre la Máquina Analítica incluyen el primer algoritmo de la historia y una reflexión profunda sobre los límites de la computación. Predijo, 100 años antes, que las máquinas podían crear música y arte.',
        info: {
          birth: '10 de diciembre de 1815',
          death: '27 de noviembre de 1852',
          place: 'Londres, Inglaterra',
          field: ['Matemáticas', 'Ciencia de la Computación'],
          knownFor: 'El primer algoritmo destinado a una máquina',
          organization: 'Colaboradora de Charles Babbage',
          education: 'Formación matemática con Mary Somerville y Augustus De Morgan',
          awards: 'El lenguaje de programación "Ada" (1980) lleva su nombre'
        },
        CharacterScene: LovelaceCharacter,
        sceneTitle: 'Tarjetas Perforadas — Su Algoritmo',
        milestone: { title: 'Legado', text: 'El Departamento de Defensa de EE.UU. nombró al lenguaje "Ada" en su honor. Es el símbolo de las mujeres en tecnología.', facts: ['Escribió el primer algoritmo para máquina computadora', 'Predijo la computación creativa 100 años antes', 'El lenguaje Ada fue creado en su honor en 1980'] }
      },
      {
        id: 'char-turing', name: 'Alan Turing', year: '1912', deathYear: '1954', icon: '🧮',
        role: 'Matemático y Criptoanalista', nationality: '🇬🇧 Británico',
        title: 'Alan Turing — El Padre de la Computación Teórica',
        subtitle: 'Definió qué es computable y creó la inteligencia artificial',
        description: 'Su máquina teórica definió los límites de la computación y su trabajo en Enigma cambió la historia.',
        quote: 'A veces es las personas las que nadie imagina cosas que nadie ha pensado.',
        bio: 'Turing es considerado padre de la ciencia de la computación e inteligencia artificial. Su Máquina de Turing definió formalmente qué es un algoritmo. Durante la WWII descifró el código Enigma, acortando la guerra. El "Test de Turing" sigue siendo el estándar para medir inteligencia artificial.',
        info: {
          birth: '23 de junio de 1912',
          death: '7 de junio de 1954',
          place: 'Londres, Inglaterra',
          field: ['Matemáticas', 'Computación', 'Inteligencia Artificial'],
          knownFor: 'La Máquina de Turing y el descifrado de la máquina Enigma',
          organization: 'Bletchley Park · National Physical Laboratory · Universidad de Mánchester',
          education: "King's College (Cambridge) · doctorado en Princeton",
          awards: 'Orden del Imperio Británico (OBE); el premio "Turing Award" lleva su nombre'
        },
        CharacterScene: TuringCharacter,
        sceneTitle: 'La Cinta de Turing — Su Máquina',
        milestone: { title: 'Legado', text: 'Sin Turing no existiría la ciencia de la computación. Su trabajo teórico es la base de cada computadora, smartphone y sistema de IA del mundo.', facts: ['La Máquina de Turing puede simular cualquier algoritmo', 'Descifró Enigma, salvando millones de vidas', 'El Test de Turing mide inteligencia artificial desde 1950'] }
      },
      {
        id: 'char-hopper', name: 'Grace Hopper', year: '1906', deathYear: '1992', icon: '🐛',
        role: 'Almirante y Científica Informática', nationality: '🇺🇸 Estadounidense',
        title: 'Grace Hopper — La Abuela de COBOL',
        subtitle: 'Inventó el compilador y democratizó la programación',
        description: 'Pionera de la programación que permitió que las computadoras entendieran inglés.',
        quote: 'Los problemas más interesantes vienen de no saber qué pregunta hacer.',
        bio: 'Grace Hopper fue almirante de la Marina de EE.UU. y pionera de la programación. Creó el primer compilador (A-0), que traducía código en inglés a código máquina. Fue coautora de COBOL, el lenguaje que aún procesa el 95% de las transacciones ATM. Inventó el término "debugging" después de encontrar un moth en un computador.',
        info: {
          birth: '9 de diciembre de 1906',
          death: '1 de enero de 1992',
          place: 'Nueva York, EE.UU.',
          field: ['Ciencia de la Computación', 'Ingeniería', 'Fuerza Naval'],
          knownFor: 'El primer compilador (A-0) y el lenguaje COBOL',
          organization: 'Marina de EE.UU. · UNIVAC · Digital Equipment Corporation',
          education: 'Vassar College · doctorado en Matemáticas en Yale',
          awards: 'Medalla Nacional de Tecnología (1991); nombrada contraalmirante'
        },
        CharacterScene: HopperCharacter,
        sceneTitle: 'Terminal COBOL — Su Compilador',
        milestone: { title: 'Legado', text: 'Su compilador permitió que cualquiera pudiera programar sin ser ingeniero. COBOL, basado en su trabajo, procesa miles de millones de transacciones diarias.', facts: ['Inventó el término "debugging"', 'COBOL aún se usa en bancos y gobiernos', 'Fue la primera mujer Medalla de Ciencia en Computación'] }
      },
      {
        id: 'char-ritchie', name: 'Dennis Ritchie', year: '1941', deathYear: '2011', icon: '💾',
        role: 'Científico de la Computación', nationality: '🇺🇸 Estadounidense',
        title: 'Dennis Ritchie — El Creador de C y Unix',
        subtitle: 'Construyó los cimientos de todo software moderno',
        description: 'Creó el lenguaje C y el sistema operativo Unix, la base de Linux, macOS, Android e internet.',
        quote: 'Unix es simple. Solo hay que ser un genio para entender su simplicidad.',
        bio: 'Dennis Ritchie trabajó en los Laboratorios Bell, donde creó el lenguaje de programación C (1972) y co-creó el sistema operativo Unix (1969). C es la base de C++, Java, Python, JavaScript y casi todos los lenguajes modernos. Unix es la base de Linux, macOS, iOS y Android. Su trabajo es literalmente la fundación de todo el software actual.',
        info: {
          birth: '9 de septiembre de 1941',
          death: '12 de octubre de 2011',
          place: 'Bronxville, Nueva York, EE.UU.',
          field: ['Ciencia de la Computación', 'Sistemas Operativos', 'Lenguajes de Programación'],
          knownFor: 'El lenguaje C y el sistema operativo Unix',
          organization: 'Bell Labs (AT&T)',
          education: 'Universidad de Harvard',
          awards: 'Premio Turing (1983) y Medalla Nacional de Tecnología (1998)'
        },
        CharacterScene: RitchieCharacter,
        sceneTitle: 'Terminal C/Unix — Sus Creaciones',
        milestone: { title: 'Legado', text: 'C y Unix son la base de prácticamente todo el software moderno. Sin Ritchie, no existirían Linux, macOS, Android, ni internet tal como la conocemos.', facts: ['C es la base de C++, Java, Python, JavaScript', 'Unix evolucionó en Linux, macOS, iOS, Android', 'Recibió el Premio Turing en 1983'] }
      },
      {
        id: 'char-jobs', name: 'Steve Jobs', year: '1955', deathYear: '2011', icon: '🍎',
        role: 'Emprendedor y Visionario', nationality: '🇺🇸 Estadounidense',
        title: 'Steve Jobs — El Visionario que Cambió la Tecnología',
        subtitle: 'Convirtió la tecnología en cultura popular',
        description: 'Co-fundador de Apple, revolucionó la informática personal, la música, los teléfonos y la animación digital.',
        quote: 'La gente no sabe lo que quiere hasta que se lo enseñas.',
        bio: 'Steve Jobs co-fundó Apple en 1976 y la convirtió en la empresa más valiosa del mundo. Bajo su liderazgo, Apple creó el Macintosh (1984), el iMac (1998), el iPod (2001), el iPhone (2007) y el iPad (2010). También fundó Pixar, que revolucionó la animación digital con Toy Story (1995). Su obsesión por el diseño y la experiencia de usuario transformó la industria tecnológica para siempre.',
        info: {
          birth: '24 de febrero de 1955',
          death: '5 de octubre de 2011',
          place: 'San Francisco, Estados Unidos',
          field: ['Emprendimiento', 'Diseño', 'Informática'],
          knownFor: 'Co-fundar Apple y crear el iPhone',
          organization: 'Apple · Pixar',
          education: 'Reed College (abandonó)',
          awards: 'Premio a la Trayectoria (Grammy, 2012, por su impacto en la música y Pixar)'
        },
        CharacterScene: JobsCharacter,
        sceneTitle: 'Dispositivos Apple — Sus Creaciones',
        milestone: { title: 'Legado', text: 'Jobs demostró que la tecnología no solo debe ser funcional, sino también hermosa. El iPhone cambió la forma en que el mundo se comunica.', facts: ['El iPhone (2007) reinventó el teléfono inteligente', 'Pixar creó las primeras películas 100% digitales', 'Apple es la empresa más valiosa del mundo'] }
      },
      {
        id: 'char-torvalds', name: 'Linus Torvalds', year: '1969', icon: '🐧',
        role: 'Ingeniero de Software', nationality: '🇫🇮 Finlandés',
        title: 'Linus Torvalds — El Creador de Linux y Git',
        subtitle: 'Creó el sistema operativo que mueve internet',
        description: 'Creó Linux y Git, dos de las herramientas de software más importantes de la historia.',
        quote: 'Talk is cheap. Show me the code.',
        bio: 'Linus Torvalds creó el kernel de Linux en 1991 como un proyecto personal mientras estudiaba en Helsinki. Hoy, Linux ejecuta el 96% de los servidores del mundo, todos los smartphones Android, los supercomputadores y miles de millones de dispositivos IoT. También creó Git (2005), el sistema de control de versiones usado por millones de desarrolladores en todo el mundo.',
        info: {
          birth: '28 de diciembre de 1969',
          place: 'Helsinki, Finlandia',
          field: ['Ingeniería de Software', 'Sistemas Operativos'],
          knownFor: 'El kernel de Linux y el sistema de control de versiones Git',
          organization: 'Linux Foundation',
          education: 'Universidad de Helsinki',
          awards: 'Premio de Tecnología del Milenio (2012); Salón de la Fama de Internet (2012)'
        },
        CharacterScene: TorvaldsCharacter,
        sceneTitle: 'Terminal Linux — Sus Creaciones',
        milestone: { title: 'Legado', text: 'Linux es la columna vertebral de internet y la computación moderna. Git transformó la forma en que el mundo desarrolla software.', facts: ['Linux ejecuta el 96% de los servidores del mundo', 'Android (basado en Linux) tiene 3,500 millones de usuarios', 'Git es usado por millones de desarrolladores'] }
      },
      {
        id: 'char-vanrossum', name: 'Guido van Rossum', year: '1956', icon: '🐍',
        role: 'Ingeniero de Software', nationality: '🇳🇱 Holandés',
        title: 'Guido van Rossum — El Creador de Python',
        subtitle: 'Creó el lenguaje más popular del mundo',
        description: 'Creó Python, el lenguaje de programación más usado en ciencia de datos, IA y automatización.',
        quote: 'Python es el lenguaje de programación que más se parece al pseudocódigo.',
        bio: 'Guido van Rossum creó Python en 1991 en los Países Bajos. Su filosofía de diseño prioriza la legibilidad del código y la simplicidad. Python se ha convertido en el lenguaje más popular del mundo, usado en ciencia de datos, inteligencia artificial, automatización, web y educación. Es el lenguaje preferido por Google, Netflix, Instagram y miles de empresas más.',
        info: {
          birth: '31 de enero de 1956',
          place: 'Haarlem, Países Bajos',
          field: ['Ingeniería de Software', 'Lenguajes de Programación'],
          knownFor: 'El lenguaje de programación Python',
          organization: 'Dropbox · Python Software Foundation · Microsoft',
          education: 'Universidad de Ámsterdam',
          awards: 'Premio al Software Libre de la FSF (2001)'
        },
        CharacterScene: VanRossumCharacter,
        sceneTitle: 'Python — Su Lenguaje',
        milestone: { title: 'Legado', text: 'Python democratizó la programación y se convirtió en el lenguaje #1 en ciencia de datos e inteligencia artificial.', facts: ['Python es el lenguaje #1 en popularidad (TIOBE)', 'Es el lenguaje estándar en IA y ciencia de datos', 'Usado por Google, Netflix, Instagram, NASA'] }
      }
    ],
    infravalorados: [
      {
        id: 'inf-al-juarismi',
        name: 'Al-Juarismi', year: '820', epoca: 'Precursores Antiguos', icon: '📐',
        title: 'Al-Juarismi — El Nombre Detrás de los Algoritmos',
        subtitle: 'De su nombre nació la palabra "algoritmo"',
        description: 'Matemático persa cuyo nombre dio origen a la palabra "algoritmo"; sentó las bases matemáticas de toda la programación moderna.',
        bio: 'Al-Juarismi vivió en el siglo IX bajo el Califato Abasí y trabajó en la Casa de la Sabiduría de Bagdad. Escribió el tratado "Al-Yabr wa\'l-Muqābalah", que dio nombre al álgebra, e introdujo en Occidente el sistema de numeración hindú-arábigo con el cero.',
        logro: 'En el 820 escribió el texto que difundió el sistema de numeración hindú (con el cero) y codificó los procedimientos de cálculo que hoy llamamos algoritmos.',
        milestone: {
          title: 'Por qué importa',
          text: 'Su nombre latinizado, "Algoritmi", se convirtió en la palabra algoritmo: el concepto que mueve absolutamente todo el software moderno.',
          facts: [
            'De "al-Jabr" derivan las palabras álgebra y algebrista',
            'Su sistema de numeración reemplazó al ábaco en la Europa medieval',
            'Cada función matemática o de programación hereda sus algoritmos'
          ]
        },
        info: {
          birth: 'c. 780', death: 'c. 850',
          place: 'Bagdad, Califato Abasí',
          field: ['Matemáticas', 'Astronomía'],
          knownFor: 'El álgebra y el concepto de algoritmo',
          organization: 'Casa de la Sabiduría de Bagdad',
          education: 'Casa de la Sabiduría',
          awards: 'Su nombre es el origen etimológico de "algoritmo"'
        }
      },
      {
        id: 'inf-jacquard',
        name: 'Joseph Marie Jacquard', year: '1804', epoca: 'Precursores Antiguos', icon: '🧵',
        title: 'Joseph Marie Jacquard — El Telar que Programó la Máquina',
        subtitle: 'Inventó el telar programable con tarjetas perforadas',
        description: 'Inventó el telar programable con tarjetas perforadas, la inspiración directa de Babbage y Hollerith.',
        bio: 'Tejedor y comerciante francés nacido en Lyon. En 1804 presentó el telar Jacquard, que permitía programar automáticamente el diseño del tejido mediante tarjetas perforadas. Su invento primero enfureció a los tejedores y después revolucionó la industria textil.',
        logro: 'Su telar usaba una cadena de tarjetas perforadas que decidía qué hilos alzar, automatizando patrones complejos sin intervención humana.',
        milestone: {
          title: 'Por qué importa',
          text: 'Fue la primera vez que se "programó" una máquina con datos externos. Babbage y Hollerith tomaron directamente su idea de las tarjetas perforadas.',
          facts: [
            'Se llegaron a usar más de 20,000 tarjetas para un solo diseño',
            'Babbage poseía un retrato tejido en seda por un telar Jacquard',
            'Las tarjetas perforadas dominaron la informática hasta los años 70'
          ]
        },
        info: {
          birth: '7 de julio de 1752', death: '7 de agosto de 1834',
          place: 'Lyon, Francia',
          field: ['Industria Textil', 'Automatización'],
          knownFor: 'El telar programable con tarjetas perforadas',
          organization: 'Industria textil de Lyon',
          education: 'Hijo de tejedor, formación en gran parte autodidacta',
          awards: 'Su invención dio nombre a la técnica de tejido "jacquard"'
        }
      },
      {
        id: 'inf-hollerith',
        name: 'Herman Hollerith', year: '1890', epoca: 'Era Mecánica', icon: '🗂️',
        title: 'Herman Hollerith — El Censo que Creó a IBM',
        subtitle: 'Automatizó el censo de EE.UU. y su empresa se convirtió en IBM',
        description: 'Automatizó el censo de EE.UU. con tarjetas perforadas; su empresa se convirtió en IBM.',
        bio: 'Ingeniero estadounidense que en la década de 1880 desarrolló el tabulador eléctrico de tarjetas perforadas. Su máquina redujo el censo nacional de 1890 de unos 8 años de trabajo a poco más de 1. En 1896 fundó la Tabulating Machine Company, semilla de la Computing-Tabulating-Recording Company (CTR), rebautizada como IBM en 1924.',
        logro: 'Su tabulador procesaba las tarjetas del censo en segundos, con agujas que detectaban las perforaciones mediante contactos eléctricos.',
        milestone: {
          title: 'Por qué importa',
          text: 'Hollerith unió por primera vez los datos perforados con el procesamiento eléctrico: fue el nacimiento de la industria de la computación de datos.',
          facts: [
            'El censo de 1890 tardó 1 año en vez de 8',
            'Las tarjetas de 80 columnas fueron el estándar informático durante décadas',
            'Su empresa CTR se convirtió en IBM en 1924'
          ]
        },
        info: {
          birth: '29 de febrero de 1860', death: '17 de noviembre de 1929',
          place: 'Buffalo, Nueva York, EE.UU.',
          field: ['Ingeniería', 'Procesamiento de Datos'],
          knownFor: 'El tabulador eléctrico y las tarjetas perforadas',
          organization: 'Tabulating Machine Co. (futura IBM)',
          education: 'City College y Universidad de Columbia',
          awards: 'Medalla Elliott Cresson (1890)'
        }
      },
      {
        id: 'inf-zuse',
        name: 'Konrad Zuse', year: '1941', epoca: 'Pioneros Invisibilizados', icon: '🖥️',
        title: 'Konrad Zuse — La Primera Computadora Programable',
        subtitle: 'Construyó el Z3, la primera computadora funcional del mundo',
        description: 'Construyó el Z3 en Alemania, la primera computadora programable funcional del mundo, casi ignorado frente a los esfuerzos anglosajones.',
        bio: 'Ingeniero alemán que trabajó aislado durante la Segunda Guerra Mundial. En 1941 terminó el Z3 en el salón de su casa en Berlín: una máquina electromecánica que usaba binario de forma pionera, mucho antes que los proyectos aliados. Su trabajo fue parcialmente destruido por los bombardeos y solo fue reconocido tardíamente.',
        logro: 'El Z3 era totalmente programable y ejecutaba aritmética con coma flotante en binario usando bits y relés.',
        milestone: {
          title: 'Por qué importa',
          text: 'El Z3 demuestra que el concepto de computadora programable no nació solo en EE.UU.: Zuse llegó a él en solitario en 1941.',
          facts: [
            'Usaba aritmética binaria pura, antes que ENIAC y Colossus',
            'Tenía unas 2,000 relés y palabras de 22 bits',
            'El Z3 original fue reconstruido y hoy está en el Deutsches Museum'
          ]
        },
        info: {
          birth: '22 de junio de 1910', death: '18 de diciembre de 1995',
          place: 'Berlín, Alemania',
          field: ['Ingeniería', 'Computación'],
          knownFor: 'El Z3 y el primer lenguaje de programación (Plankalkül)',
          organization: 'Zuse Apparatebau (futura Zuse KG)',
          education: 'Universidad Técnica de Berlín-Charlottenburg',
          awards: 'Doctorados honoris causa; el cráter lunar "Zuse" lleva su nombre'
        }
      },
      {
        id: 'inf-eniac',
        name: 'Programadoras del ENIAC', year: '1945', epoca: 'Pioneros Invisibilizados', icon: '👩‍💻',
        title: 'Las Programadoras del ENIAC — Las Primeras del Mundo',
        subtitle: 'Programaron a mano la primera computadora electrónica digital',
        description: 'Kay McNulty, Jean Bartik, Betty Holberton y otras programaron a mano la primera computadora electrónica digital, inventando la disciplina sobre la marcha.',
        bio: 'Un grupo de seis mujeres matemáticas —Jean Bartik, Kathleen "Kay" Antonelli, Marlyn Meltzer, Betty Holberton, Frances Spence y Ruth Teitelbaum— fueron contratadas para programar el ENIAC, la primera computadora electrónica de propósito general. Sin manuales ni cursos, descifraron la máquina cableando paneles y planificando los algoritmos en papel.',
        logro: 'Inventaron técnicas de programación como las subrutinas y el análisis lógico del hardware para que el ENIAC calculara trayectorias balísticas.',
        milestone: {
          title: 'Por qué importa',
          text: 'Fundaron la profesión de programadora décadas antes de que existiera una "ciencia de la computación"; su nombre solo se recuperó oficialmente en los años 80.',
          facts: [
            'Programaban cambiando cables y configurando interruptores',
            'El ENIAC calculaba una trayectoria en 30 segundos',
            'En 1997 ingresaron al Salón de la Fama de las Mujeres en Tecnología'
          ]
        },
        info: {
          birth: 'Proyecto ENIAC, 1945-1946',
          place: 'Filadelfia, EE.UU. (Escuela Moore de Ingeniería)',
          field: ['Programación', 'Matemáticas'],
          knownFor: 'Ser las primeras programadoras de computadoras',
          organization: 'Proyecto ENIAC, Universidad de Pensilvania',
          education: 'Formadas en cálculo y protocolos de guerra (programadoras humanas)',
          awards: 'Salón de la Fama de las Mujeres en Tecnología (1997)'
        }
      },
      {
        id: 'inf-shannon',
        name: 'Claude Shannon', year: '1948', epoca: 'Pioneros Invisibilizados', icon: '📡',
        title: 'Claude Shannon — El Padre de la Información',
        subtitle: 'Su tesis de 1937 hizo posible el bit',
        description: 'Padre de la teoría de la información; sin él no existiría la codificación binaria tal como la conocemos.',
        bio: 'Ingeniero y matemático estadounidense, llamado "el padre de la era de la información". En su tesis de máster de 1937 demostró que los circuitos eléctricos podían resolver la lógica booleana, y en 1948 publicó "Una teoría matemática de la comunicación", donde definió el bit como unidad de información.',
        logro: 'Probó que las señales pueden transmitirse sin corrupción usando codificación binaria y acuñó el término "bit".',
        milestone: {
          title: 'Por qué importa',
          text: 'El bit de Shannon es el átomo de todo el mundo digital: sin su teoría no existirían la compresión, el cifrado ni las comunicaciones modernas.',
          facts: [
            'Su tesis de 1937 unió el álgebra de Boole con los circuitos eléctricos',
            'Trabajó en los Bell Labs, donde coincidió con la visita de Turing',
            'Su fama de excéntrico lúdico ocultaba un genio práctico'
          ]
        },
        info: {
          birth: '30 de abril de 1916', death: '24 de febrero de 2001',
          place: 'Gaylord, Míchigan, EE.UU.',
          field: ['Matemáticas', 'Ingeniería Eléctrica', 'Criptografía'],
          knownFor: 'La teoría de la información y el bit',
          organization: 'Bell Labs · MIT',
          education: 'Universidad de Míchigan · MIT (doctorado)',
          awards: 'Premio Turing (1972) y Medalla de Honor del IEEE (1966)'
        }
      },
      {
        id: 'inf-thompson',
        name: 'Ken Thompson', year: '1969', epoca: 'Puente Moderno', icon: '💻',
        title: 'Ken Thompson — El Padre Silencioso de Unix',
        subtitle: 'Co-creó Unix, casi siempre eclipsado por Ritchie',
        description: 'Co-creador de Unix junto a Ritchie, casi siempre eclipsado por él aunque el diseño original fue suyo.',
        bio: 'Científico de la computación de Bell Labs. En 1969 diseñó y escribió la primera versión de Unix en una computadora en desuso, buscando un sistema multiusuario simple y elegante. También creó el lenguaje B (antecesor directo de C), aportes clave a la expresión regular y, décadas después, el lenguaje Go en Google.',
        logro: 'Escribió el kernel y el sistema de archivos de Unix: un diseño minimalista que se convirtió en el "sistema operativo de los sistemas operativos".',
        milestone: {
          title: 'Por qué importa',
          text: 'Unix es la semilla de Linux, macOS, iOS y Android: lo que Thompson diseñó en 1969 corre hoy en casi todos los dispositivos del mundo.',
          facts: [
            'Escribió Unix casi solo, en una PDP-7 en desuso',
            'Creó el lenguaje B, del que deriva directamente C',
            'Compartió el Premio Turing (1983) con Ritchie'
          ]
        },
        info: {
          birth: '4 de febrero de 1943',
          place: 'Nueva Orleans, EE.UU.',
          field: ['Sistemas Operativos', 'Lenguajes de Programación', 'Lógica'],
          knownFor: 'Co-crear Unix y el lenguaje Go',
          organization: 'Bell Labs · Google',
          education: 'Universidad de California, Berkeley (licenciatura y máster)',
          awards: 'Premio Turing (1983) y Medalla Nacional de Tecnología (1998)'
        }
      },
      {
        id: 'inf-hamilton',
        name: 'Margaret Hamilton', year: '1969', epoca: 'Puente Moderno', icon: '🚀',
        title: 'Margaret Hamilton — La Ingeniera que Llevó el Apolo a la Luna',
        subtitle: 'Lideró el software de guía del Apolo 11 y acuñó el término "ingeniería de software"',
        description: 'Lideró el software de guía del Apolo 11 y acuñó el término "ingeniería de software" cuando ni siquiera existía como profesión.',
        bio: 'Científica de la computación estadounidense que dirigió el equipo del MIT que desarrolló el software de vuelo de las misiones Apolo. En 1969 ese software, escrito con tarjetas perforadas y lenguaje ensamblador, llevó al Apolo 11 a la Luna. Acuñó el término "ingeniería de software" para legitimar un campo que entonces nadie tomaba en serio.',
        logro: 'Diseñaron un sistema con tareas prioritarias que gestionaba en tiempo real los límites de memoria y los márgenes de fallo del viaje lunar.',
        milestone: {
          title: 'Por qué importa',
          text: 'Fue pionera del software tolerante a fallos: sus prioridades evitaron un aborto del Apolo 11 durante el descenso lunar.',
          facts: [
            'El software del Apolo 11 ocupaba unos 145 KB',
            'Su módulo descartaba tareas innecesarias bajo presión',
            'Recibió la Medalla Presidencial de la Libertad (2016)'
          ]
        },
        info: {
          birth: '17 de agosto de 1936',
          place: 'Paoli, Indiana, EE.UU.',
          field: ['Ingeniería de Software', 'Ciencia de la Computación'],
          knownFor: 'El software de guía del programa Apolo',
          organization: 'MIT Instrumentation Laboratory (hoy Draper) · Hamilton Technologies',
          education: 'Earlham College · MIT',
          awards: 'Medalla Presidencial de la Libertad (2016)'
        }
      },
      {
        id: 'inf-perlman',
        name: 'Radia Perlman', year: '1985', epoca: 'Puente Moderno', icon: '🌐',
        title: 'Radia Perlman — La Madre de Internet',
        subtitle: 'Creó el protocolo Spanning Tree, base de las redes actuales',
        description: 'Creó el protocolo Spanning Tree, base de cómo funcionan las redes hoy; conocida como "la madre de Internet".',
        bio: 'Ingeniera de redes estadounidense que en 1985 inventó el algoritmo Spanning Tree Protocol (STP), que permite que las redes Ethernet funcionen de forma redundante sin bucles infinitos. Autora del libro "Interconnections" y de décadas de estándares IEEE, bromea diciendo que "Star Trek tiene primos graciosos".',
        logro: 'El STP garantiza que los switches Ethernet no repitan datos en círculos, haciendo posibles redes locales confiables a gran escala.',
        milestone: {
          title: 'Por qué importa',
          text: 'Sin STP no existirían las redes Ethernet redundantes: su algoritmo está en cada switch y router del mundo.',
          facts: [
            'Concibió el STP con solo 24 años',
            'Es autora de décadas de estándares IEEE 802',
            'Ingresó al Salón de la Fama de Internet (2014)'
          ]
        },
        info: {
          birth: '18 de diciembre de 1951',
          place: 'Nueva Jersey, EE.UU.',
          field: ['Redes de Computadoras', 'Ingeniería de Software'],
          knownFor: 'El algoritmo Spanning Tree',
          organization: 'Digital Equipment Corp. · Novell · Sun · Intel · Dell EMC',
          education: 'MIT (licenciatura, máster y doctorado)',
          awards: 'Salón de la Fama de Internet (2014)'
        }
      }
    ],
    industrial: [
      {
        id: 'steam-engine', year: '1712',
        title: 'La Máquina de Vapor de Newcomen',
        description: 'Thomas Newcomen inventa la máquina de vapor atmosférica para bombear agua de las minas de carbón.',
        icon: '🚂',
        milestone: { title: '¿Por qué es importante?', text: 'Fue la primera máquina de vapor práctica. Transformó la minería y sentó las bases de la Revolución Industrial al permitir trabajar más allá de la energía hidráulica y eólica.', facts: ['Funcionaba mediante condensación de vapor para crear vacío', 'Se usaba principalmente en minas de carbón del norte de Inglaterra', 'Más de 1,000 unidades se instalaron en toda Europa'] },
        pioneer: { name: 'Thomas Newcomen', years: '1664 — 1729', role: 'Ingeniero e Inventor', nationality: '🇬🇧 Británico', icon: '🚂', quote: 'La naturaleza no puede ser engañada, pero puede ser dirigida.', bio: 'Ingeniero británico que inventó la máquina de vapor atmosférica en 1712. Su invención revolucionó la minería al permitir bombear agua de las profundidades de las minas, haciendo posible la extracción de carbón a gran escala.', inventionTitle: 'La Máquina de Vapor Atmosférica', PioneerScene: SteamEngineScene }
      },
      {
        id: 'spinning-jenny', year: '1764',
        title: 'La Jenny Hilandera de Hargreaves',
        description: 'James Hargreaves inventa la Jenny, una máquina que hilaba múltiples hilos simultáneamente.',
        icon: '🧵',
        milestone: { title: '¿Por qué es importante?', text: 'Multiplicó la productividad textil por 8. Fue el primer paso hacia la mecanización de la industria textil, uno de los pilares de la Revolución Industrial.', facts: ['Podía hilar 8 hilos a la vez (luego hasta 80)', 'Su nombre proviene de "Jenny", diminutivo de "Engine"', 'Los trabajadores la destruyeron por miedo al desempleo'] },
        pioneer: { name: 'James Hargreaves', years: '1720 — 1778', role: 'Inventor y Constructor de Marcos', nationality: '🇬🇧 Británico', icon: '🧵', quote: 'La industria no duerme cuando los hombres descansan.', bio: 'Inventor británico que creó la Jenny hilandera en 1764. Su máquina permitía a un solo trabajador hilar varios hilos simultáneamente, multiplicando la productividad de la industria textil.', inventionTitle: 'La Jenny Hilandera', PioneerScene: SpinningJennyScene }
      },
      {
        id: 'cotton-gin', year: '1793',
        title: 'La Desmotadora de Whitney',
        description: 'Eli Whitney inventa la desmotadora de algodón, automatizando la separación de semillas.',
        icon: '🌿',
        milestone: { title: '¿Por qué es importante?', text: 'Redujo el trabajo de separar semillas de 10 horas a 1 hora por libra. Revolucionó la industria algodonera y transformó la economía del sur de Estados Unidos.', facts: ['Podía procesar 50 libras de algodón por día', 'Transformó el algodón en el cultivo más rentable de EE.UU.', 'Paradójicamente aumentó la demanda de esclavitud'] },
        pioneer: { name: 'Eli Whitney', years: '1765 — 1825', role: 'Inventor e Industrial', nationality: '🇺🇸 Estadounidense', icon: '🌿', quote: 'Una buena máquina debe hacer el trabajo de diez hombres.', bio: 'Inventor estadounidense que creó la desmotadora de algodón en 1793. Su invención transformó la industria algodonera, aunque paradójicamente aumentó la dependencia de la esclavitud en el sur de EE.UU.', inventionTitle: 'La Desmotadora de Algodón', PioneerScene: CottonGinScene }
      },
      {
        id: 'locomotive', year: '1804',
        title: 'La Primera Locomotora de Trevithick',
        description: 'Richard Trevithick construye la primera locomotora de vapor funcional del mundo.',
        icon: '🚃',
        milestone: { title: '¿Por qué es importante?', text: 'Demostró que el vapor podía mover vehículos sobre rieles. Sentó las bases del transporte ferroviario, que transformó la sociedad y la economía mundial.', facts: ['Recorrió 10 millas de Merthyr Tydfil a Abercynon', 'Arrastró 10 toneladas de hierro a 5 mph', 'El peso de la locomotora rompió los rieles de hierro'] },
        pioneer: { name: 'Richard Trevithick', years: '1771 — 1833', role: 'Ingeniero e Inventor', nationality: '🇬🇧 Británico', icon: '🚃', quote: 'No necesito grandes rieles ni grandes locomotoras, sino más velocidad.', bio: 'Ingeniero británico que construyó la primera locomotora de vapor en 1804. Aunque sus inventos no tuvieron éxito comercial, sentó las bases del transporte ferroviario moderno.', inventionTitle: 'La Primera Locomotora', PioneerScene: LocomotiveScene }
      },
      {
        id: 'safety-lamp', year: '1826',
        title: 'La Lámpara de Seguridad de Davy',
        description: 'Humphry Davy inventa la lámpara de seguridad para minas, usando una malla metálica.',
        icon: '💡',
        milestone: { title: '¿Por qué es importante?', text: 'Protegió a millones de mineros de explosiones de gas metano. Fue un hito en seguridad industrial y demostró la aplicación de la ciencia para salvar vidas.', facts: ['La malla metálica enfriaba la llama antes de que alcanzara el gas', 'George Stephenson desarrolló una versión independiente', 'Salvó miles de vidas en minas de carbón'] },
        pioneer: { name: 'Humphry Davy', years: '1778 — 1829', role: 'Químico e Inventor', nationality: '🇬🇧 Británico', icon: '💡', quote: 'La ciencia es la gran aliada del trabajador.', bio: 'Químico británico que inventó la lámpara de seguridad en 1826. Su invención, basada en una malla metálica que enfriaba la llama, protegió a millones de mineros de explosiones de gas.', inventionTitle: 'La Lámpara de Seguridad', PioneerScene: SafetyLampScene }
      },
      {
        id: 'telegraph', year: '1837',
        title: 'El Telégrafo Eléctrico de Morse',
        description: 'Samuel Morse inventa el telégrafo eléctrico y el código Morse para transmitir mensajes a distancia.',
        icon: '📡',
        milestone: { title: '¿Por qué es importante?', text: 'Fue la primera forma de comunicación a larga distancia instantánea. Transformó la comunicación global y fue la precursora de internet.', facts: ['El primer mensaje fue "What hath God wrought" en 1844', 'El cable transatlántico se completó en 1866', 'El código Morse sigue siendo usado por radioaficionados'] },
        pioneer: { name: 'Samuel Morse', years: '1791 — 1872', role: 'Inventor y Pintor', nationality: '🇺🇸 Estadounidense', icon: '📡', quote: 'La distancia ya no existe. El pensamiento es expresado en un instante.', bio: 'Inventor estadounidense que creó el telégrafo eléctrico y el código Morse en 1837. Su invención revolucionó la comunicación, permitiendo enviar mensajes a través de continentes en segundos.', inventionTitle: 'El Telégrafo Eléctrico', PioneerScene: TelegraphScene }
      },
      {
        id: 'light-bulb', year: '1879',
        title: 'La Bombilla Incandescente de Edison',
        description: 'Thomas Edison perfecciona la bombilla incandescente, haciendo posible la iluminación eléctrica prática.',
        icon: '💡',
        milestone: { title: '¿Por qué es importante?', text: 'No solo inventó la bombilla: creó todo el sistema eléctrico necesario para distribuirla. Iluminó el mundo y extendió el día de trabajo más allá del atardecer.', facts: ['Probó más de 3,000 materiales para el filamento', 'La primera bombilla duró solo 13.5 horas', 'Creó la primera central eléctrica en Manhattan'] },
        pioneer: { name: 'Thomas Edison', years: '1847 — 1931', role: 'Inventor y Empresario', nationality: '🇺🇸 Estadounidense', icon: '💡', quote: 'No he fracasado. He encontrado 10,000 formas que no funcionan.', bio: 'El mayor inventor de la historia con 1,093 patentes. Creó la bombilla incandescente práctica, el fonógrafo y el sistema de distribución eléctrica. Fundó General Electric.', inventionTitle: 'La Bombilla Incandescente', PioneerScene: LightBulbScene }
      },
      {
        id: 'telephone', year: '1876',
        title: 'El Teléfono de Bell',
        description: 'Alexander Graham Bell inventa el teléfono, permitiendo la comunicación de voz a distancia.',
        icon: '📞',
        milestone: { title: '¿Por qué es importante?', text: 'Transformó la comunicación humana para siempre. Permitió la conversación directa a distancia, creando las bases de las telecomunicaciones modernas.', facts: ['La primera frase fue "Mr. Watson, come here!"', 'Patentó la invención horas antes que Gray', 'En 1915 se hizo la primera llamada transatlántica'] },
        pioneer: { name: 'Alexander Graham Bell', years: '1847 — 1922', role: 'Inventor y Científico', nationality: '🇬🇧 Británico 🇨🇦 Canadiense', icon: '📞', quote: 'Cuando una puerta se cierra, otra se abre; pero miramos tanto la puerta cerrada que no vemos la que se abre.', bio: 'Inventor del teléfono en 1876. Su trabajo con sordos le llevó a experimentar con la transmisión del sonido, creando el dispositivo que revolucionó la comunicación humana.', inventionTitle: 'El Teléfono', PioneerScene: TelephoneScene }
      },
      {
        id: 'automobile', year: '1886',
        title: 'El Automóvil de Benz',
        description: 'Karl Benz construye el primer automóvil verdadero: el Benz Patent-Motorwagen.',
        icon: '🚗',
        milestone: { title: '¿Por qué es importante?', text: 'Creó el primer vehículo propulsado por motor de combustión interna. Transformó el transporte, la sociedad y la economía del siglo XX.', facts: ['Tenía 3 ruedas y 0.75 HP de potencia', 'Bertha Benz hizo el primer viaje largo (66 km)', 'Hoy hay más de 1,400 millones de automóviles en el mundo'] },
        pioneer: { name: 'Karl Benz', years: '1844 — 1929', role: 'Ingeniero y Empresario', nationality: '🇩🇪 Alemán', icon: '🚗', quote: 'La necesidad es la madre de la invención, pero el automóvil es el padre del progreso.', bio: 'Ingeniero alemán que construyó el primer automóvil en 1886. Junto con Gottlieb Daimler, fundó la industria automotriz que transformó el transporte mundial.', inventionTitle: 'El Benz Patent-Motorwagen', PioneerScene: AutomobileScene }
      },
      {
        id: 'assembly-line', year: '1901',
        title: 'La Línea de Producción de Ford',
        description: 'Henry Ford introduce la línea de ensamblaje móvil, revolucionando la manufactura.',
        icon: '🏭',
        milestone: { title: '¿Por qué es importante?', text: 'Redujo el tiempo de ensamblaje del Model T de 12 horas a 1.5 horas. Democratizó el automóvil y creó el modelo de producción en masa que define la industria moderna.', facts: ['El Model T pasó de $850 a $260 gracias a la línea de producción', 'En 1925 se producía un auto cada 10 segundos', 'El salario de $5/día de Ford dobló el estándar de la industria'] },
        pioneer: { name: 'Henry Ford', years: '1863 — 1947', role: 'Industrial y Emprendedor', nationality: '🇺🇸 Estadounidense', icon: '🏭', quote: 'Si hubiera preguntado a la gente qué querían, habrían dicho "caballos más rápidos".', bio: 'Industrial estadounidense que introdujo la línea de ensamblaje móvil. Su Modelo T puso el automóvil al alcance de la clase media y creó el modelo de producción en masa.', inventionTitle: 'La Línea de Ensamblaje Móvil', PioneerScene: AssemblyLineScene }
      }
    ],
    web: [
      {
        id: 'www-proposal', year: '1989',
        title: 'La Propuesta de la World Wide Web',
        description: 'Tim Berners-Lee presenta una propuesta para un sistema de información hipertextual en el CERN.',
        icon: '📋',
        milestone: { title: '¿Por qué es importante?', text: 'Fue el documento fundacional de la WWW. Berners-Lee propuso un sistema donde los documentos pudieran estar conectados por enlaces, creando una "telaraña" de información.', facts: ['El documento se tituló "Information Management: A Proposal"', 'Su jefe marcó el documento como "Vago pero emocionante"', 'En 1990 ya tenía un navegador y un servidor funcionando'] },
        pioneer: { name: 'Tim Berners-Lee', years: '1955 —', role: 'Científico de la Computación', nationality: '🇬🇧 Británico', icon: '📋', quote: 'La web es para todos y tiene que seguir siéndolo.', bio: 'Inventor de la World Wide Web en 1989. Su decisión de no patentar la WWW fue revolucionaria y permitió que se convirtiera en la plataforma de información más grande del mundo.', inventionTitle: 'La Propuesta de la WWW', PioneerScene: WWWProposalScene }
      },
      {
        id: 'nacimiento-www', year: '1991',
        title: 'Nacimiento de la World Wide Web',
        description: 'Tim Berners-Lee crea la primera página web en el CERN, marcando el nacimiento oficial de la WWW.',
        icon: '🌐',
        milestone: { title: '¿Por qué es importante?', text: 'La primera página web fue publicada el 6 de agosto de 1991. El CERN liberó el código sin patentes en 1993, permitiendo que la web creciera exponencialmente.', facts: ['La primera URL fue http://info.cern.ch', 'El CERN liberó el código WWW sin patentes en 1993', 'Hoy hay más de 1.9 mil millones de sitios web'] },
        pioneer: { name: 'Tim Berners-Lee', years: '1955 —', role: 'Científico de la Computación', nationality: '🇬🇧 Británico', icon: '🌐', quote: 'La web es para todos y tiene que seguir siéndolo.', bio: 'Inventor de la World Wide Web en 1989. Su decisión de no patentar la WWW fue revolucionaria y permitió que se convirtiera en la plataforma de información más grande del mundo.', inventionTitle: 'La World Wide Web', PioneerScene: WebBirthScene }
      },
      {
        id: 'mosaic', year: '1993',
        title: 'El Navegador Mosaic — La Web se Hace Visual',
        description: 'Marc Andreessen y el equipo de NCSA lanzan Mosaic, el primer navegador con imágenes integradas.',
        icon: '🖼️',
        milestone: { title: '¿Por qué es importante?', text: 'Mosaic fue el primer navegador que mostraba imágenes junto al texto, haciendo la web atractiva para el público general. Sentó las bases de Netscape y todos los navegadores modernos.', facts: ['Fue el primer navegador en mostrar imágenes inline', 'Se ejecutaba en Windows, Mac y Unix', 'Andreessen fundó Netscape al año siguiente'] },
        pioneer: { name: 'Marc Andreessen', years: '1971 —', role: 'Emprendedor y Empresario', nationality: '🇺🇸 Estadounidense', icon: '🖼️', quote: 'El software está comiendo al mundo.', bio: 'Cofundador de Netscape y pionero de la web moderna. Creó Mosaic en la universidad y luego fundó Netscape, el navegador dominante de los años 90.', inventionTitle: 'El Navegador Mosaic', PioneerScene: MosaicScene }
      },
      {
        id: 'auge-js', year: '1995',
        title: 'JavaScript — La Web se Hace Interactiva',
        description: 'Brendan Eich crea JavaScript en Netscape en solo 10 días, transformando la web para siempre.',
        icon: '📜',
        milestone: { title: '¿Por qué es importante?', text: 'JavaScript permitió que las páginas web fueran interactivas y dinámicas. Hoy es el lenguaje más usado del mundo, ejecutándose en el 98% de todos los sitios web.', facts: ['Fue creado en solo 10 días en mayo de 1995', 'Originalmente se llamó "Mocha" y luego "LiveScript"', 'Hoy hay más de 17 millones de desarrolladores JS'] },
        pioneer: { name: 'Brendan Eich', years: '1961 —', role: 'Científico de la Computación', nationality: '🇺🇸 Estadounidense', icon: '📜', quote: 'JavaScript es el único lenguaje que se ejecuta en todos los navegadores.', bio: 'Creador de JavaScript en 1995 mientras trabajaba en Netscape. A pesar de haberlo creado en 10 días, se convirtió en el lenguaje de programación más usado del mundo.', inventionTitle: 'JavaScript', PioneerScene: JavaScriptScene }
      },
      {
        id: 'css-estandar', year: '1996',
        title: 'CSS se Convierte en Estándar W3C',
        description: 'El W3C publica CSS1, separando el contenido de la presentación por primera vez.',
        icon: '🎨',
        milestone: { title: '¿Por qué es importante?', text: 'CSS separó el diseño del contenido HTML, permitiendo crear sitios web visualmente atractivos y consistentes. Fue el inicio del diseño web moderno.', facts: ['CSS1 fue publicado el 17 de diciembre de 1996', 'Permitió estilos consistentes en múltiples páginas', 'Hoy CSS3 soporta animaciones, grid, flexbox y más'] },
        pioneer: { name: 'Håkon Wium Lie', years: '1965 —', role: 'Científico de la Computación', nationality: '🇳🇴 Noruego', icon: '🎨', quote: 'CSS fue diseñado para hacer que la web sea más bonita y accesible.', bio: 'Creador de CSS mientras trabajaba en el CERN junto a Tim Berners-Lee. Su visión de separar contenido de presentación transformó el diseño web para siempre.', inventionTitle: 'CSS — Hojas de Estilo en Cascada', PioneerScene: CSSScene }
      },
      {
        id: 'web-2-0', year: '2004',
        title: 'La Era de Web 2.0 — La Web Social',
        description: 'Tim O\'Reilly define Web 2.0: la web evoluciona de páginas estáticas a plataformas interactivas y sociales.',
        icon: '💬',
        milestone: { title: '¿Por qué es importante?', text: 'Web 2.0 transformó a los usuarios de consumidores a creadores. Blogs, redes sociales, wikis y plataformas como YouTube, Facebook y Twitter cambiaron la sociedad.', facts: ['YouTube se lanzó en 2005, Facebook se abrió al público en 2006', 'Wikipedia demostró el poder del conocimiento colaborativo', 'El término "blog" se popularizó en esta era'] },
        pioneer: { name: 'Tim O\'Reilly', years: '1954 —', role: 'Empresario y Editor', nationality: '🇺🇸 Estadounidense', icon: '💬', quote: 'Web 2.0 es donde la gente se beneficia del efecto de la inteligencia colectiva.', bio: 'Empresario y visionario que acuñó el término "Web 2.0". Su conferencia en 2004 definió la nueva era de la web basada en participación, colaboración y contenido generado por usuarios.', inventionTitle: 'El Concepto de Web 2.0', PioneerScene: Web20Scene }
      },
      {
        id: 'html5', year: '2008',
        title: 'HTML5 — La Web se Hace Moderna',
        description: 'El W3C publica HTML5, introduciendo multimedia, APIs nativas y un marcado más semántico.',
        icon: '🏗️',
        milestone: { title: '¿Por qué es importante?', text: 'HTML5 eliminó la dependencia de plugins como Flash. Introdujo video, audio, canvas, almacenamiento local y APIs modernas que hacen la web una plataforma de aplicaciones completa.', facts: ['Eliminó la necesidad de Adobe Flash para video', 'Introdujo <canvas> para gráficos 2D y 3D', 'Permitió el desarrollo de Progressive Web Apps'] },
        pioneer: { name: 'Ian Hickson', years: '1975 —', role: 'Especificador Web', nationality: '🇺🇸 Estadounidense', icon: '🏗️', quote: 'HTML5 fue diseñado para ser compatible con el contenido existente.', bio: 'Lideró el desarrollo de HTML5 y CSS3 en el W3C. Su enfoque en la compatibilidad hacia atrás y la simplificación del marcado transformó el desarrollo web.', inventionTitle: 'HTML5', PioneerScene: HTML5Scene }
      },
      {
        id: 'responsive', year: '2010',
        title: 'Responsive Web Design — La Web se Adapta',
        description: 'Ethan Marcotte publica "Responsive Web Design", proponiendo que los sitios se adapten a cualquier pantalla.',
        icon: '📱',
        milestone: { title: '¿Por qué es importante?', text: 'Con la explosión de smartphones, el responsive design se volvió esencial. Los sitios web comenzaron a adaptarse automáticamente al tamaño de pantalla del dispositivo.', facts: ['El artículo original proponía fluid grids, flexible images y media queries', 'En 2015, Google comenzó a penalizar sitios no responsive', 'Hoy el 60% del tráfico web viene de dispositivos móviles'] },
        pioneer: { name: 'Ethan Marcotte', years: '1978 —', role: 'Diseñador Web', nationality: '🇺🇸 Estadounidense', icon: '📱', quote: 'El responsive design no es solo un truco técnico, es una forma de pensar.', bio: 'Diseñador web que acuñó el término "Responsive Web Design" en 2010. Su enfoque en la adaptabilidad transformó la forma en que se diseñan sitios web para múltiples dispositivos.', inventionTitle: 'Responsive Web Design', PioneerScene: ResponsiveScene }
      },
      {
        id: 'es6', year: '2015',
        title: 'JavaScript Moderno — ES6/ES2015',
        description: 'ECMAScript 2015 introduce classes, módulos, arrow functions, const/let y programación asíncrona.',
        icon: '⚡',
        milestone: { title: '¿Por qué es importante?', text: 'ES6 modernizó JavaScript, haciéndolo más potente, legible y mantenible. Introdujo conceptos de programación moderna que hicieron posible el desarrollo de aplicaciones complejas.', facts: ['Introdujo arrow functions, classes, modules, promises', 'const y let reemplazaron var para mejor scope', 'Hoy JavaScript se actualiza anualmente con nuevas características'] },
        pioneer: { name: 'Comité TC39', years: '1995 —', role: 'Comité de Estandarización', nationality: '🌍 Internacional', icon: '⚡', quote: 'JavaScript evoluciona para satisfacer las necesidades de los desarrolladores modernos.', bio: 'El comité TC39 de ECMA International mantiene y evoluciona el estándar ECMAScript. Sus miembros representan a empresas como Google, Microsoft, Mozilla y Apple.', inventionTitle: 'ECMAScript 2015 (ES6)', PioneerScene: ES6Scene }
      },
      {
        id: 'web3', year: '2017+',
        title: 'Web3 — La Descentralización',
        description: 'La Web3 promete una internet descentralizada basada en blockchain, tokens y DAOs.',
        icon: '🔗',
        milestone: { title: '¿Por qué es importante?', text: 'La Web3 busca devolver el control de los datos a los usuarios. Combina blockchain, IA y realidad virtual para crear una internet más abierta, justa y descentralizada.', facts: ['Ethereum (2015) fue la plataforma que popularizó las smart contracts', 'Los NFTs demostraron la propiedad digital en 2021', 'Los DAOs reimaginan la gobernanza organizacional'] },
        pioneer: { name: 'Gavin Wood', years: '1980 —', role: 'Científico de la Computación', nationality: '🇬🇧 Británico', icon: '🔗', quote: 'La Web3 es sobre la libertad de los datos y la descentralización del poder.', bio: 'Cofundador de Ethereum y creador de Polkadot. Acuñó el término "Web3" en 2014 y ha sido un defensor de la descentralización como camino hacia una internet más justa.', inventionTitle: 'El Concepto de Web3', PioneerScene: Web30Scene }
      }
    ]
  }
};

const HistoryPage = () => {
  const [view, setView] = useState('hub');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [personajesTab, setPersonajesTab] = useState('principales');

  const handleSelectCategory = (categoryId) => {
    const category = historyData.categories.find(c => c.id === categoryId);
    if (category && category.available) {
      setSelectedCategory(category);
      if (categoryId === 'personajes') {
        setPersonajesTab('principales');
        setView('personajes');
      } else if (categoryId === 'industrial') {
        setView('industrial');
      } else {
        setView('timeline');
      }
    }
  };

  const handleSelectEvent = (eventId) => {
    const events = historyData.events[selectedCategory.id] || [];
    const event = events.find(e => e.id === eventId)
      || (historyData.events.infravalorados || []).find(e => e.id === eventId);
    if (event) {
      setSelectedEvent(event);
      setView('detail');
    }
  };

  const handleGoBack = () => {
    if (view === 'detail') {
      setView(selectedCategory.id === 'personajes' ? 'personajes' : 'timeline');
    } else if (['timeline', 'industrial', 'personajes'].includes(view)) {
      setView('hub');
    }
  };

  const renderContent = () => {
    switch (view) {
      case 'timeline':
        return (
          <>
            <button onClick={handleGoBack} className="back-btn">← Volver a Categorías</button>
            <div className="history-header">
              <h2>{selectedCategory.icon} {selectedCategory.title}</h2>
              <p>Cada evento incluye su contexto histórico y el pionero que lo hizo posible.</p>
            </div>
            <TimelineMap events={historyData.events[selectedCategory.id] || []} selectedId={selectedEvent?.id} onSelect={handleSelectEvent} />
            <div className="timeline-container">
              {(historyData.events[selectedCategory.id] || []).map(event => (
                <div key={event.id} className="timeline-item-link" onClick={() => handleSelectEvent(event.id)}>
                  <div className="timeline-item">
                    <div className="timeline-icon">{event.icon}</div>
                    <div className="timeline-content">
                      <span className="timeline-year">{event.year}</span>
                      <h4>{event.title}</h4>
                      <p>{event.description}</p>
                      {event.pioneer && <span className="timeline-pioneer">👤 {event.pioneer.name}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        );

      case 'personajes':
        return (
          <>
            <button onClick={handleGoBack} className="back-btn">← Volver a Categorías</button>
            <div className="history-header">
              <h2>{selectedCategory.icon} {selectedCategory.title}</h2>
              <p>Los visionarios que construyeron los cimientos de la tecnología moderna.</p>
            </div>
            <div className="character-tabs">
              <button
                className={`character-tab ${personajesTab === 'principales' ? 'active' : ''}`}
                onClick={() => setPersonajesTab('principales')}
              >
                👤 Personajes Principales
              </button>
              <button
                className={`character-tab ${personajesTab === 'infravalorados' ? 'active' : ''}`}
                onClick={() => setPersonajesTab('infravalorados')}
              >
                🏆 Infravalorados
              </button>
            </div>
            {personajesTab === 'principales' ? (
              <>
                <CharacterTimeline
                  characters={historyData.events.personajes}
                  selectedId={selectedEvent?.id}
                  onSelect={handleSelectEvent}
                />
                <div className="characters-grid">
                  {historyData.events.personajes.map(char => (
                    <div key={char.id} className="character-card" onClick={() => handleSelectEvent(char.id)}>
                      <div className="character-card-avatar">{char.icon}</div>
                      <h3>{char.name}</h3>
                      <p className="character-card-subtitle">{char.subtitle}</p>
                      <span className="character-card-year">{char.year}</span>
                      <span className="character-card-explore">Ver más →</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="character-eras-intro">
                  Pioneros que la historia no recuerda lo suficiente pero cuyas ideas sostienen la tecnología moderna.
                </p>
                {['Precursores Antiguos', 'Era Mecánica', 'Pioneros Invisibilizados', 'Puente Moderno'].map(era => {
                  const chars = (historyData.events.infravalorados || []).filter(c => c.epoca === era);
                  if (chars.length === 0) return null;
                  const eraIcon = {
                    'Precursores Antiguos': '🏛️',
                    'Era Mecánica': '⚙️',
                    'Pioneros Invisibilizados': '💡',
                    'Puente Moderno': '🌉'
                  }[era] || '✨';
                  return (
                    <div key={era} className="character-era-group">
                      <h3 className="character-era-title">{eraIcon} {era}</h3>
                      <div className="characters-grid">
                        {chars.map(char => (
                          <div key={char.id} className="character-card" onClick={() => handleSelectEvent(char.id)}>
                            <div className="character-card-avatar">{char.icon}</div>
                            <h3>{char.name}</h3>
                            <p className="character-card-subtitle">{char.subtitle || char.description}</p>
                            <span className="character-card-year">{char.year}</span>
                            <span className="character-card-explore">Ver más →</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </>
        );

      case 'industrial':
        return (
          <>
            <button onClick={handleGoBack} className="back-btn">← Volver a Categorías</button>
            <div className="history-header">
              <h2>{selectedCategory.icon} {selectedCategory.title}</h2>
              <p>Cada evento incluye su contexto histórico y el pionero que lo hizo posible.</p>
            </div>
            <TimelineMap events={historyData.events[selectedCategory.id] || []} selectedId={selectedEvent?.id} onSelect={handleSelectEvent} />
            <div className="timeline-container">
              {(historyData.events[selectedCategory.id] || []).map(event => (
                <div key={event.id} className="timeline-item-link" onClick={() => handleSelectEvent(event.id)}>
                  <div className="timeline-item">
                    <div className="timeline-icon">{event.icon}</div>
                    <div className="timeline-content">
                      <span className="timeline-year">{event.year}</span>
                      <h4>{event.title}</h4>
                      <p>{event.description}</p>
                      {event.pioneer && <span className="timeline-pioneer">👤 {event.pioneer.name}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        );

      case 'detail':
        return (
          <>
            <button onClick={handleGoBack} className="back-btn">← {selectedCategory.id === 'personajes' ? 'Volver a Personajes' : 'Volver a la Línea de Tiempo'}</button>
            <div className="detail-header">
              <h2>{selectedEvent.icon || selectedEvent.name} {selectedEvent.title || selectedEvent.name}</h2>
              <p className="detail-year-badge">{selectedEvent.year}</p>
            </div>
            <div className="detail-main-description">
              <p>{selectedEvent.description}</p>
            </div>
            {selectedEvent.logro && (
              <div className="achievement-card">
                <h3>🏆 Logro clave</h3>
                <p>{selectedEvent.logro}</p>
              </div>
            )}
            {selectedEvent.milestone && (
              <div className="milestone-card">
                <h3>{selectedEvent.milestone.title}</h3>
                <p>{selectedEvent.milestone.text}</p>
                {selectedEvent.milestone.facts && (
                  <ul className="milestone-facts">
                    {selectedEvent.milestone.facts.map((fact, i) => <li key={i}>{fact}</li>)}
                  </ul>
                )}
              </div>
            )}
            {selectedEvent.pioneer && <PioneerBioCard pioneer={selectedEvent.pioneer} />}
            {selectedCategory.id === 'personajes' && selectedEvent.bio && (
              <CharacterCard character={selectedEvent} />
            )}
          </>
        );

      default:
        return (
          <>
            <div className="history-header">
              <h2>Un Viaje a Través del Tiempo Tecnológico</h2>
              <p>Explora los pioneros y momentos clave que definieron el mundo digital.</p>
            </div>
            <div className="history-cards-grid">
              {historyData.categories.map(cat => (
                <div key={cat.id} className="history-card" onClick={() => handleSelectCategory(cat.id)}>
                  <div className="history-card-icon">{cat.icon}</div>
                  <h3>{cat.title}</h3>
                  <p>{cat.description}</p>
                  <div className="explore-btn-container">
                    <span className="explore-btn">Explorar →</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        );
    }
  };

  return (
    <div className="page-container">
      <Header />
      <main className="main-content-history">
        {renderContent()}
      </main>
    </div>
  );
};

const PioneerBioCard = ({ pioneer }) => {
  if (!pioneer) return null;
  const Scene = pioneer.PioneerScene;
  return (
    <div className="pioneer-card">
      <div className="pioneer-header">
        <div className="pioneer-avatar">
          <span className="pioneer-avatar-icon">{pioneer.icon}</span>
        </div>
        <div className="pioneer-info">
          <h3 className="pioneer-name">{pioneer.name}</h3>
          <div className="pioneer-meta">
            <span className="pioneer-years">{pioneer.years}</span>
            <span className="pioneer-separator">·</span>
            <span className="pioneer-role">{pioneer.role}</span>
            <span className="pioneer-separator">·</span>
            <span className="pioneer-nationality">{pioneer.nationality}</span>
          </div>
        </div>
      </div>
      {pioneer.quote && <blockquote className="pioneer-quote">"{pioneer.quote}"</blockquote>}
      <p className="pioneer-bio">{pioneer.bio}</p>
      {Scene && (
        <div className="pioneer-invention">
          <h4 className="pioneer-invention-title">{pioneer.inventionTitle}</h4>
          <Suspense fallback={<LoadingFallback />}><Scene /></Suspense>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
