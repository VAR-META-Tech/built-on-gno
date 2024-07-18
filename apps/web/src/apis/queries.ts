import { UseQueryOptions, useQuery } from "@tanstack/react-query"
import { getCategories, getCategory, getProjects } from "./request"
import { ICategory, IPayloadGetProject, IProject } from "./types"

export const useProjects = (payload?: IPayloadGetProject, option?: UseQueryOptions<IProject[], Error>) => {
  return useQuery<IProject[], Error>({
    queryKey: ['project', payload],
    queryFn: () => getProjects(payload),
    ...option
  })
}


export const useCategories = (option?: UseQueryOptions<ICategory[], Error>) => {
  return useQuery<ICategory[], Error>({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
    ...option
  })
}


export const useCategory = (category: string, option?: UseQueryOptions<ICategory, Error>) => {
  return useQuery<ICategory, Error>({
    queryKey: ['category', category],
    queryFn: () => getCategory(category),
    ...option
  })
}