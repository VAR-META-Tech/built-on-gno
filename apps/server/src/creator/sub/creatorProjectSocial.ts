import { connection } from '@/databases/connection'
import { Projects } from '@/databases/entities/Projects'
import { ProjectSocials } from '@/databases/entities/ProjectSocials'
import { Socials } from '@/databases/entities/Socials'
import { ProjectJSON } from '@/shared/schema/ProjectJSON'
import { logger } from '@/utils/logger'

export async function creatorProjectSocial(
  project: Projects,
  detail: ProjectJSON,
) {
  const codes = Object.keys(detail.social)
  if (codes.length == 0) return
  try {
    await Promise.all(
      codes.map(async (code) => {
        const social = await connection
          .getRepository(Socials)
          .findOneBy({ code })
        if (!social) return

        const projectSocial = new ProjectSocials()
        projectSocial.project = project
        projectSocial.social = social
        projectSocial.url = detail.social[code]

        await connection.getRepository(ProjectSocials).save(projectSocial)
      }),
    )
  } catch (error) {
    logger.info('Social create error', error)
    throw error
  }
}
