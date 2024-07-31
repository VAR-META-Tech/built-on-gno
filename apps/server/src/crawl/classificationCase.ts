import 'dotenv/config'
import { filterNewParent } from './utils/filterNewParent'
import { filterNewSub } from './utils/filterNewSub'
import { filterNewProject } from './utils/filterNewProject'

export class DataReturn {
  parentCategory: Array<string> // path
  subCategory: Array<string> // path,
  project: Array<string> // path
}

export async function classificationCase(
  fileChange: Array<string>,
): Promise<DataReturn> {
  // fileChange is an array of file path

  const dataReturn = new DataReturn()
  const fileLay1 = await filterNewParent(dataReturn, fileChange)
  const fileLay2 = await filterNewSub(dataReturn, fileLay1)
  filterNewProject(dataReturn, fileLay2)

  return dataReturn
}
