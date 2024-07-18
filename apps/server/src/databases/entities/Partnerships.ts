import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Projects } from "./Projects";

@Index("project_id", ["projectId"], {})
@Entity("partnerships")
export class Partnerships {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id",
    comment: "partnership id",
  })
  id: number;

  @Column("varchar", { name: "name", comment: "partnership name", length: 255 })
  name: string;

  @Column("varchar", {
    name: "logo_url",
    comment: "partnership logo url",
    length: 255,
  })
  logoUrl: string;

  @Column("int", { name: "project_id", comment: "partnership project_id" })
  projectId: number;

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

  @ManyToOne(() => Projects, (projects) => projects.partnerships, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "project_id", referencedColumnName: "id" }])
  project: Projects;
}
