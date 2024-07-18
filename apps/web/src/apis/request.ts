import { ICategory, IPayloadGetProject, IProject, request } from "."

export const getProjects = async (payload?: IPayloadGetProject): Promise<IProject[]> => {
  const url = '/projects' + (payload?.category ? `/${payload?.category}` : '') + (payload?.sub_category ? `/${payload?.sub_category}` : '')

  return await request({
    url,
    method: "GET"
  })
}

export const getCategories = async (): Promise<ICategory[]> => {
  return await request({
    url: '/categories',
    method: "GET"
  })
}

export const getCategory = async (category: string): Promise<ICategory> => {
  return await request({
    url: '/category/' + category,
    method: "GET"
  })
}