import { classificationCase } from '@/crawl/classificationCase'
import { handleCase } from '@/crawl/handleCase'

export class CrawlService {
  public async crawl(fileChanges: Array<string>) {
    // Group to consistent case

    try {
      const listCase = await classificationCase(fileChanges)

      console.log('List case', listCase)

      // Handle case
      await handleCase(listCase)
      return {
        message: 'successful',
        code: 200,
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}
