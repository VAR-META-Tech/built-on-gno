import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjectSocials } from "./ProjectSocials";

@Entity("socials")
export class Socials {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "social id" })
  id: number;

  @Column("varchar", { name: "name", comment: "social name", length: 50 })
  name: string;

  @Column("varchar", { name: "code", comment: "social code", length: 255 })
  code: string;

  @Column("varchar", { name: "icon_url", nullable: true, length: 255 })
  iconUrl: string | null;

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

  @OneToMany(() => ProjectSocials, (projectSocials) => projectSocials.social)
  projectSocials: ProjectSocials[];
}
