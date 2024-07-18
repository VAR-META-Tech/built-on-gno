import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Projects } from "./Projects";

@Entity("categories")
export class Categories {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "category id" })
  id: number;

  @Column("varchar", { name: "name", comment: "category name", length: 255 })
  name: string;

  @Column("text", {
    name: "description",
    nullable: true,
    comment: "category description",
  })
  description: string | null;

  @Column("int", {
    name: "parent_id",
    nullable: true,
    comment: "category parent id",
  })
  parentId: number | null;

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

  @OneToMany(() => Projects, (projects) => projects.category)
  projects: Projects[];
}
