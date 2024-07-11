import 'dotenv/config'
import { getParentPath } from '../utils/getParentPath'
import * as fs from 'fs/promises'
import { CategoryJSON } from '../shares/CategoryKJSON'
import { Category } from '../database/entities/Category.entity'
import { getFileName } from '../utils/getFileName'
import { connection } from '../database/connection'
import { creatorProject } from './creatorProject'

const base = process.env.BASE

export function creatorSubCategory(subPath: string) {
  // ex of subPath: /projects/DeFi/DEX
  const subPathName = getFileName(subPath)

  const parentPath = getParentPath(subPath)

  fs.readFile(`${base}/${parentPath}/category.json`, {
    encoding: 'utf-8',
  }).then((dataString) => {
    const data: CategoryJSON = JSON.parse(dataString)

    const tmp = data.sub_categories.filter(
      (entity) => (entity.pathname = subPathName),
    )
    if (tmp.length == 0) {
      console.log('This pull request is not valid')
    }

    const detail = tmp[0] // this is the detail of the category
    const category = new Category()
    category.name = detail.name
    category.pathname = detail.pathname
    category.description = detail.description
    category.parent = getFileName(parentPath)

    connection
      .getRepository(Category)
      .save(category)
      .catch((error) => console.log(error))
      .then((category) => {
        fs.readdir(`${base}/${subPath}`, { encoding: 'utf-8' }).then(
          (datas) => {
            datas.map((data) => {
              const path = `${subPath}/${data}`
              creatorProject(path, category)
            })
          },
        )
      })
  })
}

//check done
