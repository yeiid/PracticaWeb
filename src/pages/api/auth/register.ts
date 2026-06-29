import type { APIRoute } from 'astro';
import sql from '../../../lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';


export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, password, full_name, tenant_id } = await request.json();

    if (!email || !password || !full_name) {
      return new Response(JSON.stringify({ error: 'Faltan campos obligatorios' }), { status: 400 });
    }

    // Hash de contraseña
    const password_hash = await bcrypt.hash(password, 10);

    // Insertar usuario
    const users = await sql`
      INSERT INTO users (email, password_hash, full_name, tenant_id)
      VALUES (${email}, ${password_hash}, ${full_name}, ${tenant_id || null})
      RETURNING id, email, full_name, tenant_id, role
    `;

    const user = users[0];

    // Autologin after registration
    const token = jwt.sign(
      { id: user.id, email: user.email, tenant_id: user.tenant_id, role: user.role },
      process['env']['JWT_SECRET']||'dev-fallback',
      { expiresIn: '7d' }
    );

    const cookie = serialize('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 días
    });

    return new Response(JSON.stringify({ user: { id: user.id, email: user.email, full_name: user.full_name, role: user.role } }), {
      status: 201,
      headers: {
        'Set-Cookie': cookie,
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Error en Register API:', error);
    if (error.code === '23505') { // Unique violation
      return new Response(JSON.stringify({ error: 'El email ya está registrado' }), { status: 409 });
    }
    return new Response(JSON.stringify({ error: 'Error al registrar el usuario' }), { status: 500 });
  }
};
