import { CrawlController } from '@/controllers/crawl.controller'
import { Routes } from '@/decorator/routes'
import { authenticationGithub } from '@/shared/middleware-github'
import { Router } from 'express'

export class CrawlRoute implements Routes {
  public path = '/api/v1/crawl'
  public router: Router = Router()
  private crawlController = new CrawlController()

  constructor() {
    this.initializeRoute()
  }

  private initializeRoute() {
    this.router.get('/', authenticationGithub, this.crawlController.crawl)
  }
}
