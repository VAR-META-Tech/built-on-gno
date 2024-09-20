export function getParentPath(path: string) {
  let array = path.split('/')
  if (array.length == 0) {
    console.log('sub path error')
  }
  let dataReturn = ''
  for (let i = 0; i < array.length - 1; i++) {
    dataReturn += `${array[i]}/`
  }

  return dataReturn
}
