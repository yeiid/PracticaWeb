import type { APIRoute } from 'astro';
import sql from '../../../../lib/db';
import { getAuthUser } from '../../../../lib/auth';

export const FORUM_CATEGORIES = ['general', 'git', 'frontend', 'javascript', 'python', 'react', 'backend'];

export const CATEGORY_LABELS: Record<string, string> = {
  general: 'General',
  git: 'Git',
  frontend: 'HTML/CSS',
  javascript: 'JavaScript',
  python: 'Python',
  react: 'React',
  backend: 'Backend',
};

// GET /api/forum/threads?page=1&limit=15&category=javascript
export const GET: APIRoute = async ({ request, url }) => {
  const authUser = getAuthUser(request);
  if (!authUser) return new Response(null, { status: 401 });

  try {
    const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(url.searchParams.get('limit') || '15', 10) || 15));
    const category = url.searchParams.get('category');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where = category && FORUM_CATEGORIES.includes(category) ? sql`WHERE ft.category = ${category}` : sql``;

    const rows = await sql`
      SELECT
        ft.id, ft.title, ft.category, ft.status,
        ft.replies_count, ft.views_count,
        ft.created_at, ft.updated_at,
        u.full_name as author_name, u.role as author_role,
        COUNT(*) OVER() AS total_count
      FROM forum_threads ft
      JOIN users u ON ft.user_id = u.id
      ${where}
      ORDER BY
        CASE ft.status WHEN 'pinned' THEN 0 ELSE 1 END,
        ft.updated_at DESC
      LIMIT ${limit} OFFSET ${(page - 1) * limit}
    `;

    const total = rows.length > 0 ? Number(rows[0].total_count) : 0;

    const threads = rows.map(({ total_count, ...thread }) => thread);

    return new Response(JSON.stringify({
      threads,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error GET /api/forum/threads:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener los hilos del foro' }), { status: 500 });
  }
};

// POST /api/forum/threads - Crear nuevo hilo
export const POST: APIRoute = async ({ request }) => {
  const authUser = getAuthUser(request);
  if (!authUser) return new Response(null, { status: 401 });

  try {
    const { title, content, category } = await request.json();

    if (!title || !content) {
      return new Response(JSON.stringify({ error: 'El título y el contenido son obligatorios' }), { status: 400 });
    }

    if (title.trim().length < 5) {
      return new Response(JSON.stringify({ error: 'El título debe tener al menos 5 caracteres' }), { status: 400 });
    }

    if (content.trim().length < 10) {
      return new Response(JSON.stringify({ error: 'El contenido debe tener al menos 10 caracteres' }), { status: 400 });
    }

    const result = await sql`
      INSERT INTO forum_threads (user_id, tenant_id, title, content, category)
      VALUES (
        ${authUser.id},
        ${authUser.tenant_id || null},
        ${title.trim()},
        ${content.trim()},
        ${FORUM_CATEGORIES.includes(category) ? category : 'general'}
      )
      RETURNING *
    `;

    return new Response(JSON.stringify(result[0]), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error POST /api/forum/threads:', error);
    return new Response(JSON.stringify({ error: 'Error al crear el hilo' }), { status: 500 });
  }
};