import { connection } from '@/databases/connection'
import { Categories } from '@/databases/entities/Categories'
import { CategoryJSON } from '@/shared/schema/CategoryKJSON'
import { fsWrapper } from '@/utils/fs/fsWrapper'
import { getFileName } from '@/utils/getFileName'
import { getParentPath } from '@/utils/getParentPath'
import { logger } from '@/utils/logger'
import 'dotenv/config'
import { creatorProject } from './creatorProject'

export async function creatorSubCategory(subPath: string) {
  // ex of subPath: /projects/DeFi/DEX
  const subPathName = getFileName(subPath)

  const parentPath = getParentPath(subPath)

  try {
    const dataString = await fsWrapper.readFile(`${parentPath}/category.json`)
    const data: CategoryJSON = JSON.parse(dataString)
    const cat = await connection
      .getRepository(Categories)
      .findOneBy({ name: data?.name })

    const tmp = data.sub_categories.filter(
      (entity) => (entity.pathname === subPathName),
    )
    if (tmp.length == 0) {
      console.log('This pull request is not valid')
    }

    const detail = tmp[0] // this is the detail of the category
    const category = new Categories()
    category.name = detail.name
    category.description = detail.description
    category.parentId = cat.parentId

    const created = await connection.getRepository(Categories).save(category)

    const datas = await fsWrapper.readdir(`${subPath}`)
    await Promise.all(
      datas.map(async (data) => {
        const path = `${subPath}/${data}`
        await creatorProject(path, created)
      }),
    )
  } catch (error) {
    logger.info('Sub category create error', error)
    throw error
  }
}

//check done
