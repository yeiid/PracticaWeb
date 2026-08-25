import type { APIRoute } from 'astro';
import { serialize } from 'cookie';

const p = process['env'];

export const POST: APIRoute = async () => {
  const cookie = serialize('session', '', {
    httpOnly: true,
    secure: p['NODE_ENV'] === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0
  });

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Set-Cookie': cookie,
      'Content-Type': 'application/json'
    }
  });
};
