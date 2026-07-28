import type { APIRoute } from 'astro';
import sql from '../../../lib/db';
import crypto from 'node:crypto';
import { sendVerificationEmail } from '../../../lib/email';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email } = await request.json();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email requerido' }), { status: 400 });
    }

    // Buscar usuario
    const users = await sql`
      SELECT id, full_name, email_verified FROM users WHERE email = ${email} LIMIT 1
    `;

    if (users.length === 0) {
      return new Response(JSON.stringify({ error: 'No hay cuenta registrada con ese email' }), { status: 404 });
    }

    const user = users[0];

    if (user.email_verified) {
      return new Response(JSON.stringify({ error: 'El correo ya está verificado' }), { status: 400 });
    }

    // Eliminar tokens anteriores
    await sql`DELETE FROM email_verification_tokens WHERE user_id = ${user.id}`;

    // Generar nuevo token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas

    await sql`
      INSERT INTO email_verification_tokens (user_id, token, expires_at)
      VALUES (${user.id}, ${token}, ${expiresAt.toISOString()})
    `;

    // Enviar email
    const result = await sendVerificationEmail(email, token, user.full_name);

    return new Response(JSON.stringify({
      success: true,
      message: 'Correo de verificación reenviado',
      previewUrl: result.previewUrl
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error en Resend Verification API:', error);
    return new Response(JSON.stringify({ error: 'Error al reenviar verificación' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};