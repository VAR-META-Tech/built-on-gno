'use client'
import { useInfiniteProjects } from '@/apis'
import HeroSection from '@/components/HeroSection'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { IProject, IProjectsResponse, Loading } from '@repo/ui'
import CardPreview from '@repo/ui/src/card/CardPreview'
import { Skeleton } from '@var-meta/ui'
import { useRef } from 'react'

const AllProjects = () => {
  const ref = useRef<HTMLDivElement>(null)

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteProjects({
    page_size: 20,
    order: 'project.name:asc',
  })

  useIntersectionObserver({
    target: ref,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  })
  if (isLoading) return <Loading />

  return (
    <div>
      <HeroSection />
      <div className="container mt-20 flex w-full flex-wrap justify-center gap-4 md:mt-32">
        {data?.pages?.map((page) =>
          (page as IProjectsResponse)?.data?.map((project: IProject) => (
            <CardPreview key={project.id} {...project} />
          )),
        )}
        {hasNextPage && (
          <div ref={ref} className="grid w-full grid-cols-4 gap-4 px-4">
            {[...Array(8)].map((x, i) => (
              <Skeleton
                key={i}
                className="col-span-4 h-32 md:col-span-2 lg:col-span-1"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AllProjects
