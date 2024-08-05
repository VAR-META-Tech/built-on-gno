import { CategoryJSON } from '@/shared/schema/CategoryKJSON'
import { fsWrapper } from '@/utils/fs/fsWrapper'
import { getFileName } from '@/utils/getFileName'
import { getParentPath } from '@/utils/getParentPath'
import 'dotenv/config'
import { creatorProject } from './creatorProject'
import { Categories } from '@/databases/entities/Categories'
import { connection } from '@/databases/connection'

export async function creatorSubCategory(subPath: string) {
  // ex of subPath: /projects/DeFi/DEX
  const subPathName = getFileName(subPath)

  const parentPath = getParentPath(subPath)

  const cat = await connection
    .getRepository(Categories)
    .findOneBy({ name: getFileName(parentPath) })

  fsWrapper.readFile(`${parentPath}category.json`).then((dataString) => {
    const data: CategoryJSON = JSON.parse(dataString)

    const tmp = data.sub_categories.filter(
      (entity) => (entity.pathname = subPathName),
    )
    if (tmp.length == 0) {
      console.log('This pull request is not valid')
    }

    const detail = tmp[0] // this is the detail of the category
    const category = new Categories()
    category.name = detail.name
    category.description = detail.description
    category.parentId = cat.id

    connection
      .getRepository(Categories)
      .save(category)
      .catch((error) => console.log(error))
      .then((category) => {
        fsWrapper.readdir(`${subPath}`).then((datas) => {
          datas.map((data) => {
            const path = `${subPath}/${data}`
            creatorProject(path, category)
          })
        })
      })
  })
}

//check done
