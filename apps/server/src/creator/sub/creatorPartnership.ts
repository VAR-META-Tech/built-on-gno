import { connection } from '../../database/connection'
import { Partnership } from '../../database/entities/Partnership.entity'
import { Project } from '../../database/entities/Project.entity'
import { ProjectJSON } from '../../shares/ProjectJSON'

export function creatorPartnership(project: Project, detail: ProjectJSON) {
  const partners: Array<Partnership> = detail.partnerships.map((data) => {
    const partner = new Partnership()
    partner.name = data.name
    partner.logoUrl = data.image
    partner.project = project

    return partner
  })

  if (partners.length == 0) return

  connection
    .getRepository(Partnership)
    .save(partners)
    .catch((error) => console.log(error))
}

// check done
