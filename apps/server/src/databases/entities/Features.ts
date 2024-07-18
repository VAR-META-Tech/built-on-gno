import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProjectFeatures } from "./ProjectFeatures";

@Index("key", ["key"], { unique: true })
@Entity("features")
export class Features {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "feature id" })
  id: number;

  @Column("varchar", {
    name: "key",
    unique: true,
    comment: "feature comparison key",
    length: 255,
  })
  key: string;

  @Column("varchar", {
    name: "label",
    comment: "feature comparison label",
    length: 255,
  })
  label: string;

  @Column("varchar", {
    name: "status",
    comment: "status of the feature",
    length: 50,
    default: () => "'active'",
  })
  status: string;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp", {
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @OneToMany(
    () => ProjectFeatures,
    (projectFeatures) => projectFeatures.feature
  )
  projectFeatures: ProjectFeatures[];
}
