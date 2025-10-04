import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Validación de variables de entorno
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Variables de entorno de Supabase no configuradas');
  console.error('REACT_APP_SUPABASE_URL:', supabaseUrl ? '✅ Configurada' : '❌ Falta');
  console.error('REACT_APP_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Configurada' : '❌ Falta');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
