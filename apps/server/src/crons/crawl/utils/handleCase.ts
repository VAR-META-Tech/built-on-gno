import { DataReturn } from './classificationCase'
import { creatorParentCategory } from '../../../creator/creatorParentCategory'
import { creatorSubCategory } from '../../../creator/creatorSubCategory'
import { creatorProject } from '../../../creator/creatorProject'
import * as fs from 'fs/promises'
import { ProjectJSON } from '../../../shares/ProjectJSON'
import { connection } from '../../../database/connection'
import { Project } from '../../../database/entities/Project.entity'
import { deleteProject } from './work/deleteProject'
import { Category } from '../../../database/entities/Category.entity'
import 'dotenv/config'

const base = process.env.BASE

function getCategoryName(projectFolder: string): string {
  const array = projectFolder.split('/')
  return array[array.length - 2]
}

async function getCategory(projectFolder: string) {
  const name = getCategoryName(projectFolder)

  const category = await connection.getRepository(Category).findOneBy({ name })

  return category
}

export async function handleCase(caseData: DataReturn) {
  if (caseData.parentCategory.length !== 0) {
    caseData.parentCategory.map((parent) => {
      creatorParentCategory(parent)
    })
  }

  if (caseData.subCategory.length !== 0) {
    caseData.subCategory.map((subPath) => {
      creatorSubCategory(subPath)
    })
  }

  if (caseData.project.length !== 0) {
    caseData.project.map(async (projectPath) => {
      const detailRaw = await fs.readFile(`${base}/${projectPath}/info.json`, {
        encoding: 'utf-8',
      })
      const detail: ProjectJSON = JSON.parse(detailRaw)

      const project = await connection
        .getRepository(Project)
        .findOneBy({ name: detail.display_term })

      if (project) {
        await deleteProject(project)
      }

      const category = await getCategory(projectPath)

      creatorProject(projectPath, category)
    })
  }
}
