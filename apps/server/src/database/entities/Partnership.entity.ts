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
export class Partnership {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  logoUrl: string

  @ManyToOne(() => Project, (project) => project.partnerships)
  project: Project

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
