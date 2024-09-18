export function getParentPath(path: string): string {
  if (!path || path === '/') {
    console.log('sub path error');
    return '';
  }

  const array = path.split('/').filter(Boolean);
  if (array.length === 0) {
    console.log('sub path error');
    return '';
  }

  const parentPath = array.slice(0, -1).join('/');
  return parentPath ? `/${parentPath}` : '/';
}
