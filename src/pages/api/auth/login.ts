import type { APIRoute } from 'astro';
import sql from '../../../lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email y contraseña requeridos' }), { status: 400 });
    }

    // Buscar usuario en la base de datos (auth.users no existe en Postgres directo, usaremos una tabla custom)
    // Para simplificar la migración, asumo que existe una tabla 'users' en el esquema public
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

    // Generar JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, tenant_id: user.tenant_id },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Crear cookie de sesión
    const cookie = serialize('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 días
    });

    return new Response(JSON.stringify({ user: { id: user.id, email: user.email, full_name: user.full_name } }), {
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
