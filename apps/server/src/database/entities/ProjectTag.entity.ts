import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Project } from './Project.entity'
import { Tag } from './Tag.entity'

@Entity()
export class ProjectTag {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Project, (project) => project.projectTags)
  project: Project

  @ManyToOne(() => Tag, (tag) => tag.projectTags)
  tag: Tag

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
