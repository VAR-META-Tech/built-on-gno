import { connection } from '@/databases/connection'
import { Projects } from '@/databases/entities/Projects'
import { ProjectSocials } from '@/databases/entities/ProjectSocials'
import { Socials } from '@/databases/entities/Socials'
import { ProjectJSON } from '@/shared/schema/ProjectJSON'

export function creatorProjectSocial(project: Projects, detail: ProjectJSON) {
  const indexs = Object.keys(detail.social)
  if (indexs.length == 0) return

  indexs.map((index) => {
    const code = index
    connection
      .getRepository(Socials)
      .findOneBy({ code })
      .then((social) => {
        const projectSocial = new ProjectSocials()
        projectSocial.project = project
        projectSocial.social = social
        projectSocial.url = detail.social[index]

        connection.getRepository(ProjectSocials).save(projectSocial)
      })
      .catch((error) => console.log('Social parent category data wrong'))
  })
}
