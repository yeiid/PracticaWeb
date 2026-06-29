import type { APIRoute } from 'astro';
import sql from '../../../lib/db';
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
    const { full_name, email } = await request.json();

    if (!full_name || !email) {
      return new Response(JSON.stringify({ error: 'Faltan campos obligatorios' }), { status: 400 });
    }

    await sql`
      UPDATE users 
      SET full_name = ${full_name}, email = ${email}, updated_at = now()
      WHERE id = ${payload.id}
    `;

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error: any) {
    console.error('Error en Update Profile API:', error);
    if (error.code === '23505') {
      return new Response(JSON.stringify({ error: 'El email ya está en uso' }), { status: 409 });
    }
    return new Response(JSON.stringify({ error: 'Error al actualizar el perfil' }), { status: 500 });
  }
};
