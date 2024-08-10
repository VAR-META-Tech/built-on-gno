import { connection } from '@/databases/connection'
import { ProjectDescriptions } from '@/databases/entities/ProjectDescriptions'
import { Projects } from '@/databases/entities/Projects'
import { fsWrapper } from '@/utils/fs/fsWrapper'
import { logger } from '@/utils/logger'

export async function creatorProjectDescription(
  project: Projects,
  projectPath: string,
) {
  try {
    const dir = await fsWrapper.readdir(projectPath)
    if (!dir.includes('detail.md')) return

    const data = await fsWrapper.readFile(`${projectPath}/detail.md`)

    const projectDescription = new ProjectDescriptions()
    projectDescription.project = project
    projectDescription.description = data

    await connection.getRepository(ProjectDescriptions).save(projectDescription)
  } catch (error) {
    logger.info('Project description create error', error)
    throw error
  }
}

// done
