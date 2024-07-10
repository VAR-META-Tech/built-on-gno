import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ProjectFeature } from './ProjectFeature.entity'

@Entity()
export class Feature {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  key: string

  @Column()
  label: string

  @Column()
  status: string

  @OneToMany(() => ProjectFeature, (projectFeature) => projectFeature.feature)
  projectFeatures: ProjectFeature[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
