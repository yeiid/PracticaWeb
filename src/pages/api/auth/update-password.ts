import type { APIRoute } from 'astro';
import sql from '../../../lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

const _s = process.env._s || 'your-secret-key';

export const POST: APIRoute = async ({ request }) => {
  try {
    const cookies = parse(request.headers.get('cookie') || '');
    const token = cookies.session;

    if (!token) {
      return new Response(JSON.stringify({ error: 'No autenticado' }), { status: 401 });
    }

    const payload = jwt.verify(token, _s) as any;
    const { password } = await request.json();

    if (!password || password.length < 6) {
      return new Response(JSON.stringify({ error: 'La contraseña debe tener al menos 6 caracteres' }), { status: 400 });
    }

    const password_hash = await bcrypt.hash(password, 10);

    await sql`
      UPDATE users SET password_hash = ${password_hash}, updated_at = now()
      WHERE id = ${payload.id}
    `;

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error) {
    console.error('Error en Update Password API:', error);
    return new Response(JSON.stringify({ error: 'Error al actualizar la contraseña' }), { status: 500 });
  }
};
