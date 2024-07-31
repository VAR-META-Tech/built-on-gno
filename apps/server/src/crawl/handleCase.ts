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
  if (caseData.parentCategory.length !== 0) {
    caseData.parentCategory.map((parent) => {
      creatorParentCategory(`/${parent}`)
    })
  }

  if (caseData.subCategory.length !== 0) {
    caseData.subCategory.map((subPath) => {
      creatorSubCategory(`/${subPath}`)
    })
  }

  if (caseData.project.length !== 0) {
    caseData.project.map(async (projectPath) => {
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
}
