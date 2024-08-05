import { classificationCase } from '@/crawl/classificationCase'
import { getListFileChange } from '@/crawl/getListFileChange'
import { handleCase } from '@/crawl/handleCase'

export class CrawlService {
  public async crawl(fileChanges: Array<string>) {
    // Group to consistent case

    const listCase = await classificationCase(fileChanges)

    console.log('List case', listCase)

    // Handle case
    handleCase(listCase).then(() => console.log('Handle done'))
  }
}
