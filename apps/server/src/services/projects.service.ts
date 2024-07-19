import { connection } from '@/databases/connection'
import { Categories } from '@/databases/entities/Categories'
import { Features } from '@/databases/entities/Features'
import { Glossaries } from '@/databases/entities/Glossaries'
import { Partnerships } from '@/databases/entities/Partnerships'
import { ProjectDescriptions } from '@/databases/entities/ProjectDescriptions'
import { Projects } from '@/databases/entities/Projects'
import { ProjectSocials } from '@/databases/entities/ProjectSocials'
import { ProjectTags } from '@/databases/entities/ProjectTags'
import { Socials } from '@/databases/entities/Socials'
import { Tags } from '@/databases/entities/Tags'
import { FilterProjectOption } from '@/decorator/types'
import { getMeta } from '@/shared/get-meta'
import { orderParser } from '@/shared/parser-pagination'
import { logger } from '@/utils/logger'
import { ILike, Repository } from 'typeorm'

export class ProjectsService {
  constructor(
    private projectRepository: Repository<Projects> = connection.getRepository(
      Projects,
    ),
    private socialRepository: Repository<Socials> = connection.getRepository(
      Socials,
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
        .leftJoin(
          'project.category',
          'sub_category',
          'sub_category.id = project.category_id',
        )
        .leftJoin(Categories, 'category', 'sub_category.parent_id=category.id')
        .leftJoin(
          'project.projectTags',
          'project_tags',
          'project_tags.project_id=project.id',
        )
        .leftJoinAndMapMany(
          'project.tags',
          Tags,
          'tags',
          'project_tags.tag_id=tags.id',
        )
        .skip((page - 1) * page_size)
        .take(page_size)
      if (search) {
        query.where({ name: ILike(`%${search}%`) })
      }
      if (category_id) {
        query.andWhere('category.id = :category_id', { category_id })
      }
      if (sub_category_id) {
        query.andWhere('sub_category.id = :sub_category_id', {
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
        .leftJoinAndMapOne(
          'project.description',
          ProjectDescriptions,
          'description',
          'project.id=description.id',
        )
        .leftJoin(
          'project.projectTags',
          'project_tags',
          'project_tags.project_id=project.id',
        )
        .leftJoinAndMapMany(
          'project.tags',
          Tags,
          'tags',
          'project_tags.tag_id=tags.id',
        )
        .leftJoinAndMapOne(
          'project.sub_category',
          Categories,
          'sub_category',
          'sub_category.id = project.category_id',
        )
        .leftJoinAndMapOne(
          'project.category',
          Categories,
          'category',
          'category.id = sub_category.parent_id',
        )
        .leftJoinAndMapMany(
          'project.partnerships',
          Partnerships,
          'partnerships',
          'partnerships.project_id = project.id',
        )
        .leftJoin('project.glossaryProjects', 'glossary_projects')
        .leftJoinAndMapMany(
          'project.glossaries',
          Glossaries,
          'glossaries',
          'glossary_projects.glossary_id=glossaries.id',
        )
        .where('project.id=:id', { id: +id })
        .getOne()

      const socials = await this.socialRepository
        .createQueryBuilder('socials')
        .leftJoin(
          ProjectSocials,
          'project_socials',
          'project_socials.social_id=socials.id',
        )
        .select([
          'socials.name AS name',
          'socials.code AS code',
          'socials.icon_url AS iconUrl',
          'project_socials.id as id',
          'project_socials.url AS url',
        ])
        .where('project_socials.project_id = :project_id', {
          project_id: id,
        })
        .getRawMany()

      ;(project as Projects & { socials: Array<Socials> }).socials = socials

      const compare = await Promise.all(
        ((project as Projects & { tags: Array<Tags> }).tags ?? []).map(
          async (tag) => {
            const query = await this.projectRepository
              .createQueryBuilder('project')
              .leftJoin(
                'project.projectTags',
                'project_tags',
                'project_tags.project_id=project.id',
              )
              .leftJoin(
                'project.projectFeatures',
                'project_features',
                'project_features.project_id=project.id',
              )
              .leftJoinAndMapMany(
                'project.features',
                Features,
                'features',
                'project_features.feature_id=features.id',
              )
              .take(5)
              .where('project_tags.tag_id = :tag_id', { tag_id: tag.id })
              .getMany()
            return {
              tag,
              data: query,
            }
          },
        ),
      )

      ;(project as any).compare = compare
      return project
    } catch (error) {
      logger.error(error)
      throw new Error(error?.message ?? 'Something went wrong')
    }
  }
}
