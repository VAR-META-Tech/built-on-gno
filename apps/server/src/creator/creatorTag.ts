import { connection } from '@/databases/connection'
import { Tags } from '@/databases/entities/Tags'
import { logger } from '@/utils/logger'

export async function creatorTag(tags: Array<string>) {
  const inQuery = `${tags.map((tag) => `\"${tag}\"`).join(',')}`
  // what happen if the tag is empty?
  const queryString = `
        SELECT tags.name
        FROM tags
        WHERE name IN ( ${inQuery} );
      `

  try {
    const result: Array<{ name: string }> =
      await connection.manager.query(queryString)

    const tagsNotExist = tags.filter((tag) => {
      const data = result.find((value) => value.name === tag)
      if (data) return false
      else return true
    })

    const tagsSave: Array<Tags> = tagsNotExist.map((data) => {
      const tag = new Tags()
      tag.name = data
      tag.description = ''
      return tag
    })

    await connection.getRepository(Tags).save(tagsSave)
  } catch (error) {
    logger.info('Tag create error', error)
    throw error
  }
}

// check done
