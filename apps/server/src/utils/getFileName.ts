export function getFileName(path: string) {
  if (path == '/') return ''
  if (path[path.length - 1] !== '/') {
    const array = path.split('/')
    return array[array.length - 1]
  } else {
    const array = path.split('/')
    return array[array.length - 2]
  }
}
