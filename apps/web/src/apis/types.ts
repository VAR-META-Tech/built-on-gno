export interface ICategory {
  name: string
  description: string
  pathname: string
  status: string
  tags: string[]
  sub_categories: ISubCategory[]
}

export interface ISubCategory {
  name: string
  pathname: string
  status: string
  description: string
}

export interface IProject {
  name: string
  short_description: string
  industry: string[]
  display_term: string
  term: string
  tags: string[]
  partnerships: Partnership[]
  author: string
  social: Social
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


export interface IPayloadGetProject {
  category?: string,
  sub_category?: string
}