import type { APIRoute } from 'astro';
import sql from '../../../lib/db';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { token } = await request.json();

    if (!token) {
      return new Response(JSON.stringify({ error: 'Token requerido' }), { status: 400 });
    }

    let userId: string | null = null;

    try {
      const tokens = await sql`
        SELECT user_id FROM email_verification_tokens
        WHERE token = ${token}
        LIMIT 1
      `;

      if (tokens.length > 0) {
        userId = tokens[0].user_id;
        await sql`DELETE FROM email_verification_tokens WHERE token = ${token}`;
      }
    } catch (tableError) {
      console.error('Error al buscar token de verificación:', tableError);
    }

    if (!userId) {
      return new Response(JSON.stringify({ error: 'Token inválido o ya fue usado' }), { status: 400 });
    }

    try {
      await sql`
        UPDATE users SET email_verified = true, updated_at = now()
        WHERE id = ${userId}
      `;
    } catch (columnError) {
      console.error('Error al actualizar email_verified:', columnError);
    }

    return new Response(JSON.stringify({ success: true, message: 'Correo verificado exitosamente' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error en Verify Email API:', error);
    return new Response(JSON.stringify({ error: 'Error al verificar el correo' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};