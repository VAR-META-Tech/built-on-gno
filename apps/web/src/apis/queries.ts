import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query'
import {
  getCategories,
  getCategory,
  getCompareProject,
  getProject,
  getProjects,
  getTags,
  randomProject,
} from './request'
import {
  ICategoriesResponse,
  ICategory,
  ICompare,
  IComparePayload,
  IFilterPagination,
  IFilterProjectOptions,
  IProject,
  IProjectDetail,
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
  categoryId: string,
  option?: Partial<UseQueryOptions<ICategory, Error>>,
) => {
  return useQuery<ICategory, Error>({
    queryKey: ['category', categoryId],
    queryFn: () => getCategory(categoryId),
    ...option,
  })
}

export const useProject = (
  projectId: string,
  option?: Partial<UseQueryOptions<IProjectDetail, Error>>,
) => {
  return useQuery<IProjectDetail, Error>({
    queryKey: ['project', projectId],
    queryFn: () => getProject(projectId),
    ...option,
  })
}

export const useRandomProject = (
  option?: Partial<UseMutationOptions<IProject, Error>>,
) => {
  return useMutation<IProject, Error>({
    mutationFn: () => randomProject(),
    ...option,
  })
}

export const useCompareProject = (
  params: IComparePayload,
  option?: Partial<UseQueryOptions<ICompare, Error>>,
) => {
  return useQuery<ICompare, Error>({
    queryKey: ['project', params],
    queryFn: () => getCompareProject(params),
    ...option,
  })
}
