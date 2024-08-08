import { connection } from '@/databases/connection'
import { Features } from '@/databases/entities/Features'
import { FeatureJSON } from '@/shared/schema/FeatureJSON'
import { fsWrapper } from '@/utils/fs/fsWrapper'
import { logger } from '@/utils/logger'

export async function creatorFeature(parentPath: string) {
  // parent path ex: /projects/DeFi
  try {
    const dataRaw = await fsWrapper.readFile(`${parentPath}/features.json`)

    const datas: Array<FeatureJSON> = JSON.parse(dataRaw)

    const inQuery = `${datas.map((data) => `"${data.key}"`).join(',')}`

    // what happen if the tag is empty?
    const queryString = `
      SELECT features.key
      FROM features
      WHERE features.key IN ( ${inQuery} );
  `

    const result: Array<{ key: string }> =
      await connection.manager.query(queryString)

    const featuresNotExist = datas.filter((entity) => {
      const data = result.find((value) => value.key === entity.key)
      if (data) return false
      else return true
    })

    const featuresSave: Array<Features> = featuresNotExist.map((data) => {
      const feature = new Features()
      feature.key = data.key
      feature.label = data.label
      feature.status = data.status

      return feature
    })

    await connection.getRepository(Features).save(featuresSave)
  } catch (error) {
    logger.info('Feature create error', error)
    throw error
  }
}
