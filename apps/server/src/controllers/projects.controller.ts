import { FilterProjectOption } from '@/decorator/types'
import { ProjectsService } from '@/services/projects.service'
import { logger } from '@/utils/logger'
import { Request, Response } from 'express'

export class ProjectsController {
  constructor(private projectsService = new ProjectsService()) {}

  public getProjects = async (
    req: Request<any, any, any, FilterProjectOption>,
    res: Response,
  ): Promise<any> => {
    try {
      const projects = await this.projectsService.getProjects(req.query)
      return res.status(200).json(projects)
    } catch (error) {
      logger.error(error)
      return res.status(500).json({
        code: 500,
        message: error?.message ?? 'Something went wrong',
      })
    }
  }

  public getProject = async (req: Request, res: Response): Promise<any> => {
    try {
      const project = await this.projectsService.getProject(
        req?.params?.project_id,
      )
      if (!project) {
        return res.status(404).json({
          code: 404,
          message: 'project not found',
        })
      }
      return res.status(200).json(project)
    } catch (error) {
      logger.error(error)
      return res.status(500).json({
        code: 500,
        message: error?.message ?? 'Something went wrong',
      })
    }
  }
}
