import 'dotenv/config'
import { DataReturn } from './classificationCase'
import { creatorParentCategory } from '@/creator/creatorParentCategory'
import { creatorSubCategory } from '@/creator/creatorSubCategory'
import { fsWrapper } from '@/utils/fs/fsWrapper'
import { deleteProject } from './utils/deleteProject'
import { creatorProject } from '@/creator/creatorProject'
import { connection } from '@/databases/connection'
import { Categories } from '@/databases/entities/Categories'
import { Projects } from '@/databases/entities/Projects'
import { ProjectJSON } from '@/shared/schema/ProjectJSON'
import { creatorSocial } from '@/creator/creatorSocial'
import { creatorFeature } from '@/creator/creatorFeature'
import { creatorGlossary } from '@/creator/creatorGlossary'
import { getFileName } from '@/utils/getFileName'

function getCategoryName(projectFolder: string): string {
  const array = projectFolder.split('/')
  return array[array.length - 2]
}

async function getCategory(projectFolder: string) {
  const name = getCategoryName(projectFolder)

  const category = await connection
    .getRepository(Categories)
    .findOneBy({ name })

  return category
}

export async function handleCase(caseData: DataReturn) {
  if (caseData.isSocialCreate == true) {
    creatorSocial()
  }

  if (caseData.parentCategory.length !== 0) {
    caseData.parentCategory.map((parent) => {
      creatorParentCategory(`/${parent}`)
    })
  }

  if (caseData.features.length !== 0) {
    caseData.features.map(async (filePath) => {
      const array = filePath.split('/')
      const path = `/${array[0]}/${array[1]}`
      await creatorFeature(path)
    })
  }

  if (caseData.glossaries.length !== 0) {
    caseData.glossaries.map(async (filePath) => {
      const array = filePath.split('/')
      const path = `/${array[0]}/${array[1]}`
      await creatorGlossary(path)
    })
  }

  if (caseData.subCategory.length !== 0) {
    caseData.subCategory.map((subPath) => {
      creatorSubCategory(`/${subPath}`)
    })
  }

  if (caseData.projectUpdate.length !== 0) {
    caseData.projectUpdate.map(async (projectPath) => {
      const detailRaw = await fsWrapper.readFile(`/${projectPath}/info.json`)
      const detail: ProjectJSON = JSON.parse(detailRaw)

      const project = await connection
        .getRepository(Projects)
        .findOneBy({ name: detail.display_term })

      if (project) {
        await deleteProject(project)
      }

      const category = await getCategory(projectPath)

      creatorProject(`/${projectPath}`, category)
    })
  }

  if (caseData.projectDelete.length !== 0) {
    caseData.projectDelete.map(async (path) => {
      const name = getFileName(path)
      const project = await connection
        .getRepository(Projects)
        .findOneBy({ name })

      deleteProject(project)
    })
  }
}
