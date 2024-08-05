import { DataReturn } from '../classificationCase'

export function filterNewSocial(
  dataReturn: DataReturn,
  fileChanges: Array<string>,
): Array<string> {
  if (fileChanges.includes('projects/socials.json')) {
    dataReturn.isSocialCreate = true
    const listFiles = fileChanges.filter(
      (value) => value !== 'projects/socials.json',
    )
    return listFiles
  }

  dataReturn.isSocialCreate = false
  return fileChanges
}
