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

  try {
    // Asegurar que el schema esté cargado
    console.log('🔄 Conectando a la base de datos...');

    // Hash de contraseña
    const password_hash = await bcrypt.hash(password, 10);
    console.log('🔐 Contraseña hasheada');

    // Insertar usuario (o actualizar si ya existe)
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

    // Seed base courses
    console.log('📚 Syncing base courses...');
    await sql`
      INSERT INTO courses (title, description, icon, color, slides, url, active)
      VALUES 
        ('Git Master', 'Domina el control de versiones en 7 días con visualizaciones interactivas.', '🧡', '#f97316', 7, '/git', true),
        ('Backend Pro', 'Node.js, Express y bases de datos desde cero.', '⚙️', '#6366f1', 7, '/backend', true)
      ON CONFLICT DO NOTHING
    `;
    console.log('✅ Base courses synced');

    console.log('\n🚀 Ya puedes iniciar sesión en http://localhost:3000/login');

  } catch (error) {
    if (error.code === '42P01') {
      console.error('\n⚠️  Las tablas no existen todavía. Ejecuta primero:');
      console.error('   docker-compose up -d');
      console.error('   (El schema se aplica automáticamente al iniciar el contenedor)\n');
    } else {
      console.error('❌ Error:', error.message);
    }
  } finally {
    await sql.end();
  }
}

seedUser();
