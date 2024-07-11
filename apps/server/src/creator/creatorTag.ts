import { connection } from '../database/connection'
import { Tag } from '../database/entities/Tag.entity'

export function creatorTag(tags: Array<string>) {
  if (tags.length == 0) return Promise.resolve([])
  return new Promise((res, rej) => {
    const inQuery = `${tags.map((tag) => `\"${tag}\"`).join(',')}`
    // what happen if the tag is empty?
    const queryString = `
        SELECT tag.name
        FROM tag
        WHERE name IN ( ${inQuery} );
      `

    connection.manager
      .query(queryString)
      .then((result: Array<{ name: string }>) => {
        const tagsNotExist = tags.filter((tag) => {
          const data = result.find((value) => value.name === tag)
          if (data) return false
          else return true
        })

        const tagsSave: Array<Tag> = tagsNotExist.map((data) => {
          const tag = new Tag()
          tag.name = data
          tag.description = ''
          return tag
        })

        connection
          .getRepository(Tag)
          .save(tagsSave)
          .then((result) => {
            res(result)
          })
          .catch((error) => console.log('tag save error'))
      })
      .catch((error) => {
        rej(error)
      })
  })
}

// check done
