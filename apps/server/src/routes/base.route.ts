import { BaseController } from '@/controllers/base.controller'
import { Routes } from '@/decorator/routes'
import { Router } from 'express'

export class BaseRoute implements Routes {
  public path: string = '/api/v1/base'
  public router = Router()
  private baseController = new BaseController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get('/', this.baseController.buildBaseDatabase)
    this.router.get('/test', this.baseController.test)
  }
}
