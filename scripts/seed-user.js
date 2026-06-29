#!/usr/bin/env node
// Script: crear usuario de prueba en la BD
// Uso: node scripts/seed-user.js

import postgres from 'postgres';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';

config(); // Carga .env

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('❌ Falta DATABASE_URL en .env');
  process.exit(1);
}

const sql = postgres(DATABASE_URL);

async function seedUser() {
  const email = 'prueba@academia.dev';
  const password = 'Prueba123!';
  const full_name = 'Usuario de Prueba';

  const adminEmail = 'admin@academia.dev';
  const adminPassword = 'Admin123!';
  const adminName = 'Administrador';

  try {
    // Asegurar que el schema esté cargado
    console.log('🔄 Conectando a la base de datos...');

    // Hash de contraseñas
    const password_hash = await bcrypt.hash(password, 10);
    const admin_password_hash = await bcrypt.hash(adminPassword, 10);
    console.log('🔐 Contraseñas hasheadas');

    // Insertar usuario student (o actualizar si ya existe)
    const result = await sql`
      INSERT INTO users (email, password_hash, full_name, role)
      VALUES (${email}, ${password_hash}, ${full_name}, 'student')
      ON CONFLICT (email) DO UPDATE
        SET password_hash = EXCLUDED.password_hash,
            full_name = EXCLUDED.full_name
      RETURNING id, email, full_name, role
    `;

    const user = result[0];
    console.log('\n✅ Usuario de prueba listo:');
    console.log('─────────────────────────────');
    console.log(`📧 Email:      ${email}`);
    console.log(`🔑 Contraseña: ${password}`);
    console.log(`👤 Nombre:     ${full_name}`);
    console.log(`🆔 ID:         ${user.id}`);
    console.log(`🎭 Rol:        ${user.role}`);
    console.log('─────────────────────────────');

    // Insertar usuario admin (o actualizar si ya existe)
    const adminResult = await sql`
      INSERT INTO users (email, password_hash, full_name, role)
      VALUES (${adminEmail}, ${admin_password_hash}, ${adminName}, 'admin')
      ON CONFLICT (email) DO UPDATE
        SET password_hash = EXCLUDED.password_hash,
            full_name = EXCLUDED.full_name,
            role = 'admin'
      RETURNING id, email, full_name, role
    `;

    const adminUser = adminResult[0];
    console.log('\n🛡️ Usuario ADMIN listo:');
    console.log('─────────────────────────────');
    console.log(`📧 Email:      ${adminEmail}`);
    console.log(`🔑 Contraseña: ${adminPassword}`);
    console.log(`👤 Nombre:     ${adminName}`);
    console.log(`🆔 ID:         ${adminUser.id}`);
    console.log(`🎭 Rol:        ${adminUser.role}`);
    console.log('─────────────────────────────');

    // Seed base courses
    console.log('📚 Syncing base courses...');
    
    // FIX: Asegurar que la restricción UNIQUE existe antes de insertar
    try {
      // 1. Eliminar duplicados manteniendo el más reciente
      await sql`
        DELETE FROM courses 
        WHERE id NOT IN (
          SELECT id FROM (
            SELECT id, ROW_NUMBER() OVER (PARTITION BY url ORDER BY created_at DESC) as rn
            FROM courses
          ) t
          WHERE t.rn = 1
        )
      `;
      
      // 2. Intentar añadir la restricción
      await sql`ALTER TABLE courses ADD CONSTRAINT courses_url_unique UNIQUE (url)`;
      console.log('✅ Base de datos preparada con restricción UNIQUE');
    } catch (e) {
      // Ignorar si ya existe
      if (!e.message.includes('already exists')) {
        console.log('⚠️  Nota:', e.message);
      }
    }

    const baseCourses = [
      {
        title: 'Git Master',
        description: 'Domina el control de versiones en 7 días con visualizaciones interactivas.',
        icon: '🧡',
        color: '#f97316',
        slides: 7,
        url: '/git',
        active: true
      },
      {
        title: 'HTML5',
        description: 'Estructura semántica y fundamentos de la web moderna.',
        icon: '📄',
        color: '#3498db',
        slides: 7,
        url: '/html',
        active: true
      },
      {
        title: 'CSS3 Moderno',
        description: 'Diseños increíbles con Flexbox, Grid y Animaciones.',
        icon: '🎨',
        color: '#0ea5e9',
        slides: 8,
        url: '/css',
        active: true
      },
      {
        title: 'JavaScript 2025',
        description: 'De novato a ninja con el lenguaje más popular del mundo.',
        icon: '⚡',
        color: '#facc15',
        slides: 11,
        url: '/js',
        active: true
      },
      {
        title: 'Python Pro',
        description: 'Programación versátil: desde scripts básicos hasta IA.',
        icon: '🐍',
        color: '#10b981',
        slides: 10,
        url: '/python',
        active: true
      },
      {
        title: 'React.js Mastery',
        description: 'Construye interfaces de usuario modernas y reactivas.',
        icon: '⚛️',
        color: '#06b6d4',
        slides: 3,
        url: '/react',
        active: true
      },
      {
        title: 'Backend Node.js',
        description: 'Escalabilidad y arquitectura con Node, Express y SQL.',
        icon: '⚙️',
        color: '#ec4899',
        slides: 7,
        url: '/backend',
        active: true
      }
    ];

    for (const course of baseCourses) {
      await sql`
        INSERT INTO courses (title, description, icon, color, slides, url, active)
        VALUES (${course.title}, ${course.description}, ${course.icon}, ${course.color}, ${course.slides}, ${course.url}, ${course.active})
        ON CONFLICT (url) DO UPDATE SET
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          icon = EXCLUDED.icon,
          color = EXCLUDED.color,
          slides = EXCLUDED.slides
      `;
    }
    console.log('✅ Base courses synced');

    console.log('\n🚀 Ya puedes iniciar sesión en http://localhost:4321');

  } catch (error) {
    if (error.code === '42P01') {
      console.error('\n⚠️  Las tablas no existen todavía. Ejecuta primero:');
      console.error('   docker-compose up -d');
      console.error('   (El schema se aplica automáticamente al iniciar el contenedor)\n');
    } else {
      console.error('❌ Error crítico:', error.message);
    }
  } finally {
    await sql.end();
  }
}

seedUser();
