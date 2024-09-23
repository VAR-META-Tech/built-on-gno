import { creatorFeature } from '@/creator/creatorFeature'
import { creatorGlossary } from '@/creator/creatorGlossary'
import { creatorParentCategory } from '@/creator/creatorParentCategory'
import { creatorProject } from '@/creator/creatorProject'
import { creatorSocial } from '@/creator/creatorSocial'
import { creatorSubCategory } from '@/creator/creatorSubCategory'
import { connection } from '@/databases/connection'
import { Categories } from '@/databases/entities/Categories'
import { Projects } from '@/databases/entities/Projects'
import { ProjectJSON } from '@/shared/schema/ProjectJSON'
import { fsWrapper } from '@/utils/fs/fsWrapper'
import { getFileName } from '@/utils/getFileName'
import { logger } from '@/utils/logger'
import 'dotenv/config'
import { DataReturn } from './classificationCase'
import { deleteProject } from './utils/deleteProject'
import { CategoryJSON } from '@/shared/schema/CategoryKJSON'

function getCategoryName(projectFolder: string): {
  category: string
  subCategory: string
} {
  const array = projectFolder.split('/')
  return {
    category: array[array.length - 3],
    subCategory: array[array.length - 2],
  }
}

async function getCategory(projectFolder: string) {
  const { category: parent, subCategory } = getCategoryName(projectFolder)
 
  const dataString = await fsWrapper.readFile(`${parent}/category.json`)
  const data: CategoryJSON = JSON.parse(dataString)

  const categoryName = data.name

  const subCategoryName = data.sub_categories.find(
    (entity) => entity.pathname === subCategory,
  )

  const category = await connection
    .getRepository(Categories)
    .createQueryBuilder('category')
    .leftJoin('category.parent', 'parent')
    .where('category.name = :name', { name: subCategoryName })
    .andWhere('parent.name = :parent', { parent: categoryName })
    .getOne()

  return category
}

export async function handleCase(caseData: DataReturn) {
  if (caseData.isSocialCreate == true) {
    try {
      await creatorSocial()
    } catch (error) {
      logger.info('Social create error', error)
      throw error
    }
  }

  if (caseData.parentCategory.length !== 0) {
    try {
      await Promise.all(
        caseData.parentCategory.map(async (parent) => {
          await creatorParentCategory(`/${parent}`)
        }),
      )
    } catch (error) {
      logger.info('Parent category create error', error)
      throw error
    }
  }

  if (caseData.features.length !== 0) {
    try {
      await Promise.all(
        caseData.features.map(async (filePath) => {
          const array = filePath.split('/')
          const path = `/${array[0]}/${array[1]}`
          await creatorFeature(path)
        }),
      )
    } catch (error) {
      logger.info('Feature create error', error)
      throw error
    }
  }

  if (caseData.glossaries.length !== 0) {
    try {
      await Promise.all(
        caseData.glossaries.map(async (filePath) => {
          const array = filePath.split('/')
          const path = `/${array[0]}/${array[1]}`
          await creatorGlossary(path)
        }),
      )
    } catch (error) {
      logger.info('Glossary create error', error)
      throw error
    }
  }

  if (caseData.subCategory.length !== 0) {
    try {
      await Promise.all(
        caseData.subCategory.map(async (subPath) => {
          await creatorSubCategory(`/${subPath}`)
        }),
      )
    } catch (error) {
      logger.info('Sub category create error', error)
      throw error
    }
  }

  if (caseData.projectUpdate.length !== 0) {
    try {
      await Promise.all(
        caseData.projectUpdate.map(async (projectPath) => {
          const detailRaw = await fsWrapper.readFile(
            `/${projectPath}/info.json`,
          )
          const detail: ProjectJSON = JSON.parse(detailRaw)

          const project = await connection
            .getRepository(Projects)
            .findOneBy({ name: detail.display_term })

          if (project) {
            await deleteProject(project)
          }

          const category = await getCategory(projectPath)

          await creatorProject(`/${projectPath}`, category)
        }),
      )
    } catch (error) {
      logger.info('Project update error', error)
      throw error
    }
  }

  if (caseData.projectDelete.length !== 0) {
    try {
      await Promise.all(
        caseData.projectDelete.map(async (path) => {
          const name = getFileName(path)
          const project = await connection
            .getRepository(Projects)
            .findOneBy({ name })

          await deleteProject(project)
        }),
      )
    } catch (error) {
      logger.info('Project delete error', error)
      throw error
    }
  }
}
