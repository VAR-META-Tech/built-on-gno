import { connection } from '@/databases/connection'
import { Tags } from '@/databases/entities/Tags'

export async function creatorTag(tags: Array<string>) {
  const inQuery = `${tags.map((tag) => `\"${tag}\"`).join(',')}`
  // what happen if the tag is empty?
  const queryString = `
        SELECT tags.name
        FROM tags
        WHERE name IN ( ${inQuery} );
      `

  await connection.manager
    .query(queryString)
    .then((result: Array<{ name: string }>) => {
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

      connection
        .getRepository(Tags)
        .save(tagsSave)
        .catch((error) => console.log('tag save error'))
    })
    .catch((error) => {
      console.log(error)
    })
}

// check done
