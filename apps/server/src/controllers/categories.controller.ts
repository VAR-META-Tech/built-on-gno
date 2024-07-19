import { Pagination } from '@/decorator/types'
import { CategoriesService } from '@/services/categories.service'
import { logger } from '@/utils/logger'
import { Request, Response } from 'express'

export class CategoriesController {
  constructor(private categoriesService = new CategoriesService()) {}

  public getCategories = async (
    req: Request<any, any, any, Pagination>,
    res: Response,
  ): Promise<any> => {
    try {
      const allCategories = await this.categoriesService.getCategories(
        req.query,
      )
      return res.status(200).json(allCategories)
    } catch (error) {
      logger.error(error)
      return res.status(500).json({
        code: 500,
        message: error?.message ?? 'Something went wrong',
      })
    }
  }

  public getCategory = async (req: Request, res: Response): Promise<any> => {
    try {
      const category = await this.categoriesService.getCategory(
        req?.params?.category_id,
      )
      if (!category) {
        return res.status(404).json({
          code: 404,
          message: 'Category not found',
        })
      }
      return res.status(200).json(category)
    } catch (error) {
      logger.error(error)
      return res.status(500).json({
        code: 500,
        message: error?.message ?? 'Something went wrong',
      })
    }
  }
}
