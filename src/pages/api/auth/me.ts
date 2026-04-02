import type { APIRoute } from 'astro';
import sql from '../../../lib/db';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const GET: APIRoute = async ({ request }) => {
  try {
    const cookies = parse(request.headers.get('cookie') || '');
    const token = cookies.session;

    if (!token) {
      return new Response(JSON.stringify({ user: null }), { status: 401 });
    }

    const payload = jwt.verify(token, JWT_SECRET) as any;

    const users = await sql`
      SELECT id, email, full_name, tenant_id FROM users WHERE id = ${payload.id}
    `;

    if (users.length === 0) {
      return new Response(JSON.stringify({ user: null }), { status: 404 });
    }

    return new Response(JSON.stringify({ user: users[0] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error en Me API:', error);
    return new Response(JSON.stringify({ user: null }), { status: 401 });
  }
};
