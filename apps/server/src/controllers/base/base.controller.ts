import { Request, Response } from 'express'
import { fsWrapper } from '../../utils/fs/fsWrapper'
import 'dotenv/config'
import { createCategory } from './work/createCategory'

const base = process.env.BASE

export async function buildBaseDatabase(req: Request, res: Response) {
  const rootHierachy = await fsWrapper.readdir(`${base}/projects`)
  const parentFolders = rootHierachy.filter(
    (value) => value !== 'projects.json',
  )

  createCategory(parentFolders)

  res.send('successful')
}
