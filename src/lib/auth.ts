import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

export function getAuthUser(request: Request) {
  try {
    const cookies = parse(request.headers.get('cookie') || '');
    const token = cookies.session;
    if (!token) return null;
    return jwt.verify(token, process['env']['JWT_SECRET']||'dev-fallback') as any;
  } catch {
    return null;
  }
}