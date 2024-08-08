import { connection } from '@/databases/connection'
import { Glossaries } from '@/databases/entities/Glossaries'
import { GlossaryProjects } from '@/databases/entities/GlossaryProjects'
import { Projects } from '@/databases/entities/Projects'
import { ProjectJSON } from '@/shared/schema/ProjectJSON'
import { logger } from '@/utils/logger'

export async function creatorProjectGlossary(
  project: Projects,
  detail: ProjectJSON,
) {
  if (detail.glossaries.length == 0) return

  try {
    await Promise.all(
      detail.glossaries.map(async (name) => {
        const glossary = await connection
          .getRepository(Glossaries)
          .findOneBy({ name })
        if (!glossary) return

        const glossaryProject = new GlossaryProjects()
        glossaryProject.project = project
        glossaryProject.glossary = glossary

        await connection.getRepository(GlossaryProjects).save(glossaryProject)
      }),
    )
  } catch (error) {
    logger.info('Glossary create error', error)
    throw error
  }
}
