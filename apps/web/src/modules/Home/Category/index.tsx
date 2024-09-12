import { useProjects } from '@/apis'
import { DEFAULT_API_RETURN } from '@/constants'
import { ROUTES } from '@/lib/routes'
import { ICategory } from '@repo/ui'
import { Avatar, Skeleton } from '@var-meta/ui'
import Link from 'next/link'
import { ChevronRightIcon } from '@var-meta/icons'

export const Category = ({ id, name, description }: ICategory) => {
  const { data = DEFAULT_API_RETURN, isLoading } = useProjects({
    category_id: id,
  })

  return (
    <>
      {isLoading && <Skeleton className="h-60 w-full" />}
      {data.pagination.total_items > 0 && (
        <div className="flex h-full w-full flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className='flex justify-between items-center'>
              <p className="text-xl font-bold lg:text-3xl">
                {name}{' '}
                <span className="text-disabled text-xl">
                  {data.pagination.total_items}
                </span>
              </p>

              <Link href={'/'}>
                <p className='bg-white py-1 flex justify-around items-center gap-2 whitespace-nowrap hover:bg-light font-medium px-3 rounded-3xl border border-disabled/50'>See all <ChevronRightIcon /></p>
              </Link>
            </div>
            <p className="text-disabled text-sm">{description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.data.map((project, i) => (
              <Link href={`${ROUTES.PROJECT}/${project.id}`} key={project.id}>
                <div className="flex gap-3 p-2 min-h-[7.25rem] bg-white rounded-md border border-transparent hover:border-disabled/50">
                  <div className='relative'>
                    <Avatar
                      indicator="none"
                      size="4xl"
                      className="relative z-0"
                      src={project.logoUrl}
                    />

                    <span className='absolute -bottom-[0.125rem] -right-[.25rem] z-1 w-6 h-6 rounded-full bg-light flex items-center justify-center font-bold'>{i + 1}</span>
                  </div>
                  
                  <div className='flex flex-col gap-2'>
                    <p className='font-bold'>{project.name}</p>
                    <p className='text-disabled line-clamp-2'>{project.shortDescription}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
