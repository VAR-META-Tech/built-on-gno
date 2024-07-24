export interface ICategory {
  id: number
  name: string
  description: string
  parentId?: number
  createdAt: string
  updatedAt: string
  parent: ICategory
  subCategories?: ICategory[]
}

export interface IPagination {
  page_size: number
  page: number
  total_items: number
  total_pages: number
}

export interface ICategoriesResponse {
  pagination: IPagination
  data: ICategory[]
}

export interface ITagsResponse {
  pagination: IPagination
  data: ITag[]
}

export interface IProject {
  id: number
  name: string
  logoUrl: string
  shortDescription: string
  author: string
  categoryId: number
  createdAt: string
  updatedAt: string
  category: ICategory
  projectTags: IProjectTag[]
}

export interface IProjectTag {
  id: number
  projectId: number
  tagId: number
  createdAt: string
  updatedAt: string
  tag: ITag
}

export interface ITag {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface IProjectsResponse {
  pagination: IPagination
  data: IProject[]
}

export interface IFilterPagination {
  page?: number
  page_size?: number
  order?: string
  search?: string
}
export interface IFilterProjectOptions extends IFilterPagination {
  category_id?: number
  sub_category_id?: number
  tag_id?: number
}

export interface IProjectDetail {
  id: number
  name: string
  logoUrl: string
  shortDescription: string
  author: string
  categoryId: number
  createdAt: string
  updatedAt: string
  category: ICategory
  projectDescriptions: ProjectDescriptions
  projectTags: IProjectTag[]
  partnerships: IPartnership[]
  glossaryProjects: IGlossaryProject[]
  projectSocials: ProjectSocial[]
  compares: ICompare[]
}
export interface ProjectDescriptions {
  id: number
  description: string
  createdAt: string
  updatedAt: string
}

export interface IPartnership {
  id: number
  name: string
  logoUrl: string
  projectId: number
  createdAt: string
  updatedAt: string
}

export interface IGlossaryProject {
  id: number
  projectId: number
  glossaryId: number
  createdAt: string
  updatedAt: string
  glossary: IGlossary
}

export interface ProjectSocial {
  id: number
  socialId: number
  url: string
  projectId: number
  createdAt: string
  updatedAt: string
  social: ISocial
}
export interface IGlossary {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface ISocial {
  name: string
  code: string
  iconUrl: string
  id: number
  url: string
}

export interface ICompare {
  tag: ITag
  data: IProjectCompare[]
}

export interface IProjectCompare {
  id: number
  name: string
  logoUrl: string
  shortDescription: string
  author: string
  categoryId: number
  createdAt: string
  updatedAt: string
  projectFeatures: IProjectFeature[]
}

export interface IProjectFeature {
  id: number
  projectId: number
  featureId: number
  value: number
  createdAt: string
  updatedAt: string
  feature: IFeature
}

export interface IFeature {
  id: number
  key: string
  label: string
  status: string
  createdAt: string
  updatedAt: string
}
