import { connection } from '@/databases/connection'
import { Projects } from '@/databases/entities/Projects'
import { ProjectTags } from '@/databases/entities/ProjectTags'
import { Tags } from '@/databases/entities/Tags'
import { ProjectJSON } from '@/shared/schema/ProjectJSON'
import { logger } from '@/utils/logger'

export async function creatorProjectTag(
  project: Projects,
  detail: ProjectJSON,
) {
  if (detail.tags.length === 0) return
  try {
    await Promise.all(
      detail.tags.map(async (name) => {
        const tag = await connection.getRepository(Tags).findOneBy({ name })
        if (!tag) return

        const prjTag = new ProjectTags()
        prjTag.project = project
        prjTag.tag = tag

        await connection.getRepository(ProjectTags).save(prjTag)
      }),
    )
  } catch (error) {
    logger.info('Project tag create error', error)
    throw error
  }
}

// check done
