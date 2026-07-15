import postgres from 'postgres';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/academia';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const schemaPath = path.resolve(__dirname, '../../schema.sql');

let sql;
let schemaInitializationPromise = null;

try {
  sql = postgres(connectionString, {
    max: 10,
    idle_timeout: 20,
    connect_timeout: 5, // Reducido para fallar más rápido en local si no hay DB
  });
} catch (error) {
  console.error('❌ Error de inicialización de Postgres:', error.message);
}

async function initializeDatabase() {
  if (!sql) return false;
  if (schemaInitializationPromise) return schemaInitializationPromise;

  schemaInitializationPromise = (async () => {
    try {
      const result = await sql`SELECT to_regclass('public.users') AS users_table`;
      const usersTableExists = result?.[0]?.users_table;

      if (!usersTableExists) {
        const schemaSql = await readFile(schemaPath, 'utf8');
        const statements = schemaSql
          .split(';')
          .map(s => s.trim())
          .filter(s => s.length > 0 && !s.startsWith('--'));
        
        for (const stmt of statements) {
          await sql.unsafe(stmt);
        }
        console.log('✅ Esquema de base de datos inicializado (' + statements.length + ' sentencias)');
      } else {
        console.log('✅ Esquema de base de datos ya disponible');

        // Ensure test users exist (for DBs created before schema.sql had user seeds)
        try {
          await sql`INSERT INTO users (email, password_hash, full_name, role)
            VALUES ('prueba@academia.dev', crypt('Prueba123!', gen_salt('bf', 10)), 'Usuario de Prueba', 'student')
            ON CONFLICT (email) DO NOTHING`;
          await sql`INSERT INTO users (email, password_hash, full_name, role)
            VALUES ('admin@academia.dev', crypt('Admin123!', gen_salt('bf', 10)), 'Administrador', 'admin')
            ON CONFLICT (email) DO NOTHING`;
          console.log('✅ Usuarios de prueba verificados');
        } catch (e) {
          console.warn('⚠️ No se pudieron crear usuarios de prueba:', e.message);
        }

        // Ensure all 7 courses exist
        try {
          const courses = [
            ['Git Master', 'Domina el control de versiones en 7 días con visualizaciones interactivas.', '🧡', '#f97316', 7, '/git'],
            ['HTML5', 'Estructura semántica y fundamentos de la web moderna.', '📄', '#3498db', 7, '/html'],
            ['CSS3 Moderno', 'Diseños increíbles con Flexbox, Grid y Animaciones.', '🎨', '#0ea5e9', 8, '/css'],
            ['JavaScript 2025', 'De novato a ninja con el lenguaje más popular del mundo.', '⚡', '#facc15', 11, '/js'],
            ['Python Pro', 'Programación versátil: desde scripts básicos hasta IA.', '🐍', '#10b981', 10, '/python'],
            ['React.js Mastery', 'Construye interfaces de usuario modernas y reactivas.', '⚛️', '#06b6d4', 3, '/react'],
            ['Backend Node.js', 'Escalabilidad y arquitectura con Node, Express y SQL.', '⚙️', '#ec4899', 7, '/backend'],
          ];
          for (const [title, desc, icon, color, slides, url] of courses) {
            await sql`INSERT INTO courses (title, description, icon, color, slides, url, active)
              VALUES (${title}, ${desc}, ${icon}, ${color}, ${slides}, ${url}, true)
              ON CONFLICT (url) DO UPDATE SET
                title = EXCLUDED.title, description = EXCLUDED.description,
                icon = EXCLUDED.icon, color = EXCLUDED.color, slides = EXCLUDED.slides`;
          }
          console.log('✅ Cursos base verificados');
        } catch (e) {
          console.warn('⚠️ No se pudieron verificar cursos:', e.message);
        }
      }

      return true;
    } catch (error) {
      console.warn('⚠️ No se pudo verificar o inicializar el esquema automáticamente:', error.message);
      return false;
    }
  })();

  return schemaInitializationPromise;
}

await initializeDatabase();

export default sql;

export { initializeDatabase };

// Helper to check connection status
export async function checkConnection() {
  if (!sql) return false;

  try {
    await initializeDatabase();
    const result = await sql`SELECT 1+1 AS result`;
    const isOk = result && result[0] && result[0].result === 2;
    if (isOk) console.log('✅ Base de Datos Conectada');
    return isOk;
  } catch (error) {
    if (error.code === 'ECONNREFUSED' || error.message.includes('permission denied')) {
      console.warn('⚠️ Base de Datos Offline o Permiso Denegado. Corriendo en modo limitado.');
    } else {
      console.error('❌ Error de Base de Datos:', error.message);
    }
    return false;
  }
}
