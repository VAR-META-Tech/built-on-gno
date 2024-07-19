import { Pagination } from '@/decorator/types'
import { TagsService } from '@/services/tags.service'
import { logger } from '@/utils/logger'
import { Request, Response } from 'express'

export class TagsController {
  constructor(private tagsService = new TagsService()) {}

  public getTags = async (
    req: Request<any, any, any, Pagination>,
    res: Response,
  ): Promise<any> => {
    try {
      const tags = await this.tagsService.getTags(req.query)
      return res.status(200).json(tags)
    } catch (error) {
      logger.error(error)
      return res.status(500).json({
        code: 500,
        message: error?.message ?? 'Something went wrong',
      })
    }
  }
}
