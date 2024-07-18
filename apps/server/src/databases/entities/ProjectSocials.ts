import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Socials } from "./Socials";
import { Projects } from "./Projects";

@Index("social_id", ["socialId"], {})
@Index("project_id", ["projectId"], {})
@Entity("project_socials")
export class ProjectSocials {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id",
    comment: "project_social id",
  })
  id: number;

  @Column("int", { name: "social_id", comment: "project_social social id" })
  socialId: number;

  @Column("varchar", {
    name: "url",
    comment: "project_social url",
    length: 255,
  })
  url: string;

  @Column("int", { name: "project_id", comment: "project_social project_id" })
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

  @ManyToOne(() => Socials, (socials) => socials.projectSocials, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "social_id", referencedColumnName: "id" }])
  social: Socials;

  @ManyToOne(() => Projects, (projects) => projects.projectSocials, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "project_id", referencedColumnName: "id" }])
  project: Projects;
}
