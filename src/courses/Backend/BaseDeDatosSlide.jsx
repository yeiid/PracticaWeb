import React, { useState } from 'react';
import styles from './BackendSlides.module.css';

export const BaseDeDatosSlide = () => {
  const [showMongoExample, setShowMongoExample] = useState(false);
  const [showPostgresExample, setShowPostgresExample] = useState(false);

  return (
    <div className={styles.slide}>
      <h1 className={styles.title}>Bases de Datos en Node.js</h1>
      
      <div className={styles.content}>
        <p>Las bases de datos son esenciales para almacenar y gestionar los datos de tu aplicación de manera persistente.</p>
        
        <h3 className={styles.subtitle}>Tipos de Bases de Datos</h3>
        
        <div className={styles.exampleContainer}>
          <div className={styles.exampleTitle}>Bases de Datos SQL (Relacionales)</div>
          <ul>
            <li>PostgreSQL</li>
            <li>MySQL / MariaDB</li>
            <li>SQLite</li>
          </ul>
          <p>Usan un esquema definido y relaciones entre tablas.</p>
        </div>

        <div className={styles.exampleContainer}>
          <div className={styles.exampleTitle}>Bases de Datos NoSQL</div>
          <ul>
            <li>MongoDB (documentos)</li>
            <li>Redis (clave-valor)</li>
            <li>Cassandra (columnar)</li>
          </ul>
          <p>Más flexibles, sin esquema fijo.</p>
        </div>

        <h3 className={styles.subtitle}>MongoDB con Mongoose</h3>
        
        <button 
          onClick={() => setShowMongoExample(!showMongoExample)}
          className={styles.navButton}
          style={{ marginBottom: '1rem' }}
        >
          {showMongoExample ? 'Ocultar ejemplo de MongoDB' : 'Mostrar ejemplo de MongoDB'}
        </button>
        
        {showMongoExample && (
          <div className={styles.codeBlock}>
{`// models/Usuario.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  nombre: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  password: { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Usuario', usuarioSchema);

// En tu archivo principal
const mongoose = require('mongoose');
const Usuario = require('./models/Usuario');

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/mi-base-de-datos', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Crear un nuevo usuario
const nuevoUsuario = new Usuario({
  nombre: 'Juan Pérez',
  email: 'juan@example.com',
  password: 'contraseña-segura'
});

nuevoUsuario.save()
  .then(usuario => console.log('Usuario creado:', usuario))
  .catch(err => console.error('Error al crear usuario:', err));`}
          </div>
        )}

        <h3 className={styles.subtitle}>PostgreSQL con Sequelize</h3>
        
        <button 
          onClick={() => setShowPostgresExample(!showPostgresExample)}
          className={styles.navButton}
          style={{ marginBottom: '1rem' }}
        >
          {showPostgresExample ? 'Ocultar ejemplo de PostgreSQL' : 'Mostrar ejemplo de PostgreSQL'}
        </button>
        
        {showPostgresExample && (
          <div className={styles.codeBlock}>
{`// models/Usuario.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://usuario:contraseña@localhost:5432/mi-base-de-datos');

const Usuario = sequelize.define('Usuario', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
  createdAt: 'fechaCreacion',
  updatedAt: 'fechaActualizacion'
});

// Sincronizar el modelo con la base de datos
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida con PostgreSQL');
    
    // Sincronizar todos los modelos
    await sequelize.sync({ alter: true });
    console.log('Modelos sincronizados');
    
    // Crear un nuevo usuario
    const usuario = await Usuario.create({
      nombre: 'Ana García',
      email: 'ana@example.com',
      password: 'contraseña-segura'
    });
    
    console.log('Usuario creado:', usuario.toJSON());
  } catch (error) {
    console.error('Error:', error);
  }
})();`}
          </div>
        )}

        <div className={styles.note}>
          <div className={styles.noteTitle}>Buenas Prácticas</div>
          <ul>
            <li>Usar variables de entorno para credenciales de la base de datos</li>
            <li>Implementar migraciones para cambios en el esquema</li>
            <li>Usar transacciones para operaciones atómicas</li>
            <li>Implementar índices para consultas frecuentes</li>
            <li>Hacer copias de seguridad periódicas</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
