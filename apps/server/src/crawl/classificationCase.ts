import 'dotenv/config'
import { filterNewParent } from './utils/filterNewParent'
import { filterNewSub } from './utils/filterNewSub'
import { filterNewSocial } from './utils/filterNewSocials'
import { filterNewFeaturesAndGlossaries } from './utils/filterNewFeaturesAndGlossaries'
import { filterProject } from './utils/filterProject'
import { removeTrash } from './utils/removeTrash'

export class DataReturn {
  isSocialCreate: boolean
  parentCategory: Array<string> // path
  glossaries: Array<string>
  features: Array<string>
  subCategory: Array<string> // path,
  projectUpdate: Array<string> // path
  projectDelete: Array<string> // path
}

export async function classificationCase(
  fileChanges: Array<string>,
): Promise<DataReturn> {
  // fileChange is an array of file path

  const dataReturn = new DataReturn()
  const fileLay0 = removeTrash(fileChanges)
  const fileLay1 = filterNewSocial(dataReturn, fileLay0)
  const fileLay2 = await filterNewParent(dataReturn, fileLay1)
  const fileLay3 = filterNewFeaturesAndGlossaries(dataReturn, fileLay2)
  const fileLay4 = await filterNewSub(dataReturn, fileLay3)
  await filterProject(dataReturn, fileLay4)

  return dataReturn
}
