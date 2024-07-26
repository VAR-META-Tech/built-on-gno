import {
  ICategoriesResponse,
  ICategory,
  IFilterPagination,
  IFilterProjectOptions,
  IProjectsResponse,
  IProjectDetail,
  IProject,
} from '@repo/ui'
import { request } from '.'

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

export const getProject = async (
  project_id: string,
): Promise<IProjectDetail> => {
  return await request({
    url: '/v1/projects/' + project_id,
    method: 'GET',
  })
}

export const getCategory = async (category: string): Promise<ICategory> => {
  return await request({
    url: '/v1/categories/' + category,
    method: 'GET',
  })
}

export const randomProject = async (): Promise<IProject> => {
  return await request({
    url: '/v1/projects/random',
    method: 'POST',
  })
}
