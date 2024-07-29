import { connection } from '@/databases/connection'
import { Projects } from '@/databases/entities/Projects'
import { ProjectTags } from '@/databases/entities/ProjectTags'
import { FilterProjectOption } from '@/decorator/types'
import { getMeta } from '@/shared/get-meta'
import { orderParser } from '@/shared/parser-pagination'
import { logger } from '@/utils/logger'
import { Repository } from 'typeorm'

export class ProjectsService {
  constructor(
    private projectRepository: Repository<Projects> = connection.getRepository(
      Projects,
    ),
    private projectTagsRepository: Repository<ProjectTags> = connection.getRepository(
      ProjectTags,
    ),
  ) {}

  public async getProjects(params?: FilterProjectOption) {
    const {
      page = 1,
      page_size = 10,
      order,
      search,
      category_id,
      sub_category_id,
      tag_id,
    } = params
    try {
      const query = await this.projectRepository
        .createQueryBuilder('project')
        .leftJoinAndSelect('project.category', 'category')
        .leftJoinAndSelect('category.parent', 'parent_category')
        .leftJoinAndSelect('project.projectTags', 'project_tags')
        .leftJoinAndSelect('project_tags.tag', 'tags')
        .skip((page - 1) * page_size)
        .take(page_size)
      if (search) {
        query.andWhere('lower(project.name) LIKE lower(:search)', {
          search: `%${search}%`,
        })
      }
      if (category_id) {
        query.andWhere('parent_category.id = :category_id', { category_id })
      }
      if (sub_category_id) {
        query.andWhere('category.id = :sub_category_id', {
          sub_category_id,
        })
      }
      if (tag_id) {
        const subQuery = query
          .subQuery()
          .select('project_tags.project_id')
          .from(ProjectTags, 'project_tags')
          .where('project_tags.tag_id = :tag_id', { tag_id })
        query.andWhere('project.id IN (' + subQuery.getQuery() + ')')
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

  public async getProject(id: string) {
    try {
      const project = await this.projectRepository
        .createQueryBuilder('project')
        .leftJoinAndSelect('project.category', 'category')
        .leftJoinAndSelect('category.parent', 'parent_category')
        .leftJoinAndSelect('project.projectTags', 'project_tags')
        .leftJoinAndSelect('project_tags.tag', 'tags')
        .leftJoinAndSelect('project.projectDescriptions', 'description')
        .leftJoinAndSelect('project.partnerships', 'partnerships')
        .leftJoinAndSelect('project.glossaryProjects', 'glossary_projects')
        .leftJoinAndSelect('glossary_projects.glossary', 'glossary')
        .leftJoinAndSelect('project.projectSocials', 'project_socials')
        .leftJoinAndSelect('project_socials.social', 'social')
        .where('project.id=:id', { id: +id })
        .getOne()
      if (!project) return null

      const compares = await this.getCompareByProject(id)

      return { ...project, compares }
    } catch (error) {
      logger.error(error)
      throw new Error(error?.message ?? 'Something went wrong')
    }
  }

  public async getCompareByProject(project_id: string) {
    try {
      const tags = await this.projectTagsRepository
        .createQueryBuilder('project_tags')
        .leftJoinAndSelect('project_tags.tag', 'tag')
        .where('project_tags.project_id = :project_id', { project_id })
        .getMany()

      const result = await Promise.all(
        (tags ?? []).map(async (tag) => {
          const project = await this.projectRepository
            .createQueryBuilder('project')
            .leftJoinAndSelect('project.projectFeatures', 'project_features')
            .leftJoinAndSelect('project_features.feature', 'feature')
            .where('project.id = :project_id', { project_id })
            .getOne()
          const compares = await this.projectRepository
            .createQueryBuilder('project')
            .leftJoin('project.projectTags', 'project_tags')
            .leftJoinAndSelect('project.projectFeatures', 'project_features')
            .leftJoinAndSelect('project_features.feature', 'feature')
            .andWhere('project_tags.tag_id = :tag', { tag: tag.tagId })
            .andWhere('project.id != :project_id', { project_id })
            .take(4)
            .getMany()
          return { tag: tag.tag, data: [project, ...compares] }
        }),
      )
      return result
    } catch (error) {
      throw new Error(error?.message ?? 'Something went wrong')
    }
  }

  public async randomProject() {
    try {
      const project = await this.projectRepository
        .createQueryBuilder('project')
        .select('project.id')
        .orderBy('RAND()')
        .getOne()
      return project
    } catch (error) {
      throw new Error(error?.message ?? 'Something went wrong')
    }
  }
}
