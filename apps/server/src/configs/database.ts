import { DataSourceOptions } from 'typeorm'
import 'dotenv/config'
import { Categories } from '@/databases/entities/Categories'
import { Projects } from '@/databases/entities/Projects'
import { Partnerships } from '@/databases/entities/Partnerships'
import { Socials } from '@/databases/entities/Socials'
import { ProjectFeatures } from '@/databases/entities/ProjectFeatures'
import { ProjectTags } from '@/databases/entities/ProjectTags'
import { Features } from '@/databases/entities/Features'
import { Tags } from '@/databases/entities/Tags'
import { Glossaries } from '@/databases/entities/Glossaries'
import { GlossaryProjects } from '@/databases/entities/GlossaryProjects'
import { ProjectSocials } from '@/databases/entities/ProjectSocials'
import { ProjectDescriptions } from '@/databases/entities/ProjectDescriptions'

export const DatabaseConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [
    Categories,
    Projects,
    Partnerships,
    Socials,
    ProjectFeatures,
    ProjectTags,
    Features,
    Tags,
    Glossaries,
    GlossaryProjects,
    ProjectSocials,
    ProjectDescriptions,
  ],
  synchronize: true,
  logging: true,
}
