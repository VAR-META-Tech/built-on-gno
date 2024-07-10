import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Project } from './Project.entity'

@Entity()
export class Social {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  type: string

  @Column()
  url: string

  @ManyToOne(() => Project, (project) => project.socials)
  project: Project

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
