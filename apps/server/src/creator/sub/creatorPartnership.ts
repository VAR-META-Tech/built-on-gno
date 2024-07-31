import { connection } from '@/databases/connection'
import { Partnerships } from '@/databases/entities/Partnerships'
import { Projects } from '@/databases/entities/Projects'
import { ProjectJSON } from '@/shared/schema/ProjectJSON'

export function creatorPartnership(project: Projects, detail: ProjectJSON) {
  if (detail.partnerships.length == 0) return

  const partners: Array<Partnerships> = detail.partnerships.map((data) => {
    const partner = new Partnerships()
    partner.name = data.name
    partner.logoUrl = data.image
    partner.project = project

    return partner
  })

  if (partners.length == 0) return

  connection
    .getRepository(Partnerships)
    .save(partners)
    .catch((error) => console.log(error))
}

// check done
