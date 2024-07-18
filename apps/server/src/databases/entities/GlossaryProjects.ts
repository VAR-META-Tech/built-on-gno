import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Projects } from "./Projects";
import { Glossaries } from "./Glossaries";

@Index("project_id", ["projectId"], {})
@Index("glossary_id", ["glossaryId"], {})
@Entity("glossary_projects")
export class GlossaryProjects {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id",
    comment: "glossary_project id",
  })
  id: number;

  @Column("int", { name: "project_id", comment: "glossary_project project id" })
  projectId: number;

  @Column("int", {
    name: "glossary_id",
    comment: "glossary_project glossary id",
  })
  glossaryId: number;

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

  @ManyToOne(() => Projects, (projects) => projects.glossaryProjects, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "project_id", referencedColumnName: "id" }])
  project: Projects;

  @ManyToOne(() => Glossaries, (glossaries) => glossaries.glossaryProjects, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "glossary_id", referencedColumnName: "id" }])
  glossary: Glossaries;
}
