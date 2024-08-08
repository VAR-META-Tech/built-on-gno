import { connection } from '@/databases/connection'
import { Projects } from '@/databases/entities/Projects'
import { logger } from '@/utils/logger'

export async function deleteProject(project: Projects) {
  const projectSocialQuery = `
    DELETE FROM project_socials
    WHERE project_socials.project_id = ${project.id};
  `

  const partnershipQuery = `
    DELETE FROM partnerships
    WHERE partnerships.project_id = ${project.id}
  `

  const projectTagQuery = `
    DELETE FROM project_tags
    WHERE project_tags.project_id = ${project.id}
  `

  const projectFeatureQuery = `
    DELETE FROM project_features 
    WHERE project_features.project_id = ${project.id}`

  const projectGlossaryQuery = `
    DELETE FROM glossary_projects 
    WHERE glossary_projects.project_id = ${project.id}
  `

  const projectDescriptionQuery = `
    DELETE FROM project_descriptions 
    WHERE project_descriptions.id = ${project.id}
  `

  const projectQuery = `
    DELETE FROM projects
    WHERE projects.id = ${project.id}
  `

  try {
    await Promise.all([
      connection.manager.query(projectSocialQuery),
      connection.manager.query(partnershipQuery),
      connection.manager.query(projectTagQuery),
      connection.manager.query(projectFeatureQuery),
      connection.manager.query(projectGlossaryQuery),
      connection.manager.query(projectDescriptionQuery),
    ])
    await connection.manager.query(projectQuery)
  } catch (error) {
    logger.info('delete project error', error)
    throw error
  }
}
