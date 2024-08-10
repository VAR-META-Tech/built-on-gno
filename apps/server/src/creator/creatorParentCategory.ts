import 'dotenv/config'

import { connection } from '@/databases/connection'
import { Categories } from '@/databases/entities/Categories'
import { CategoryJSON } from '@/shared/schema/CategoryKJSON'
import { fsWrapper } from '@/utils/fs/fsWrapper'
import { logger } from '@/utils/logger'
import { creatorFeature } from './creatorFeature'
import { creatorGlossary } from './creatorGlossary'
import { creatorSubCategory } from './creatorSubCategory'
import { creatorTag } from './creatorTag'

export async function creatorParentCategory(parentPath: string) {
  // ex of parent path: /projects/DeFi
  try {
    const dir = await fsWrapper.readdir(parentPath)

    if (dir.includes('features.json')) await creatorFeature(parentPath)
    if (dir.includes('glossaries.json')) await creatorGlossary(parentPath)

    const dataString = await fsWrapper.readFile(`${parentPath}/category.json`)

    const data: CategoryJSON = JSON.parse(dataString)

    const category = new Categories()
    category.name = data.name
    category.description = data.description
    category.parentId = null

    if (data.tags.length !== 0) await creatorTag(data.tags)

    await connection.getRepository(Categories).save(category)

    if (data.sub_categories.length !== 0) {
      await Promise.all(
        data.sub_categories.map(async (detail) => {
          const subPath = `${parentPath}/${detail.pathname}`
          await creatorSubCategory(subPath)
        }),
      )
    }
  } catch (error) {
    logger.info('Parent category create error', error)
    throw error
  }
}
