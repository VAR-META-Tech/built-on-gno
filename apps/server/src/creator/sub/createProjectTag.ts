import { connection } from '../../database/connection'
import { Project } from '../../database/entities/Project.entity'
import { ProjectTag } from '../../database/entities/ProjectTag.entity'
import { Tag } from '../../database/entities/Tag.entity'
import { ProjectJSON } from '../../shares/ProjectJSON'

export function creatorProjectTag(project: Project, detail: ProjectJSON) {
  if (detail.tags.length === 0) return

  detail.tags.map((data) => {
    connection
      .getRepository(Tag)
      .findOneBy({ name: data })
      .then((tag) => {
        const prjTag = new ProjectTag()
        prjTag.project = project
        prjTag.tag = tag

        connection
          .getRepository(ProjectTag)
          .save(prjTag)
          .catch(() => {
            console.log('project tag error')
          })
      })
      .catch((error) => console.log(error))
  })
}

// check done
