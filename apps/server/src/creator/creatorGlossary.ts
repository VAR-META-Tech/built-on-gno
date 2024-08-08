import { connection } from '@/databases/connection'
import { Glossaries } from '@/databases/entities/Glossaries'
import { GlossaryJSON } from '@/shared/schema/GlossaryJSON'
import { fsWrapper } from '@/utils/fs/fsWrapper'
import { logger } from '@/utils/logger'

export async function creatorGlossary(parentPath: string) {
  // parent path ex: /projects/DeFi
  try {
    const dataRaw = await fsWrapper.readFile(`${parentPath}/glossaries.json`)
    const datas: Array<GlossaryJSON> = JSON.parse(dataRaw)

    const inQuery = `${datas.map((data) => `"${data.name}"`).join(',')}`
    // what happen if the tag is empty?
    const queryString = `
      SELECT glossaries.name
      FROM glossaries
      WHERE name IN ( ${inQuery} );
  `

    const result: Array<{ name: string }> =
      await connection.manager.query(queryString)

    const glossariesNotExist = datas.filter((entity) => {
      const data = result.find((value) => value.name === entity.name)
      if (data) return false
      else return true
    })

    const glossariesSave: Array<Glossaries> = glossariesNotExist.map((data) => {
      const glossary = new Glossaries()
      glossary.name = data.name
      glossary.description = data.description

      return glossary
    })

    await connection.getRepository(Glossaries).save(glossariesSave)
  } catch (error) {
    logger.info('Glossary create error', error)
    throw error
  }
}
