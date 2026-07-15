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
