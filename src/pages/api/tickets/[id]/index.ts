import type { APIRoute } from 'astro';
import sql from '../../../../lib/db';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';


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

// PATCH /api/tickets/[id] - Cambiar estado de ticket (solo admin puede cerrar/resolve)
export const PATCH: APIRoute = async ({ request, params }) => {
  const authUser = getAuthUser(request);
  if (!authUser) return new Response(null, { status: 401 });

  const ticketId = params.id;

  try {
    const { status } = await request.json();

    const validStatuses = ['open', 'in_progress', 'resolved', 'closed'];
    if (status && !validStatuses.includes(status)) {
      return new Response(JSON.stringify({ error: 'Estado invalido' }), { status: 400 });
    }

    // Verificar ticket existe
    const ticketCheck = await sql`
      SELECT * FROM support_tickets WHERE id = ${ticketId}
    `;

    if (ticketCheck.length === 0) {
      return new Response(JSON.stringify({ error: 'Ticket no encontrado' }), { status: 404 });
    }

    const ticket = ticketCheck[0];

    // Solo admin puede cerrar o cambiar estado de cualquier ticket
    // Usuario solo puede cerrar sus propios tickets
    if (authUser.role !== 'admin') {
      if (ticket.user_id !== authUser.id) {
        return new Response(JSON.stringify({ error: 'Sin acceso' }), { status: 403 });
      }
      if (status !== 'closed' && status !== 'open') {
        return new Response(JSON.stringify({ error: 'Accion no permitida' }), { status: 403 });
      }
    }

    const result = await sql`
      UPDATE support_tickets
      SET status = COALESCE(${status}, status), updated_at = now()
      WHERE id = ${ticketId}
      RETURNING *
    `;

    return new Response(JSON.stringify(result[0]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error PATCH /api/tickets/:id:', error);
    return new Response(JSON.stringify({ error: 'Error al actualizar ticket' }), { status: 500 });
  }
};
