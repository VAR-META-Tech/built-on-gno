export function getFileName(path: string): string {
  if (!path || path === '/') return '';

  const sanitizedPath = path.endsWith('/') ? path.slice(0, -1) : path;

  const array = sanitizedPath.split('/');
  return array[array.length - 1] || '';
}
