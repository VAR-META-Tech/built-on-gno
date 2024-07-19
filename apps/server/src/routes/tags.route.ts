import { TagsController } from '@/controllers/tags.controller'
import { Routes } from '@/decorator/routes'
import { Pagination } from '@/decorator/types'
import { makeValidate } from '@/shared/make-validate'
import { Router } from 'express'

class TagsRoute implements Routes {
  public path: string = '/api/v1/tags'
  public router = Router()
  private tagsController = new TagsController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(
      '/',
      makeValidate(Pagination, 'query'),
      this.tagsController.getTags,
    )
  }
}

export default TagsRoute
