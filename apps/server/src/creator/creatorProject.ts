import { fsWrapper } from '@/utils/fs/fsWrapper'
import 'dotenv/config'
// import { creatorSocial } from './sub/creatorSocial'
import { connection } from '@/databases/connection'
import { Projects } from '@/databases/entities/Projects'
import { ProjectJSON } from '@/shared/schema/ProjectJSON'
import { logger } from '@/utils/logger'
import { creatorProjectDescription } from './creatorProjectDescription'
import { creatorPartnership } from './sub/creatorPartnership'
import { creatorProjectFeature } from './sub/creatorProjectFeature'
import { creatorProjectGlossary } from './sub/creatorProjectGlossary'
import { creatorProjectSocial } from './sub/creatorProjectSocial'
import { creatorProjectTag } from './sub/creatorProjectTag'

export async function creatorProject(folderPath: string, category) {
  // folder path is the full path, not the folder name, Ex: /projects/DeFi/DEX/Coinlink
  try {
    const data = await fsWrapper.readFile(`${folderPath}/info.json`)
    const detail: ProjectJSON = JSON.parse(data)

    const project = new Projects()
    project.name = detail.display_term
    project.logoUrl = ''
    project.shortDescription = detail.short_description
    project.author = detail.author
    project.category = category

    const created = await connection.getRepository(Projects).save(project)

    await creatorPartnership(created, detail)
    await creatorProjectTag(created, detail)
    await creatorProjectSocial(created, detail)
    await creatorProjectGlossary(created, detail)
    await creatorProjectFeature(created, folderPath)
    await creatorProjectDescription(created, folderPath)
  } catch (error) {
    logger.info('Project create error', error)
    throw error
  }
}

// check done
