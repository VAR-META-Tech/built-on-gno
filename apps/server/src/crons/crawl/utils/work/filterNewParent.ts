// layer 1

import { connection } from '../../../../database/connection'
import { DataReturn } from '../classificationCase'

function getParentName(path: string): string {
  const array = path.split('/')
  return array[1]
}

function getListParentName(fileChange: Array<string>): Array<string> {
  const set = new Set<string>()
  fileChange.forEach((file) => {
    set.add(getParentName(file))
  })

  return Array.from(set)
}

export async function filterNewParent(
  dataReturn: DataReturn,
  fileChange: Array<string>,
): Promise<Array<string>> {
  const listName = getListParentName(fileChange)
  const queryIn = listName.map((name) => `"${name}"`).join(',')
  const query = `
          SELECT category.pathName
          FROM category
          WHERE category.parent IS NULL AND category.pathName IN (${queryIn});
      `
  const datas: Array<{ pathName: string }> =
    await connection.manager.query(query)

  let parentNew: Array<string> = []
  const parentExist: Array<string> = []

  listName.forEach((name) => {
    const isExist = datas.some((data) => data.pathName == name)
    if (isExist) parentExist.push(name)
    else parentNew.push(name)
  })

  parentNew = parentNew.map((data) => `projects/${data}`)

  //   Now we have parent new, let add it to the dataReturn;
  dataReturn.parentCategory = parentNew

  let fileChangeUpdate = fileChange.filter((file) => {
    let isValid: boolean = false
    for (let i = 0; i < parentExist.length; i++) {
      if (file.includes(parentExist[i])) {
        isValid = true
        break
      }
    }
    return isValid
  })

  return fileChangeUpdate
}
