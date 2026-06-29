import type { APIRoute } from 'astro';
import sql from '../../../lib/db';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion

const getAuthUser = (request: Request) => {
  try {
    const cookies = parse(request.headers.get('cookie') || '');
    const token = cookies.session;
    if (!token) return null;
    return jwt.verify(token, process['env']['JWT_SECRET']||'dev-fallback') as any;
  } catch {
    return null;
  }
};

// GET /api/tickets - Listar tickets del usuario (o todos si es admin)
export const GET: APIRoute = async ({ request }) => {
  const authUser = getAuthUser(request);
  if (!authUser) return new Response(null, { status: 401 });

  try {
    let tickets;
    if (authUser.role === 'admin') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tickets = await sql`
        SELECT st.*, u.email as user_email, u.full_name as user_name
        FROM support_tickets st
        JOIN users u ON st.user_id = u.id
        ORDER BY
          CASE st.status WHEN 'open' THEN 0 WHEN 'in_progress' THEN 1 WHEN 'resolved' THEN 2 ELSE 3 END,
          CASE st.priority WHEN 'urgent' THEN 0 WHEN 'high' THEN 1 WHEN 'normal' THEN 2 ELSE 3 END,
          st.created_at DESC
      `;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tickets = await sql`
        SELECT * FROM support_tickets
        WHERE user_id = ${authUser.id}
        ORDER BY created_at DESC
      `;
    }

    return new Response(JSON.stringify(tickets), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error GET /api/tickets:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener tickets' }), { status: 500 });
  }
};

// POST /api/tickets - Crear nuevo ticket
export const POST: APIRoute = async ({ request }) => {
  const authUser = getAuthUser(request);
  if (!authUser) return new Response(null, { status: 401 });

  try {
    const { subject, message, category, priority } = await request.json();

    if (!subject || !message) {
      return new Response(JSON.stringify({ error: 'Asunto y mensaje son obligatorios' }), { status: 400 });
    }

    const validCategories = ['general', 'technical', 'billing', 'question', 'bug'];
    const validPriorities = ['low', 'normal', 'high', 'urgent'];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await sql`
      INSERT INTO support_tickets (user_id, tenant_id, subject, message, category, priority)
      VALUES (
        ${authUser.id},
        ${authUser.tenant_id || null},
        ${subject},
        ${message},
        ${validCategories.includes(category) ? category : 'general'},
        ${validPriorities.includes(priority) ? priority : 'normal'}
      )
      RETURNING *
    `;

    return new Response(JSON.stringify(result[0]), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error POST /api/tickets:', error);
    return new Response(JSON.stringify({ error: 'Error al crear ticket' }), { status: 500 });
  }
};
