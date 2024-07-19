import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { getCategories, getCategory, getProjects, getTags } from './request'
import {
  ICategoriesResponse,
  ICategory,
  IFilterPagination,
  IFilterProjectOptions,
  IProjectsResponse,
} from './types'

export const useProjects = (
  payload?: IFilterProjectOptions,
  option?: UseQueryOptions<IProjectsResponse, Error>,
) => {
  return useQuery<IProjectsResponse, Error>({
    queryKey: ['projects', payload],
    queryFn: () => getProjects(payload),
    ...option,
  })
}

export const useCategories = (
  payload?: IFilterPagination,
  option?: UseQueryOptions<ICategoriesResponse, Error>,
) => {
  return useQuery<ICategoriesResponse, Error>({
    queryKey: ['categories'],
    queryFn: () => getCategories(payload),
    ...option,
  })
}

export const useTags = (
  payload?: IFilterPagination,
  option?: UseQueryOptions<ICategoriesResponse, Error>,
) => {
  return useQuery<ICategoriesResponse, Error>({
    queryKey: ['tags'],
    queryFn: () => getTags(payload),
    ...option,
  })
}

export const useCategory = (
  category: string,
  option?: UseQueryOptions<ICategory, Error>,
) => {
  return useQuery<ICategory, Error>({
    queryKey: ['category', category],
    queryFn: () => getCategory(category),
    ...option,
  })
}
