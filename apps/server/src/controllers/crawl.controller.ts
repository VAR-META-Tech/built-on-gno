import { CrawlService } from '@/services/crawl.service'
import { Request, Response } from 'express'

export class CrawlController {
  constructor(private crawlService = new CrawlService()) {}

  public crawl = (req: Request, res: Response) => {
    if (!Object.keys(req.query).includes('dataRaw')) {
      return res.status(200).send('successful')
    }
    // @ts-ignore
    const fileChanges: Array<string> = req.query.dataRaw

    if (fileChanges.length !== 0) this.crawlService.crawl(fileChanges)

    return res.status(200).send('successful')
  }
}
