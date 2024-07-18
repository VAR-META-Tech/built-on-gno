import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Projects } from "./Projects";
import { Features } from "./Features";

@Index("project_id", ["projectId"], {})
@Index("feature_id", ["featureId"], {})
@Entity("project_features")
export class ProjectFeatures {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id",
    comment: "project_feature id",
  })
  id: number;

  @Column("int", { name: "project_id", comment: "project_feature project_id" })
  projectId: number;

  @Column("int", { name: "feature_id", comment: "project_feature feature_id" })
  featureId: number;

  @Column("tinyint", {
    name: "value",
    comment: "feature comparison value",
    width: 1,
  })
  value: boolean;

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

  @ManyToOne(() => Projects, (projects) => projects.projectFeatures, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "project_id", referencedColumnName: "id" }])
  project: Projects;

  @ManyToOne(() => Features, (features) => features.projectFeatures, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "feature_id", referencedColumnName: "id" }])
  feature: Features;
}
