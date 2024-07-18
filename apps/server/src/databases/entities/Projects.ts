import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { GlossaryProjects } from './GlossaryProjects'
import { Partnerships } from './Partnerships'
import { ProjectDescriptions } from './ProjectDescriptions'
import { ProjectFeatures } from './ProjectFeatures'
import { ProjectSocials } from './ProjectSocials'
import { ProjectTags } from './ProjectTags'
import { Categories } from './Categories'


@Index("category_id", ["categoryId",], {})
@Entity("projects")
export class Projects {

  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "project id" })
  id: number;

  @Column("varchar", { name: "name", comment: "project name", length: 255 })
  name: string;

  @Column("varchar", { name: "logo_url", comment: "project logo url", length: 255 })
  logoUrl: string;

  @Column("text", { name: "short_description", comment: "project short description" })
  shortDescription: string;

  @Column("varchar", { name: "author", comment: "project author name", length: 255 })
  author: string;

  @Column("int", { name: "category_id", comment: "project category_id" })
  categoryId: number;

  @Column("timestamp", { name: "created_at", default: () => "CURRENT_TIMESTAMP", })
  createdAt: Date;

  @Column("timestamp", { name: "updated_at", default: () => "CURRENT_TIMESTAMP", })
  updatedAt: Date;

  @OneToMany(() => GlossaryProjects, glossaryProjects => glossaryProjects.project)
  glossaryProjects: GlossaryProjects[];

  @OneToMany(() => Partnerships, partnerships => partnerships.project)
  partnerships: Partnerships[];

  @OneToOne(() => ProjectDescriptions, projectDescriptions => projectDescriptions.project)
  projectDescriptions: ProjectDescriptions;

  @OneToMany(() => ProjectFeatures, projectFeatures => projectFeatures.project)
  projectFeatures: ProjectFeatures[];

  @OneToMany(() => ProjectSocials, projectSocials => projectSocials.project)
  projectSocials: ProjectSocials[];

  @OneToMany(() => ProjectTags, projectTags => projectTags.project)
  projectTags: ProjectTags[];

  @ManyToOne(() => Categories, categories => categories.projects, { onDelete: "NO ACTION", onUpdate: "NO ACTION" })
  @JoinColumn([{ name: "category_id", referencedColumnName: "id" }])
  category: Categories;

}
