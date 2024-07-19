import { ProjectsController } from '@/controllers/projects.controller'
import { Routes } from '@/decorator/routes'
import { FilterProjectOption } from '@/decorator/types'
import { makeValidate } from '@/shared/make-validate'
import { Router } from 'express'

class ProjectsRoute implements Routes {
  public path: string = '/api/v1/projects'
  public router = Router()
  private projectsController = new ProjectsController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(
      '/',
      makeValidate(FilterProjectOption, 'query'),
      this.projectsController.getProjects,
    )
    this.router.get('/:project_id', this.projectsController.getProject)
  }
}

export default ProjectsRoute
