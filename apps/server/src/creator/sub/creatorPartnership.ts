import { connection } from '@/databases/connection'
import { Partnerships } from '@/databases/entities/Partnerships'
import { Projects } from '@/databases/entities/Projects'
import { ProjectJSON } from '@/shared/schema/ProjectJSON'
import { logger } from '@/utils/logger'

export async function creatorPartnership(
  project: Projects,
  detail: ProjectJSON,
) {
  if (detail.partnerships.length == 0) return

  try {
    const partners: Array<Partnerships> = detail.partnerships.map((data) => {
      const partner = new Partnerships()
      partner.name = data.name
      partner.logoUrl = data.image
      partner.project = project

      return partner
    })

    if (partners.length == 0) return

    await connection.getRepository(Partnerships).save(partners)
  } catch (error) {
    logger.info('Partnership create error', error)
    throw error
  }
}

// check done
