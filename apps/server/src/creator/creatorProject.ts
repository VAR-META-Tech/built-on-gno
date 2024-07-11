import * as fs from 'fs/promises'
import { Project } from '../database/entities/Project.entity'
import { ProjectJSON } from '../shares/ProjectJSON'
import { connection } from '../database/connection'
import { creatorSocial } from './sub/creatorSocial'
import { creatorProjectTag } from './sub/createProjectTag'
import { creatorPartnership } from './sub/creatorPartnership'
import 'dotenv/config'

const base = process.env.BASE

export function creatorProject(folderPath: string, category) {
  // folder path is the full path, not the folder name, Ex: /projects/DeFi/DEX/Coinlink
  fs.readFile(`${base}/${folderPath}/info.json`, { encoding: 'utf-8' }).then(
    (data) => {
      const detail: ProjectJSON = JSON.parse(data)

      const project = new Project()
      project.name = detail.display_term
      project.logoUrl = ''
      project.shortDescription = detail.short_description
      project.author = detail.author
      project.category = category

      connection
        .getRepository(Project)
        .save(project)
        .then((project) => {
          creatorSocial(project, detail)
          creatorPartnership(project, detail)
          creatorProjectTag(project, detail)
        })
        .catch((error) => {
          console.log('project error')
        })
    },
  )
}

// check done
