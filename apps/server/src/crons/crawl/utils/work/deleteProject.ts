import { connection } from '../../../../database/connection'
import { Project } from '../../../../database/entities/Project.entity'

export function deleteProject(project: Project) {
  const socialQuery = `
    DELETE FROM social
    WHERE social.projectId = ${project.id};
  `

  const partnershipQuery = `
    DELETE FROM partnership
    WHERE partnership.projectId = ${project.id}
  `

  const projectTagQuery = `
    DELETE FROM project_tag
    WHERE project_tag.projectId = ${project.id}
  `

  const projectQuery = `
    DELETE FROM project
    WHERE project.id = ${project.id}
  `

  Promise.all([
    connection.manager.query(socialQuery),
    connection.manager.query(partnershipQuery),
    connection.manager.query(projectTagQuery),
  ])
    .then(() => {
      connection.manager.query(projectQuery)
    })
    .catch((error) => console.log(error))
}
