import { connection } from '@/databases/connection'
import { Glossaries } from '@/databases/entities/Glossaries'
import { GlossaryProjects } from '@/databases/entities/GlossaryProjects'
import { Projects } from '@/databases/entities/Projects'
import { ProjectJSON } from '@/shared/schema/ProjectJSON'

export function creatorProjectGlossary(project: Projects, detail: ProjectJSON) {
  if (detail.glossaries.length == 0) return

  detail.glossaries.map((data) => {
    connection
      .getRepository(Glossaries)
      .findOneBy({ name: data })
      .then((glossary) => {
        const glossaryProject = new GlossaryProjects()
        glossaryProject.project = project
        glossaryProject.glossary = glossary

        connection
          .getRepository(GlossaryProjects)
          .save(glossaryProject)
          .catch(() => {
            console.log('glossary project error')
          })
      })
      .catch((error) => console.log(error))
  })
}
