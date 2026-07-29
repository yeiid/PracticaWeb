import nodemailer from 'nodemailer';

// Configuración de transporte
// Por defecto usa Ethereal (email de prueba) en desarrollo
// Configurar SMTP real via variables de entorno
const getTransporter = async () => {
  if (process.env.SMTP_HOST) {
    // SMTP real
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Ethereal (solo para desarrollo - los emails se ven en ethereal.email)
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
};

export async function sendVerificationEmail(
  to: string,
  token: string,
  fullName: string,
  origin?: string
): Promise<{ messageId: string; previewUrl?: string }> {
  const transporter = await getTransporter();
  const baseUrl = origin || process.env.PUBLIC_SITE_URL || 'http://localhost:4328';
  const verifyUrl = `${baseUrl}/verify-email?token=${token}`;

  const info = await transporter.sendMail({
    from: `"Academia Web" <${process.env.SMTP_FROM || 'noreply@academiaweb.dev'}>`,
    to,
    subject: 'Verifica tu correo electrónico - Academia Web',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #F97316, #EA580C); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">AcademiaWeb</h1>
        </div>
        <div style="background: #1a1a2e; padding: 40px 30px; border-radius: 0 0 12px 12px; color: #e0e0e0;">
          <h2 style="color: white; margin-top: 0;">¡Hola, ${fullName}!</h2>
          <p style="font-size: 16px; line-height: 1.6;">
            Gracias por registrarte en Academia Web. Para completar tu registro,
            por favor verifica tu dirección de correo electrónico haciendo clic en el botón de abajo:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verifyUrl}"
               style="background: #F97316; color: white; padding: 14px 36px;
                      text-decoration: none; border-radius: 8px; font-size: 16px;
                      font-weight: bold; display: inline-block;">
              Verificar Correo Electrónico
            </a>
          </div>
          <p style="font-size: 14px; color: #999; line-height: 1.6;">
            Si no puedes hacer clic en el botón, copia y pega este enlace en tu navegador:
          </p>
          <p style="font-size: 12px; color: #ccc; word-break: break-all; background: #0d0d1a; padding: 10px; border-radius: 6px;">
            <a href="${verifyUrl}" style="color: #F97316; text-decoration: underline;">${verifyUrl}</a>
          </p>
          <p style="font-size: 14px; color: #999; margin-top: 30px;">
            Este enlace expirará en 24 horas. Si no creaste esta cuenta, ignora este mensaje.
          </p>
        </div>
        <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
          <p>Academia Web - Plataforma de Aprendizaje</p>
        </div>
      </div>
    `,
  });

  const previewUrl = nodemailer.getTestMessageUrl(info) || undefined;
  return { messageId: info.messageId, previewUrl };
}