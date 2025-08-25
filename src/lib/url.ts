export function assetUrl(path: string | undefined | null) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  
  // Default to localhost:4000 if no environment variable is set
  const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
  const cleanBase = base.replace(/\/?api\/?$/, '');
  
  if (!cleanBase) return path;
  return path.startsWith('/') ? `${cleanBase}${path}` : `${cleanBase}/${path}`;
}


