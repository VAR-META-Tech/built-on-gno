import { CategoriesController } from '@/controllers/categories.controller'
import { Routes } from '@/decorator/routes'
import { Pagination } from '@/decorator/types'
import { makeValidate } from '@/shared/make-validate'
import { Router } from 'express'

class CategoriesRoute implements Routes {
  public path: string = '/api/v1/categories'
  public router = Router()
  private CategoriesController = new CategoriesController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(
      '/',
      makeValidate(Pagination, 'query'),
      this.CategoriesController.getCategories,
    )
    this.router.get('/:category_id', this.CategoriesController.getCategory)
  }
}

export default CategoriesRoute
