import type { APIRoute } from 'astro';
import sql from '../../../../../lib/db';
import { getAuthUser } from '../../../../../lib/auth';

// GET /api/forum/threads/[id] - Detalle del hilo (incrementa vistas)
export const GET: APIRoute = async ({ request, params }) => {
  const authUser = getAuthUser(request);
  if (!authUser) return new Response(null, { status: 401 });

  try {
    const { id } = params;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await sql`
      UPDATE forum_threads ft
      SET views_count = ft.views_count + 1
      FROM users u
      WHERE ft.id = ${id} AND u.id = ft.user_id
      RETURNING
        ft.id, ft.title, ft.content, ft.category, ft.status,
        ft.user_id, ft.replies_count, ft.views_count,
        ft.created_at, ft.updated_at,
        u.full_name as author_name, u.role as author_role
    `;

    if (result.length === 0) {
      return new Response(JSON.stringify({ error: 'Hilo no encontrado' }), { status: 404 });
    }

    return new Response(JSON.stringify(result[0]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error GET /api/forum/threads/[id]:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener el hilo' }), { status: 500 });
  }
};

// PATCH /api/forum/threads/[id] - Cambiar estado (cerrar/reabrir/fijar)
export const PATCH: APIRoute = async ({ request, params }) => {
  const authUser = getAuthUser(request);
  if (!authUser) return new Response(null, { status: 401 });

  try {
    const { id } = params;
    const { status } = await request.json();

    const allowedStatuses: Record<string, string[]> = {
      admin: ['open', 'closed', 'pinned'],
    };

    const thread = await sql`
      SELECT user_id, status FROM forum_threads WHERE id = ${id}
    `;

    if (thread.length === 0) {
      return new Response(JSON.stringify({ error: 'Hilo no encontrado' }), { status: 404 });
    }

    const isOwner = thread[0].user_id === authUser.id;
    const isAdmin = authUser.role === 'admin';

    if (!isAdmin && !isOwner) {
      return new Response(JSON.stringify({ error: 'No tienes permisos para modificar este hilo' }), { status: 403 });
    }

    const validFor = isAdmin ? allowedStatuses.admin : ['open', 'closed'];
    if (!validFor.includes(status)) {
      return new Response(JSON.stringify({ error: 'Estado no válido' }), { status: 400 });
    }

    const result = await sql`
      UPDATE forum_threads
      SET status = ${status}
      WHERE id = ${id}
      RETURNING id, title, status
    `;

    return new Response(JSON.stringify(result[0]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error PATCH /api/forum/threads/[id]:', error);
    return new Response(JSON.stringify({ error: 'Error al actualizar el hilo' }), { status: 500 });
  }
};