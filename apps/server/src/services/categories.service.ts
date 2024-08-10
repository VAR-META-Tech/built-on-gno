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
      const query = await this.categories
        .createQueryBuilder('categories')
        .where('categories.parent_id IS NULL')
        .skip((page - 1) * page_size)
        .take(page_size)

      if (search) {
        query.andWhere('lower(categories.name) LIKE lower(:search)', {
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

  public async getCategory(id: string) {
    try {
      const data = await this.categories
        .createQueryBuilder('categories')
        .where('categories.parent_id IS NULL')
        .andWhere('categories.id = :category_id', { category_id: id })
        .getOne()
      if (!data) {
        return null
      }

      const subCategories = await this.categories
        .createQueryBuilder('categories')
        .where('categories.parent_id = :category_id', { category_id: id })
        .getMany()
      return { ...data, subCategories }
    } catch (error) {
      logger.error(error)
      throw new Error(error?.message ?? 'Something went wrong')
    }
  }
}
