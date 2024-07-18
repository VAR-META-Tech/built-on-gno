import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProjectTags } from "./ProjectTags";

@Index("name", ["name"], { unique: true })
@Entity("tags")
export class Tags {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "tag id" })
  id: number;

  @Column("varchar", {
    name: "name",
    unique: true,
    comment: "tag name",
    length: 255,
  })
  name: string;

  @Column("text", {
    name: "description",
    nullable: true,
    comment: "tag description",
  })
  description: string | null;

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

  @OneToMany(() => ProjectTags, (projectTags) => projectTags.tag)
  projectTags: ProjectTags[];
}
