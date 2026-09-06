export function isSecureRequest(request: Request): boolean {
  const forwarded = request.headers.get('x-forwarded-proto');
  if (forwarded) {
    return forwarded.split(',')[0].trim() === 'https';
  }
  return new URL(request.url).protocol === 'https:';
}