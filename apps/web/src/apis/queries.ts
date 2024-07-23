import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { getCategories, getCategory, getProjects, getTags } from './request'
import {
  ICategoriesResponse,
  ICategory,
  IFilterPagination,
  IFilterProjectOptions,
  IProjectsResponse,
} from '@repo/ui'

export const useProjects = (
  payload?: IFilterProjectOptions,
  option?: Partial<UseQueryOptions<IProjectsResponse, Error>>,
) => {
  return useQuery<IProjectsResponse, Error>({
    queryKey: ['projects', payload],
    queryFn: () => getProjects(payload),
    ...option,
  })
}

export const useCategories = (
  payload?: IFilterPagination,
  option?: Partial<UseQueryOptions<ICategoriesResponse, Error>>,
) => {
  return useQuery<ICategoriesResponse, Error>({
    queryKey: ['categories', payload],
    queryFn: () => getCategories(payload),
    ...option,
  })
}

export const useTags = (
  payload?: IFilterPagination,
  option?: Partial<UseQueryOptions<ICategoriesResponse, Error>>,
) => {
  return useQuery<ICategoriesResponse, Error>({
    queryKey: ['tags', payload],
    queryFn: () => getTags(payload),
    ...option,
  })
}

export const useCategory = (
  category: string,
  option?: Partial<UseQueryOptions<ICategory, Error>>,
) => {
  return useQuery<ICategory, Error>({
    queryKey: ['category', category],
    queryFn: () => getCategory(category),
    ...option,
  })
}
