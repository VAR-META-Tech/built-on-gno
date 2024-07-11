import 'dotenv/config'
import * as fs from 'fs/promises'
import { CategoryJSON } from '../shares/CategoryKJSON'
import { Category } from '../database/entities/Category.entity'
import { creatorTag } from './creatorTag'
import { connection } from '../database/connection'
import { creatorSubCategory } from './creatorSubCategory'

const base = process.env.BASE

export function creatorParentCategory(parentPath: string) {
  // ex of parent path: /projects/DeFi
  fs.readFile(`${base}/${parentPath}/category.json`, {
    encoding: 'utf-8',
  }).then((dataString) => {
    const data: CategoryJSON = JSON.parse(dataString)

    const category = new Category()
    category.name = data.name
    category.pathname = data.pathname
    category.description = data.description
    category.parent = null

    creatorTag(data.tags)

    connection
      .getRepository(Category)
      .save(category)
      .then((category) => {
        if (data.sub_categories.length !== 0) {
          data.sub_categories.map((detail) => {
            const subPath = `${parentPath}/${detail.pathname}`
            creatorSubCategory(subPath)
          })
        }
      })
  })
}
