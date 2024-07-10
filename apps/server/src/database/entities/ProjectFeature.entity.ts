import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Project } from './Project.entity'
import { Feature } from './Feature.entity'

@Entity()
export class ProjectFeature {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  value: boolean

  @ManyToOne(() => Project, (project) => project.projectFeatures)
  project: Project

  @ManyToOne(() => Feature, (feature) => feature.projectFeatures)
  feature: Feature

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
