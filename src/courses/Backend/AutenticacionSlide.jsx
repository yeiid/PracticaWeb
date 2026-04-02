import React, { useState } from 'react';
import styles from './BackendSlides.module.css';

export const AutenticacionSlide = () => {
  const [showJWTExample, setShowJWTExample] = useState(false);
  const [showPassportExample, setShowPassportExample] = useState(false);

  return (
    <div className={styles.slide}>
      <h1 className={styles.title}>Autenticación y Seguridad</h1>
      
      <div className={styles.content}>
        <p>La autenticación es un aspecto crítico de cualquier aplicación web que maneje usuarios.</p>
        
        <h3 className={styles.subtitle}>Métodos de Autenticación</h3>
        
        <div className={styles.exampleContainer}>
          <div className={styles.exampleTitle}>1. Autenticación Basada en Sesiones</div>
          <ul>
            <li>El servidor almacena la sesión del usuario</li>
            <li>Se usa una cookie con un ID de sesión</li>
            <li>Ejemplo: Express-session</li>
          </ul>
        </div>

        <div className={styles.exampleContainer}>
          <div className={styles.exampleTitle}>2. JSON Web Tokens (JWT)</div>
          <ul>
            <li>Sin estado (stateless)</li>
            <li>El token contiene toda la información necesaria</li>
            <li>Se envía en el encabezado de autorización</li>
          </ul>
        </div>

        <h3 className={styles.subtitle}>Implementación con JWT</h3>
        
        <button 
          onClick={() => setShowJWTExample(!showJWTExample)}
          className={styles.navButton}
          style={{ marginBottom: '1rem' }}
        >
          {showJWTExample ? 'Ocultar ejemplo de JWT' : 'Mostrar ejemplo de JWT'}
        </button>
        
        {showJWTExample && (
          <div className={styles.codeBlock}>
{`// auth/jwt.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generarToken = (usuario) => {
  return jwt.sign(
    { 
      id: usuario.id, 
      email: usuario.email,
      rol: usuario.rol 
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

const verificarToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Middleware de autenticación
const autenticar = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  const usuario = verificarToken(token);
  if (!usuario) {
    return res.status(403).json({ mensaje: 'Token inválido o expirado' });
  }

  req.usuario = usuario;
  next();
};

module.exports = { generarToken, autenticar };

// Uso en las rutas
const express = require('express');
const router = express.Router();
const { generarToken, autenticar } = require('../auth/jwt');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Verificar credenciales (ejemplo simplificado)
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario || !await bcrypt.compare(password, usuario.password)) {
    return res.status(401).json({ mensaje: 'Credenciales inválidas' });
  }

  // Generar token
  const token = generarToken(usuario);
  res.json({ token });
});

// Ruta protegida
router.get('/perfil', autenticar, (req, res) => {
  res.json({ usuario: req.usuario });
});`}
          </div>
        )}

        <h3 className={styles.subtitle}>Autenticación con Passport.js</h3>
        
        <button 
          onClick={() => setShowPassportExample(!showPassportExample)}
          className={styles.navButton}
          style={{ marginBottom: '1rem' }}
        >
          {showPassportExample ? 'Ocultar ejemplo de Passport' : 'Mostrar ejemplo de Passport'}
        </button>
        
        {showPassportExample && (
          <div className={styles.codeBlock}>
{`// auth/local-strategy.js
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          const usuario = await Usuario.findOne({ where: { email } });
          
          if (!usuario) {
            return done(null, false, { message: 'Usuario no encontrado' });
          }
          
          const esValido = await bcrypt.compare(password, usuario.password);
          
          if (!esValido) {
            return done(null, false, { message: 'Contraseña incorrecta' });
          }
          
          return done(null, usuario);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Serializar usuario para la sesión
  passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
  });

  // Deserializar usuario de la sesión
  passport.deserializeUser(async (id, done) => {
    try {
      const usuario = await Usuario.findByPk(id);
      done(null, usuario);
    } catch (error) {
      done(error);
    }
  });
};

// En tu archivo principal (app.js o index.js)
const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./auth/local-strategy')(passport);

const app = express();

// Configuración de sesión
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Rutas de autenticación
app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',  
  failureRedirect: '/login',
  failureFlash: true
}));

// Middleware para verificar autenticación
const estaAutenticado = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

// Ruta protegida
app.get('/perfil', estaAutenticado, (req, res) => {
  res.json({ usuario: req.user });
});`}
          </div>
        )}

        <div className={styles.note}>
          <div className={styles.noteTitle}>Buenas Prácticas de Seguridad</div>
          <ul>
            <li>Nunca almacenar contraseñas en texto plano - siempre usar hash (bcrypt, Argon2)</li>
            <li>Usar HTTPS en producción</li>
            <li>Implementar protección contra ataques CSRF</li>
            <li>Limitar los intentos de inicio de sesión</li>
            <li>Usar encabezados de seguridad como Helmet.js</li>
            <li>Validar y sanitizar toda la entrada del usuario</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
