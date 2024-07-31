import { connection } from '@/databases/connection'
import { DataReturn } from '../classificationCase'

// layer 2
function getSubName(path: string) {
  const array = path.split('/')
  return array[2]
}

function getListSubName(fileChange: Array<string>): Array<string> {
  const set = new Set<string>()
  fileChange.forEach((file) => {
    set.add(getSubName(file))
  })

  return Array.from(set)
}

function getOneElement(sub: string, fileChange: Array<string>): string {
  for (let i = 0; i < fileChange.length; i++) {
    if (fileChange[i].includes(sub)) {
      const array = fileChange[i].split('/')
      const dataReturn = `${array[0]}/${array[1]}/${array[2]}`

      return dataReturn
    }
  }

  console.log('File now exist ????')
  return ''
}

function getSubReturn(
  subNew: Array<string>,
  fileChange: Array<string>,
): Array<string> {
  const dataReturn = subNew.map((sub) => getOneElement(sub, fileChange))

  return dataReturn
}

function removeCategoryJson(fileChange: Array<string>): Array<string> {
  const dataReturn = fileChange.filter((file) => {
    if (file.includes('category.json')) return false
    else return true
  })

  return dataReturn
}

export async function filterNewSub(
  dataReturn: DataReturn,
  fileChangeRaw: Array<string>,
) {
  if (fileChangeRaw.length == 0) {
    dataReturn.subCategory = []
    return []
  }

  const fileChange = removeCategoryJson(fileChangeRaw)

  const listName = getListSubName(fileChange)
  const inQuery = listName.map((name) => `"${name}"`).join(',')
  const query = `
        SELECT categories.name
        FROM categories
        WHERE categories.parent_id IS NOT NULL AND categories.name IN (${inQuery});
  `

  const datas: Array<{ name: string }> = await connection.manager.query(query)

  const subNew: Array<string> = []
  const subExist: Array<string> = []

  listName.forEach((name) => {
    const isExist = datas.some((data) => data.name == name)
    if (isExist) subExist.push(name)
    else subNew.push(name)
  })

  //   now we have sub new, let add it to the dataReturn
  dataReturn.subCategory = getSubReturn(subNew, fileChange)

  let fileChangeUpate = fileChange.filter((file) => {
    for (let i = 0; i < subExist.length; i++) {
      if (file.includes(subExist[i])) return true
    }
    return false
  })

  return fileChangeUpate
}
