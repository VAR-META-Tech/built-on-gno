import { fsWrapper } from '@/utils/fs/fsWrapper'
import 'dotenv/config'
// import { creatorSocial } from './sub/creatorSocial'
import { creatorPartnership } from './sub/creatorPartnership'
import { creatorProjectTag } from './sub/creatorProjectTag'
import { Projects } from '@/databases/entities/Projects'
import { connection } from '@/databases/connection'
import { ProjectJSON } from '@/shared/schema/ProjectJSON'
import { creatorProjectSocial } from './sub/creatorProjectSocial'
import { creatorProjectGlossary } from './sub/creatorProjectGlossary'
import { creatorProjectFeature } from './sub/creatorProjectFeature'

export function creatorProject(folderPath: string, category) {
  // folder path is the full path, not the folder name, Ex: /projects/DeFi/DEX/Coinlink
  fsWrapper.readFile(`${folderPath}/info.json`).then((data) => {
    const detail: ProjectJSON = JSON.parse(data)

    const project = new Projects()
    project.name = detail.display_term
    project.logoUrl = ''
    project.shortDescription = detail.short_description
    project.author = detail.author
    project.category = category

    connection
      .getRepository(Projects)
      .save(project)
      .then((project) => {
        creatorPartnership(project, detail)
        creatorProjectTag(project, detail)
        creatorProjectSocial(project, detail)
        creatorProjectGlossary(project, detail)
        creatorProjectFeature(project, folderPath)
      })
      .catch((error) => {
        console.log('project error')
      })
  })
}

// check done
