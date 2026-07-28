import type { APIRoute } from 'astro';
import sql from '../../../lib/db';
import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import { sendVerificationEmail } from '../../../lib/email';

export const POST: APIRoute = async ({ request }) => {
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

    // Generar token de verificación
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas

    await sql`
      INSERT INTO email_verification_tokens (user_id, token, expires_at)
      VALUES (${user.id}, ${token}, ${expiresAt.toISOString()})
    `;

    // Enviar email de verificación
    let previewUrl: string | undefined;
    try {
      const result = await sendVerificationEmail(email, token, full_name);
      previewUrl = result.previewUrl;
    } catch (emailError) {
      console.error('Error al enviar email de verificación:', emailError);
      // No bloquear el registro si falla el email
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Cuenta creada. Revisa tu correo para verificar tu email.',
      user: { id: user.id, email: user.email, full_name: user.full_name, role: user.role },
      previewUrl,
      requiresVerification: true
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