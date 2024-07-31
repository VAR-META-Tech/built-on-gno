import { deleteProject } from './crawl/utils/deleteProject'
import { connection } from './databases/connection'
import { Projects } from './databases/entities/Projects'

async function main() {
  await connection.initialize()

  const project = await connection
    .getRepository(Projects)
    .findOneBy({ name: 'DeFi' })

  console.log(project)

  deleteProject(project)
}

main()
