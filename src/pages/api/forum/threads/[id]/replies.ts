import type { APIRoute } from 'astro';
import sql from '../../../../../lib/db';
import { getAuthUser } from '../../../../../lib/auth';

// GET /api/forum/threads/[id]/replies?page=1&limit=30 - Respuestas paginadas
export const GET: APIRoute = async ({ request, params, url }) => {
  const authUser = getAuthUser(request);
  if (!authUser) return new Response(null, { status: 401 });

  try {
    const { id } = params;
    const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get('limit') || '30', 10) || 30));

    const thread = await sql`SELECT id FROM forum_threads WHERE id = ${id}`;
    if (thread.length === 0) {
      return new Response(JSON.stringify({ error: 'Hilo no encontrado' }), { status: 404 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rows = await sql`
      SELECT
        fr.id, fr.user_id, fr.content, fr.is_staff, fr.created_at,
        u.full_name as author_name, u.role as author_role,
        COUNT(*) OVER() AS total_count
      FROM forum_replies fr
      JOIN users u ON fr.user_id = u.id
      WHERE fr.thread_id = ${id}
      ORDER BY fr.created_at ASC
      LIMIT ${limit} OFFSET ${(page - 1) * limit}
    `;

    const total = rows.length > 0 ? Number(rows[0].total_count) : 0;
    const replies = rows.map(({ total_count, ...reply }) => reply);

    return new Response(JSON.stringify({
      replies,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error GET /api/forum/threads/[id]/replies:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener las respuestas' }), { status: 500 });
  }
};

// POST /api/forum/threads/[id]/replies - Responder al hilo
export const POST: APIRoute = async ({ request, params }) => {
  const authUser = getAuthUser(request);
  if (!authUser) return new Response(null, { status: 401 });

  try {
    const { id } = params;
    const { content } = await request.json();

    if (!content || content.trim().length < 2) {
      return new Response(JSON.stringify({ error: 'La respuesta debe tener al menos 2 caracteres' }), { status: 400 });
    }

    const thread = await sql`
      SELECT id, status FROM forum_threads WHERE id = ${id}
    `;

    if (thread.length === 0) {
      return new Response(JSON.stringify({ error: 'Hilo no encontrado' }), { status: 404 });
    }

    if (thread[0].status === 'closed' && authUser.role !== 'admin') {
      return new Response(JSON.stringify({ error: 'Este hilo está cerrado y no acepta más respuestas' }), { status: 403 });
    }

    const result = await sql`
      INSERT INTO forum_replies (thread_id, user_id, content, is_staff)
      VALUES (${id}, ${authUser.id}, ${content.trim()}, ${authUser.role === 'admin'})
      RETURNING id, content, is_staff, created_at
    `;

    return new Response(JSON.stringify(result[0]), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error POST /api/forum/threads/[id]/replies:', error);
    return new Response(JSON.stringify({ error: 'Error al enviar la respuesta' }), { status: 500 });
  }
};