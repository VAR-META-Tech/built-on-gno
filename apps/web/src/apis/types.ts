export interface ICategory {
  id: number
  name: string
  description: string
  parentId?: number
  createdAt: string
  updatedAt: string
  subCategories?: ICategory[]
}

export interface Pagination {
  page_size: number
  page: number
  total_items: number
  total_pages: number
}

export interface ICategoriesResponse {
  pagination: Pagination
  data: ICategory[]
}

export interface ITagsResponse {
  pagination: Pagination
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
  tags: ITag[]
}

export interface ITag {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface Partnership {
  name: string
  image: string
}

export interface Social {
  website: string
  twitter: string
  github: string
  discord: string
  telegram: string
}

export interface IProjectsResponse {
  pagination: Pagination
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
