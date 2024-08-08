import { connection } from '@/databases/connection'
import { Features } from '@/databases/entities/Features'
import { ProjectFeatures } from '@/databases/entities/ProjectFeatures'
import { Projects } from '@/databases/entities/Projects'
import { fsWrapper } from '@/utils/fs/fsWrapper'
import { logger } from '@/utils/logger'

export async function creatorProjectFeature(
  project: Projects,
  projectPath: string,
) {
  try {
    const dir = await fsWrapper.readdir(`${projectPath}`)
    if (!dir.includes('features.json')) return

    const dataRaw = await fsWrapper.readFile(`${projectPath}/features.json`)
    const datas: Array<any> = JSON.parse(dataRaw)

    if (datas.length == 0) {
      console.log('Having features file but not have data in it???')
      return
    }

    await Promise.all(
      datas.map(async (data) => {
        const feature = await connection
          .getRepository(Features)
          .findOneBy({ key: data?.key })

        if (!feature) return

        const projectFeature = new ProjectFeatures()
        projectFeature.project = project
        projectFeature.feature = feature
        projectFeature.value = data.value

        await connection.getRepository(ProjectFeatures).save(projectFeature)
      }),
    )
  } catch (error) {
    logger.info('Project feature create error', error)
    throw error
  }
}
