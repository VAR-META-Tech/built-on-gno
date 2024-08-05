import 'dotenv/config'

import { fsWrapper } from '@/utils/fs/fsWrapper'
import { CategoryJSON } from '@/shared/schema/CategoryKJSON'
import { creatorSubCategory } from './creatorSubCategory'
import { creatorTag } from './creatorTag'
import { connection } from '@/databases/connection'
import { Categories } from '@/databases/entities/Categories'
import { creatorFeature } from './creatorFeature'
import { creatorGlossary } from './creatorGlossary'

export async function creatorParentCategory(parentPath: string) {
  // ex of parent path: /projects/DeFi
  const dir = await fsWrapper.readdir(parentPath)

  if (dir.includes('features.json')) await creatorFeature(parentPath)
  if (dir.includes('glossaries.json')) await creatorGlossary(parentPath)

  fsWrapper.readFile(`${parentPath}/category.json`).then((dataString) => {
    const data: CategoryJSON = JSON.parse(dataString)

    const category = new Categories()
    category.name = data.name
    category.description = data.description
    category.parentId = null

    if (data.tags.length !== 0) creatorTag(data.tags)

    connection
      .getRepository(Categories)
      .save(category)
      .then((category: Categories) => {
        if (data.sub_categories.length !== 0) {
          data.sub_categories.map((detail) => {
            const subPath = `${parentPath}/${detail.pathname}`
            creatorSubCategory(subPath)
          })
        }
      })
  })
}
