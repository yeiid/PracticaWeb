import type { APIRoute } from 'astro';
import sql from '../../../lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const p = process['env'];

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email y contraseña requeridos' }), { status: 400 });
    }

    const users = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (users.length === 0) {
      return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), { status: 401 });
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: 'Contraseña incorrecta' }), { status: 401 });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, tenant_id: user.tenant_id, role: user.role },
      process['env']['JWT_SECRET']||'dev-fallback',
      { expiresIn: '7d' }
    );

    const cookie = serialize('session', token, {
      httpOnly: true,
      secure: p['NODE_ENV'] === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    });

    return new Response(JSON.stringify({ user: { id: user.id, email: user.email, full_name: user.full_name, role: user.role } }), {
      status: 200,
      headers: {
        'Set-Cookie': cookie,
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Error en Login API:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), { status: 500 });
  }
};
