import postgres from 'postgres';
import { config } from 'dotenv';

config();

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/academia';

const sql = postgres(DATABASE_URL, { max: 5 });

const migrations = [
  `ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT false`,
  `UPDATE users SET email_verified = true WHERE email_verified IS NULL`,
  `CREATE TABLE IF NOT EXISTS email_verification_tokens (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    token TEXT NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(token)
  )`,
  `CREATE TABLE IF NOT EXISTS support_tickets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    category TEXT DEFAULT 'general',
    status TEXT DEFAULT 'open',
    priority TEXT DEFAULT 'normal',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS ticket_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ticket_id UUID REFERENCES support_tickets(id) ON DELETE CASCADE NOT NULL,
    responder_id UUID REFERENCES users(id) ON DELETE SET NULL,
    message TEXT NOT NULL,
    is_staff BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS forum_threads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT DEFAULT 'general',
    status TEXT DEFAULT 'open',
    replies_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS forum_replies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    thread_id UUID REFERENCES forum_threads(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    is_staff BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS idx_forum_threads_created_at ON forum_threads(created_at DESC)`,
  `CREATE INDEX IF NOT EXISTS idx_forum_threads_category_status ON forum_threads(category, status)`,
  `CREATE INDEX IF NOT EXISTS idx_forum_threads_user_id ON forum_threads(user_id)`,
  `CREATE INDEX IF NOT EXISTS idx_forum_replies_thread_id ON forum_replies(thread_id, created_at)`,
  `CREATE OR REPLACE FUNCTION increment_forum_replies_count()
    RETURNS TRIGGER AS $$
    BEGIN
      UPDATE forum_threads SET replies_count = replies_count + 1, updated_at = timezone('utc'::text, now()) WHERE id = NEW.thread_id;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql`,
  `DROP TRIGGER IF EXISTS inc_forum_replies ON forum_replies`,
  `CREATE TRIGGER inc_forum_replies AFTER INSERT ON forum_replies FOR EACH ROW EXECUTE FUNCTION increment_forum_replies_count()`,
  `DROP TRIGGER IF EXISTS update_forum_threads_updated_at ON forum_threads`,
  `CREATE TRIGGER update_forum_threads_updated_at BEFORE UPDATE ON forum_threads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()`,
];

async function migrate() {
  console.log('🔧 Ejecutando migraciones de base de datos...');
  for (const sqlQuery of migrations) {
    try {
      await sql.unsafe(sqlQuery);
      console.log(`  ✅ Migración ejecutada: ${sqlQuery.slice(0, 60)}...`);
    } catch (err) {
      console.error(`  ❌ Error en migración: ${err.message}`);
    }
  }
  console.log('✅ Migraciones completadas');
  await sql.end();
}

migrate();
