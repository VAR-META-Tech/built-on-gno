import { connection } from '@/databases/connection'
import { Categories } from '@/databases/entities/Categories'
import { Pagination } from '@/decorator/types'
import { getMeta } from '@/shared/get-meta'
import { orderParser } from '@/shared/parser-pagination'
import { logger } from '@/utils/logger'
import {
  FindOptionsOrder,
  FindOptionsWhere,
  ILike,
  IsNull,
  Repository,
} from 'typeorm'

export class CategoriesService {
  constructor(
    private categories: Repository<Categories> = connection.getRepository(
      Categories,
    ),
  ) {}

  public async getCategories(params?: Pagination) {
    const { page = 1, page_size = 10, order, search } = params
    try {
      const where: FindOptionsWhere<Categories> = {
        parentId: IsNull(),
      }
      if (search) {
        where.name = ILike(`%${search}%`)
      }
      const [data, count] = await this.categories.findAndCount({
        where,
        take: page_size,
        skip: (page - 1) * page_size,
        order: orderParser(String(order)) as FindOptionsOrder<Categories>,
      })
      return { pagination: getMeta(count, page_size, page), data }
    } catch (error) {
      logger.error(error)
      throw new Error(error?.message ?? 'Something went wrong')
    }
  }

  public async getCategory(id: string) {
    try {
      const data = await this.categories.findOne({
        where: {
          parentId: IsNull(),
          id: +id,
        },
      })
      if (!data) {
        return null
      }
      const subCategories = await this.categories.find({
        where: {
          parentId: +id,
        },
      })
      ;(
        data as Categories & { subCategories: Array<Categories> }
      ).subCategories = subCategories
      return data
    } catch (error) {
      logger.error(error)
      throw new Error(error?.message ?? 'Something went wrong')
    }
  }
}
