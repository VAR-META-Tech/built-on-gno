import { connection } from '@/databases/connection'
import { Features } from '@/databases/entities/Features'
import { ProjectFeatures } from '@/databases/entities/ProjectFeatures'
import { Projects } from '@/databases/entities/Projects'
import { fsWrapper } from '@/utils/fs/fsWrapper'

export async function creatorProjectFeature(
  project: Projects,
  projectPath: string,
) {
  const dir = await fsWrapper.readdir(`${projectPath}`)
  if (!dir.includes('features.json')) return

  const dataRaw = await fsWrapper.readFile(`${projectPath}/features.json`)
  const datas: Array<any> = JSON.parse(dataRaw)

  if (datas.length == 0) {
    console.log('Having features file but not have data in it???')
    return
  }

  datas.map((data) => {
    connection
      .getRepository(Features)
      .findOneBy({ key: data.key })
      .then((feature) => {
        const projectFeature = new ProjectFeatures()
        projectFeature.project = project
        projectFeature.feature = feature
        projectFeature.value = data.value

        connection
          .getRepository(ProjectFeatures)
          .save(projectFeature)
          .catch((error) => console.log('save project feature error'))
      })
      .catch((error) => console.log('Feature not exist ?'))
  })
}
