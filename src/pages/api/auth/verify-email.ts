import type { APIRoute } from 'astro';
import sql from '../../../lib/db';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { token } = await request.json();

    if (!token) {
      return new Response(JSON.stringify({ error: 'Token requerido' }), { status: 400 });
    }

    // Buscar token válido no expirado
    const tokens = await sql`
      SELECT user_id, expires_at FROM email_verification_tokens
      WHERE token = ${token}
      LIMIT 1
    `;

    if (tokens.length === 0) {
      return new Response(JSON.stringify({ error: 'Token inválido o ya fue usado' }), { status: 400 });
    }

    const record = tokens[0];

    // Verificar si expiró
    if (new Date(record.expires_at) < new Date()) {
      await sql`DELETE FROM email_verification_tokens WHERE token = ${token}`;
      return new Response(JSON.stringify({ error: 'El token ha expirado. Solicita uno nuevo.' }), { status: 400 });
    }

    // Marcar usuario como verificado
    await sql`
      UPDATE users SET email_verified = true, updated_at = now()
      WHERE id = ${record.user_id}
    `;

    // Eliminar el token usado
    await sql`DELETE FROM email_verification_tokens WHERE token = ${token}`;

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