import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Category } from './Category.entity'
import { Partnership } from './Partnership.entity'
import { Social } from './Social.entity'
import { ProjectFeature } from './ProjectFeature.entity'
import { ProjectTag } from './ProjectTag.entity'

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  logoUrl: string

  @Column()
  shortDescription: string

  // @Column()
  // description: string

  @Column()
  author: string

  @ManyToOne(() => Category, (category) => category.projects)
  category: Category

  @OneToMany(() => Partnership, (partnership) => partnership.project)
  partnerships: Partnership[]

  @OneToMany(() => Social, (social) => social.project)
  socials: Social[]

  @OneToMany(() => ProjectFeature, (projectFeature) => projectFeature.project)
  projectFeatures: ProjectFeature[]

  @OneToMany(() => ProjectTag, (projectTag) => projectTag.project)
  projectTags: ProjectTag[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
