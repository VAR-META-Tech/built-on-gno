import { DataSourceOptions } from 'typeorm'
import 'dotenv/config'
import { Category } from '../database/entities/Category.entity'
import { Project } from '../database/entities/Project.entity'
import { Partnership } from '../database/entities/Partnership.entity'
import { Social } from '../database/entities/Social.entity'
import { ProjectFeature } from '../database/entities/ProjectFeature.entity'
import { ProjectTag } from '../database/entities/ProjectTag.entity'
import { Feature } from '../database/entities/Feature.entity'
import { Tag } from '../database/entities/Tag.entity'

export const DatabaseConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [
    Category,
    Project,
    Partnership,
    Social,
    ProjectFeature,
    ProjectTag,
    Feature,
    Tag,
  ],
  synchronize: true,
}
