import { connection } from '@/databases/connection'
import { Tags } from '@/databases/entities/Tags'
import { Pagination } from '@/decorator/types'
import { getMeta } from '@/shared/get-meta'
import { orderParser } from '@/shared/parser-pagination'
import { logger } from '@/utils/logger'
import { Repository } from 'typeorm'

export class TagsService {
  constructor(
    private tagsRepository: Repository<Tags> = connection.getRepository(Tags),
  ) {}

  public async getTags(params?: Pagination) {
    const { page = 1, page_size = 10, order, search } = params
    try {
      const query = await this.tagsRepository
        .createQueryBuilder('tags')
        .skip((page - 1) * page_size)
        .take(page_size)
      if (search) {
        query.andWhere('lower(tags.name) LIKE lower(:search)', {
          search: `%${search}%`,
        })
      }
      if (order) {
        const parser = orderParser(String(order))
        Object.keys(parser).forEach((key) =>
          query.addOrderBy(key, parser[key as keyof typeof parser]),
        )
      }

      const [data, count] = await query.getManyAndCount()
      return { pagination: getMeta(count, page_size, page), data }
    } catch (error) {
      logger.error(error)
      throw new Error(error?.message ?? 'Something went wrong')
    }
  }
}
