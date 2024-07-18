import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GlossaryProjects } from "./GlossaryProjects";

@Entity("glossaries")
export class Glossaries {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "glossary id" })
  id: number;

  @Column("varchar", { name: "name", comment: "glossary name", length: 255 })
  name: string;

  @Column("text", {
    name: "description",
    nullable: true,
    comment: "glossary description",
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

  @OneToMany(
    () => GlossaryProjects,
    (glossaryProjects) => glossaryProjects.glossary
  )
  glossaryProjects: GlossaryProjects[];
}
