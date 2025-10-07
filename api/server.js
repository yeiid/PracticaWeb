require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Middleware de autenticación
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Authentication error' });
  }
};

// API Routes

// Obtener progreso del usuario autenticado
app.get('/api/progress', authMiddleware, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('progress')
      .select('*')
      .eq('user_id', req.user.id)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // Ignorar si no hay filas

    res.json(data || { user_id: req.user.id, progress_data: {} });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener progreso' });
  }
});

// Actualizar progreso del usuario
app.post('/api/progress', authMiddleware, async (req, res) => {
  try {
    const { progress_data } = req.body;
    const { data, error } = await supabase
      .from('progress')
      .upsert({ user_id: req.user.id, progress_data }, { onConflict: 'user_id' })
      .select();

    if (error) throw error;

    res.json({ success: true, data: data[0] });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar progreso' });
  }
});

// Generar un certificado
app.post('/api/certificates', authMiddleware, async (req, res) => {
  try {
    const { course_id, student_name } = req.body;
    const { data, error } = await supabase
      .from('certificates')
      .insert({ user_id: req.user.id, course_id, student_name })
      .select();

    if (error) throw error;

    res.status(201).json({ success: true, certificate: data[0] });
  } catch (error) {
    res.status(500).json({ error: 'Error al generar certificado' });
  }
});

// Obtener certificados del usuario
app.get('/api/certificates', authMiddleware, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('user_id', req.user.id);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener certificados' });
  }
});

// Rutas para el perfil de usuario

// Obtener perfil del usuario
app.get('/api/profile', authMiddleware, async (req, res) => {
  // El middleware ya nos da el usuario, así que simplemente lo devolvemos
  res.json(req.user);
});

// Actualizar perfil del usuario (nombre, etc.)
app.put('/api/profile', authMiddleware, async (req, res) => {
  const { full_name } = req.body;
  const { error } = await supabase.auth.updateUser({
    data: { full_name }
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.json({ success: true, message: 'Perfil actualizado correctamente.' });
});

// Actualizar credenciales del usuario (email/contraseña)
app.put('/api/auth/user', authMiddleware, async (req, res) => {
  const { email, password } = req.body;
  const updates = {};
  if (email) updates.email = email;
  if (password) updates.password = password;

  const { error } = await supabase.auth.updateUser(updates);

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.json({ success: true, message: 'Credenciales actualizadas correctamente.' });
});

// Obtener cursos activos
app.get('/api/courses', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('active', true)
      .order('created_at');

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener cursos' });
  }
});

// Obtener todos los cursos (solo para administradores en producción)
app.get('/api/courses/admin', authMiddleware, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at');

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener cursos' });
  }
});

// Crear nuevo curso
app.post('/api/courses', authMiddleware, async (req, res) => {
  try {
    const { title, description, icon, color, slides, url } = req.body;
    const { data, error } = await supabase
      .from('courses')
      .insert({ title, description, icon, color, slides, url })
      .select();

    if (error) throw error;

    res.status(201).json({ success: true, course: data[0] });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear curso' });
  }
});

// Actualizar curso
app.put('/api/courses/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, icon, color, slides, url, active } = req.body;
    const { data, error } = await supabase
      .from('courses')
      .update({ title, description, icon, color, slides, url, active })
      .eq('id', id)
      .select();

    if (error) throw error;

    res.json({ success: true, course: data[0] });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar curso' });
  }
});

// Eliminar curso
app.delete('/api/courses/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ success: true, message: 'Curso eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar curso' });
  }
});


// Export the Express app as a serverless function
module.exports = app;
