import type { APIRoute } from 'astro';
import sql from '../../lib/db';

export const GET: APIRoute = async ({ request }) => {
  try {
    // Los cursos pueden ser globales (tenant_id IS NULL) o específicos de un cliente
    const courses = await sql`
      SELECT * FROM courses 
      WHERE active = true 
      ORDER BY created_at ASC
    `;

    return new Response(JSON.stringify(courses), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error GET /api/courses:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener cursos' }), { status: 500 });
  }
};

// POST route for admins could be added here
