import { Request, Response } from 'express'
import 'dotenv/config'
import { creatorParentCategory } from '@/creator/creatorParentCategory'
import { fsWrapper } from '@/utils/fs/fsWrapper'
import { creatorSocial } from '@/creator/creatorSocial'

function createCategory(parentFolders) {
  parentFolders.map((folder) => {
    const path = `/projects/${folder}`
    creatorParentCategory(path)
  })
}

export class BaseController {
  public buildBaseDatabase = async (req: Request, res: Response) => {
    await creatorSocial()
    const rootHierachy = await fsWrapper.readdir(`/projects`)
    const parentFolders = rootHierachy.filter(
      (value) => value !== 'projects.json' && value !== 'socials.json',
    )

    createCategory(parentFolders)

    res.send('successful')
  }

  public test = async (req, res) => {
    console.log('come here')

    res.send('successful')
  }
}
