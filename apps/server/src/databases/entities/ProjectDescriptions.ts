import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Projects } from './Projects';


@Entity("project_descriptions")
export class ProjectDescriptions {

  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "project id" })
  id: number;

  @Column("text", { name: "description", comment: "project_description description" })
  description: string;

  @Column("timestamp", { name: "created_at", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column("timestamp", { name: "updated_at", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @OneToOne(() => Projects, projects => projects.projectDescriptions, { onDelete: "NO ACTION", onUpdate: "NO ACTION" })
  @JoinColumn([{ name: "id", referencedColumnName: "id" }])
  project: Projects;

}
