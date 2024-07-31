import { connection } from '@/databases/connection'
import { Projects } from '@/databases/entities/Projects'
import { ProjectTags } from '@/databases/entities/ProjectTags'
import { Tags } from '@/databases/entities/Tags'
import { ProjectJSON } from '@/shared/schema/ProjectJSON'

export function creatorProjectTag(project: Projects, detail: ProjectJSON) {
  if (detail.tags.length === 0) return

  detail.tags.map((data) => {
    connection
      .getRepository(Tags)
      .findOneBy({ name: data })
      .then((tag) => {
        const prjTag = new ProjectTags()
        prjTag.project = project
        prjTag.tag = tag

        connection
          .getRepository(ProjectTags)
          .save(prjTag)
          .catch(() => {
            console.log('project tag error')
          })
      })
      .catch((error) => console.log(error))
  })
}

// check done
