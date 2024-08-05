import { getFilePathDepth } from '@/utils/getFilePathDepth'
import { DataReturn } from '../classificationCase'

export function filterNewFeaturesAndGlossaries(
  dataReturn: DataReturn,
  fileChanges: Array<string>,
) {
  // Ex of features path: projects/DeFi/features.json
  const file1 = fileChanges.filter((value) => getFilePathDepth(value) == 3)
  if (file1.length == 0) {
    dataReturn.features = []
    dataReturn.glossaries = []
    return fileChanges
  }

  dataReturn.features = []
  dataReturn.glossaries = []

  file1.forEach((value) => {
    if (value.includes('features.json')) {
      dataReturn.features.push(value)
    } else if (value.includes('glossaries.json')) {
      dataReturn.glossaries.push(value)
    }
  })

  const filesReturn = fileChanges.filter(
    (value) => getFilePathDepth(value) !== 3,
  )
  return filesReturn
}
