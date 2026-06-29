import { defineMiddleware } from "astro:middleware";
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';


// Rutas públicas que no requieren sesión
const publicPaths = ['/', '/login', '/api/auth/login', '/api/auth/register', '/reset-password'];

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, redirect } = context;
  const path = url.pathname;

  // 1. Detección de Tenant (Multi-tenancy)
  // Estrategia: Subdominio o Primer segmento de la ruta.
  // Por ahora, asumimos que el tenant viene en el JWT o se detecta por host.
  const host = context.request.headers.get('host') || '';
  const subdomain = host.split('.')[0];
  
  // Guardamos el tenant potencial en los locales de Astro
  context.locals.tenant_slug = subdomain !== 'localhost' && subdomain !== 'academia' ? subdomain : null;

  // 2. Verificación de Sesión
  const sessionToken = cookies.get('session')?.value;
  
  if (sessionToken) {
    try {
      const decoded = jwt.verify(sessionToken, process['env']['JWT_SECRET']||'dev-fallback') as any;
      context.locals.user = decoded;
    } catch (err) {
      console.warn('Sesión inválida detectada:', err.message);
      cookies.delete('session', { path: '/' });
      context.locals.user = null;
    }
  } else {
    context.locals.user = null;
  }

  // 3. Protección de Rutas
  const isPublic = publicPaths.some(p => path === p || path.startsWith('/_astro') || path.startsWith('/public'));
  const isApi = path.startsWith('/api/');

  if (!context.locals.user && !isPublic && !isApi) {
    return redirect('/login');
  }

  return next();
});
