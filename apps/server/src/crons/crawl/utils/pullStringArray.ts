export function pullStringArray(stdout: string): Array<string> {
  const index = stdout.indexOf(' changed,')

  if (index == -1) return []

  const output = stdout.substring(0, index + 1)

  const array = output.split(' ')

  const arrayFilter = array.filter((data) => {
    return data.includes('projects/')
  })

  return arrayFilter
}
