import { CrawlService } from '@/services/crawl.service'
import { Request, Response } from 'express'

export class CrawlController {
  constructor(private crawlService = new CrawlService()) {}

  public crawl = async (
    req: Request<any, any, any, { dataRaw: Array<string> }>,
    res: Response,
  ) => {
    if (!Object.keys(req.query).includes('dataRaw')) {
      return res.status(400).send({
        message: 'dataRaw is required',
        code: 400,
      })
    }
    // @ts-ignore
    try {
      const fileChanges: Array<string> = req.query.dataRaw

      if (fileChanges.length !== 0) {
        const result = await this.crawlService.crawl(fileChanges)

        return res.status(200).json(result)
      }

      return res.status(200).json({
        code: 200,
        message: 'no file changes found',
      })
    } catch (error) {
      return res.status(400).json({
        code: 400,
        message: error?.message ?? 'Something went wrong',
      })
    }
  }
}
