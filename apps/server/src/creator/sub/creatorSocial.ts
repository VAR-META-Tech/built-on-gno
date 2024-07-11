import { connection } from '../../database/connection'
import { Project } from '../../database/entities/Project.entity'
import { Social } from '../../database/entities/Social.entity'
import { ProjectJSON } from '../../shares/ProjectJSON'

export function creatorSocial(project: Project, detail: ProjectJSON) {
  const socials: Array<Social> = Object.keys(detail.social).map((key) => {
    const social = new Social()
    social.type = key
    social.url = detail.social[key]
    social.project = project

    return social
  })

  if (socials.length == 0) return

  connection
    .getRepository(Social)
    .save(socials)
    .catch((error) => console.log(error))
}

// check done
