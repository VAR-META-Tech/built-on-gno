export function getFilePathDepth(path: string) {
  const array = path.split('/')
  return array.length
}
