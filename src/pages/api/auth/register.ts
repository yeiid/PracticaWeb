import type { APIRoute } from 'astro';
import sql from '../../../lib/db';
import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import { sendVerificationEmail } from '../../../lib/email';

export const POST: APIRoute = async ({ request, url }) => {
  try {
    const { email, password, full_name, tenant_id } = await request.json();

    if (!email || !password || !full_name) {
      return new Response(JSON.stringify({ error: 'Faltan campos obligatorios' }), { status: 400 });
    }

    // Hash de contraseña
    const password_hash = await bcrypt.hash(password, 10);

    // Insertar usuario
    const users = await sql`
      INSERT INTO users (email, password_hash, full_name, tenant_id)
      VALUES (${email}, ${password_hash}, ${full_name}, ${tenant_id || null})
      RETURNING id, email, full_name, tenant_id, role
    `;

    const user = users[0];

    // Generar token de verificación (si la tabla existe)
    let previewUrl: string | undefined;
    try {
      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

      await sql`
        INSERT INTO email_verification_tokens (user_id, token, expires_at)
        VALUES (${user.id}, ${token}, ${expiresAt.toISOString()})
      `;

      const origin = url.origin;
      const result = await sendVerificationEmail(email, token, full_name, origin);
      previewUrl = result.previewUrl;
    } catch (verificationError) {
      console.error('Error en proceso de verificación de email:', verificationError);
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Cuenta creada exitosamente.',
      user: { id: user.id, email: user.email, full_name: user.full_name, role: user.role },
      previewUrl,
      requiresVerification: false
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Error en Register API:', error);
    if (error?.code === '23505') { // Unique violation
      return new Response(JSON.stringify({ error: 'El email ya está registrado' }), { status: 409 });
    }
    return new Response(JSON.stringify({ error: 'Error al registrar el usuario' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};