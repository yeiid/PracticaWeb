import type { APIRoute } from 'astro';
import sql from '../../lib/db';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const getAuthUser = (request: Request) => {
  try {
    const cookies = parse(request.headers.get('cookie') || '');
    const token = cookies.session;
    if (!token) return null;
    return jwt.verify(token, JWT_SECRET) as any;
  } catch {
    return null;
  }
};

export const GET: APIRoute = async ({ request }) => {
  const authUser = getAuthUser(request);
  if (!authUser) return new Response(null, { status: 401 });

  try {
    const certificates = await sql`
      SELECT * FROM certificates 
      WHERE user_id = ${authUser.id} AND tenant_id = ${authUser.tenant_id}
      ORDER BY created_at DESC
    `;

    return new Response(JSON.stringify(certificates), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error GET /api/certificates:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener certificados' }), { status: 500 });
  }
};

export const POST: APIRoute = async ({ request }) => {
  const authUser = getAuthUser(request);
  if (!authUser) return new Response(null, { status: 401 });

  try {
    const { course_id, student_name } = await request.json();

    const result = await sql`
      INSERT INTO certificates (user_id, tenant_id, course_id, student_name, created_at)
      VALUES (${authUser.id}, ${authUser.tenant_id}, ${course_id}, ${student_name}, now())
      RETURNING *
    `;

    return new Response(JSON.stringify(result[0]), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error POST /api/certificates:', error);
    return new Response(JSON.stringify({ error: 'Error al generar certificado' }), { status: 500 });
  }
};
