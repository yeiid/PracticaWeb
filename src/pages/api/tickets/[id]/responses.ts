import type { APIRoute } from 'astro';
import sql from '../../../../lib/db';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

// JWT Secret

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

// GET /api/tickets/[id]/responses - Obtener respuestas de un ticket
export const GET: APIRoute = async ({ request, params }) => {
  const authUser = getAuthUser(request);
  if (!authUser) return new Response(null, { status: 401 });

  const ticketId = params.id;

  try {
    // Verificar acceso al ticket
    const ticketCheck = await sql`
      SELECT * FROM support_tickets WHERE id = ${ticketId}
    `;

    if (ticketCheck.length === 0) {
      return new Response(JSON.stringify({ error: 'Ticket no encontrado' }), { status: 404 });
    }

    const ticket = ticketCheck[0];
    if (authUser.role !== 'admin' && ticket.user_id !== authUser.id) {
      return new Response(JSON.stringify({ error: 'Sin acceso a este ticket' }), { status: 403 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const responses = await sql`
      SELECT tr.*, u.email as responder_email, u.full_name as responder_name
      FROM ticket_responses tr
      LEFT JOIN users u ON tr.responder_id = u.id
      WHERE tr.ticket_id = ${ticketId}
      ORDER BY tr.created_at ASC
    `;

    return new Response(JSON.stringify({ ticket, responses }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error GET /api/tickets/:id/responses:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener respuestas' }), { status: 500 });
  }
};

// POST /api/tickets/[id]/responses - Responder a un ticket
export const POST: APIRoute = async ({ request, params }) => {
  const authUser = getAuthUser(request);
  if (!authUser) return new Response(null, { status: 401 });

  const ticketId = params.id;

  try {
    const { message } = await request.json();
    if (!message) {
      return new Response(JSON.stringify({ error: 'Mensaje requerido' }), { status: 400 });
    }

    // Verificar ticket existe
    const ticketCheck = await sql`
      SELECT * FROM support_tickets WHERE id = ${ticketId}
    `;

    if (ticketCheck.length === 0) {
      return new Response(JSON.stringify({ error: 'Ticket no encontrado' }), { status: 404 });
    }

    const ticket = ticketCheck[0];
    if (authUser.role !== 'admin' && ticket.user_id !== authUser.id) {
      return new Response(JSON.stringify({ error: 'Sin acceso a este ticket' }), { status: 403 });
    }

    const isStaff = authUser.role === 'admin';

    const result = await sql`
      INSERT INTO ticket_responses (ticket_id, responder_id, message, is_staff)
      VALUES (${ticketId}, ${authUser.id}, ${message}, ${isStaff})
      RETURNING *
    `;

    // Si admin responde, actualizar estado a in_progress si estaba abierto
    if (isStaff && ticket.status === 'open') {
      await sql`
        UPDATE support_tickets SET status = 'in_progress', updated_at = now()
        WHERE id = ${ticketId}
      `;
    } else if (!isStaff && ticket.status === 'resolved') {
      // Si usuario responde un ticket resuelto, volver a abrir
      await sql`
        UPDATE support_tickets SET status = 'in_progress', updated_at = now()
        WHERE id = ${ticketId}
      `;
    }

    return new Response(JSON.stringify(result[0]), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error POST /api/tickets/:id/responses:', error);
    return new Response(JSON.stringify({ error: 'Error al responder ticket' }), { status: 500 });
  }
};
