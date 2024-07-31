import { DataReturn } from '../classificationCase'

function getProjectPath(file: string) {
  const array = file.split('/')

  return `${array[0]}/${array[1]}/${array[2]}/${array[3]}`
}

function getListProject(fileChange: Array<string>): Array<string> {
  const set = new Set<string>()

  fileChange.forEach((file) => {
    const path = getProjectPath(file)
    set.add(path)
  })

  return Array.from(set)
}

export function filterNewProject(
  dataReturn: DataReturn,
  fileChange: Array<string>,
) {
  if (fileChange.length == 0) {
    dataReturn.project = []
    return
  }
  const projectPaths = getListProject(fileChange)
  dataReturn.project = projectPaths
}
