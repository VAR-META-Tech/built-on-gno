import { fsWrapper } from '@/utils/fs/fsWrapper'
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

export async function filterProject( // include new, update (new) and delete project
  dataReturn: DataReturn,
  fileChanges: Array<string>,
) {
  if (fileChanges.length == 0) {
    dataReturn.projectUpdate = []
    dataReturn.projectDelete = []
    return
  }
  const projectPaths = getListProject(fileChanges)

  dataReturn.projectUpdate = []
  dataReturn.projectDelete = []

  await Promise.all(
    projectPaths.map((value) => fsWrapper.checkFileExist(value)),
  ).then((values) => {
    values.forEach((value, index) => {
      if (value == true) {
        // that mean project exist => maybe this is an update or new
        dataReturn.projectUpdate.push(projectPaths[index])
      } else {
        dataReturn.projectDelete.push(projectPaths[index])
      }
    })
  })
}
