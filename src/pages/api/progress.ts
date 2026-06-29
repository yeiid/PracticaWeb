import type { APIRoute } from 'astro';
import sql from '../../lib/db';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

const _s = process.env._s || 'your-secret-key';

// Helper to get authenticated user from session
const getAuthUser = (request: Request) => {
  try {
    const cookies = parse(request.headers.get('cookie') || '');
    const token = cookies.session;
    if (!token) return null;
    return jwt.verify(token, _s) as any;
  } catch {
    return null;
  }
};

export const GET: APIRoute = async ({ request }) => {
  const authUser = getAuthUser(request);
  if (!authUser) return new Response(null, { status: 401 });

  try {
    const progress = await sql`
      SELECT progress_data FROM progress 
      WHERE user_id = ${authUser.id} AND tenant_id = ${authUser.tenant_id}
    `;

    return new Response(JSON.stringify(progress[0]?.progress_data || {}), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error GET /api/progress:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener progreso' }), { status: 500 });
  }
};

export const POST: APIRoute = async ({ request }) => {
  const authUser = getAuthUser(request);
  if (!authUser) return new Response(null, { status: 401 });

  try {
    const { progress_data } = await request.json();

    const result = await sql`
      INSERT INTO progress (user_id, tenant_id, progress_data, updated_at)
      VALUES (${authUser.id}, ${authUser.tenant_id}, ${progress_data}, now())
      ON CONFLICT (user_id) DO UPDATE 
      SET progress_data = ${progress_data}, updated_at = now()
      RETURNING id
    `;

    return new Response(JSON.stringify({ success: true, id: result[0].id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error POST /api/progress:', error);
    return new Response(JSON.stringify({ error: 'Error al actualizar progreso' }), { status: 500 });
  }
};
