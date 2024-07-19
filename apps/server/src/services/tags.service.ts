import { connection } from '@/databases/connection'
import { Tags } from '@/databases/entities/Tags'
import { Pagination } from '@/decorator/types'
import { getMeta } from '@/shared/get-meta'
import { orderParser } from '@/shared/parser-pagination'
import { logger } from '@/utils/logger'
import { FindOptionsOrder, FindOptionsWhere, ILike, Repository } from 'typeorm'

export class TagsService {
  constructor(
    private tagsRepository: Repository<Tags> = connection.getRepository(Tags),
  ) {}

  public async getTags(params?: Pagination) {
    const { page = 1, page_size = 10, order, search } = params
    try {
      const where: FindOptionsWhere<Tags> = {}
      if (search) {
        where.name = ILike(`%${search}%`)
      }
      const [data, count] = await this.tagsRepository.findAndCount({
        where,
        take: page_size,
        skip: (page - 1) * page_size,
        order:  orderParser(String(order)) as FindOptionsOrder<Tags>,
      })
      return { pagination: getMeta(count, page_size, page), data }
    } catch (error) {
      logger.error(error)
      throw new Error(error?.message ?? 'Something went wrong')
    }
  }
}
