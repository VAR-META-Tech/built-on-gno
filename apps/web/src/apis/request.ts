import {
  ICategoriesResponse,
  ICategory,
  IFilterPagination,
  IFilterProjectOptions,
  IProjectsResponse,
  request,
} from '.'

export const getProjects = async (
  payload?: IFilterProjectOptions,
): Promise<IProjectsResponse> => {
  return await request({
    url: '/v1/projects',
    params: payload,
    method: 'GET',
  })
}

export const getCategories = async (
  payload?: IFilterPagination,
): Promise<ICategoriesResponse> => {
  return await request({
    url: '/v1/categories',
    params: payload,
    method: 'GET',
  })
}

export const getTags = async (
  payload?: IFilterPagination,
): Promise<ICategoriesResponse> => {
  return await request({
    url: '/v1/tags',
    params: payload,
    method: 'GET',
  })
}

export const getCategory = async (category: string): Promise<ICategory> => {
  return await request({
    url: '/v1/categories/' + category,
    method: 'GET',
  })
}
