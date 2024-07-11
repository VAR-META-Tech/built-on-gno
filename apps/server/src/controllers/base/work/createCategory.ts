import 'dotenv/config'
import { creatorParentCategory } from '../../../creator/creatorParentCategory'

const base = process.env.BASE

export function createCategory(parentFolders) {
  parentFolders.map((folder) => {
    const path = `projects/${folder}`
    creatorParentCategory(path)
  })
}
