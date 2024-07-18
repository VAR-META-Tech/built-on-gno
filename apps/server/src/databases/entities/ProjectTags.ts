import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Projects } from "./Projects";
import { Tags } from "./Tags";

@Index("project_id", ["projectId"], {})
@Index("tag_id", ["tagId"], {})
@Entity("project_tags")
export class ProjectTags {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id",
    comment: "project_tag id",
  })
  id: number;

  @Column("int", { name: "project_id", comment: "project_tag project_id" })
  projectId: number;

  @Column("int", { name: "tag_id", comment: "project_tag tag_id" })
  tagId: number;

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

  @ManyToOne(() => Projects, (projects) => projects.projectTags, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "project_id", referencedColumnName: "id" }])
  project: Projects;

  @ManyToOne(() => Tags, (tags) => tags.projectTags, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "tag_id", referencedColumnName: "id" }])
  tag: Tags;
}
