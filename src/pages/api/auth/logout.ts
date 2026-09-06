import type { APIRoute } from 'astro';
import { serialize } from 'cookie';
import { isSecureRequest } from '../../../lib/isSecureRequest';

export const POST: APIRoute = async ({ request }) => {
  const cookie = serialize('session', '', {
    httpOnly: true,
    secure: isSecureRequest(request),
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
