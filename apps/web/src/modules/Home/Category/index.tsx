import { useProjects } from '@/apis'
import { DEFAULT_API_RETURN } from '@/constants'
import { ROUTES } from '@/lib/routes'
import { ICategory } from '@repo/ui'
import { Avatar, Skeleton } from '@var-meta/ui'
import Link from 'next/link'
import { ChevronRightIcon } from '@var-meta/icons'
import CardPreview from '@repo/ui/src/card/CardPreview'

export const Category = ({ id, name, description }: ICategory) => {
  const { data = DEFAULT_API_RETURN, isLoading } = useProjects({
    category_id: id,
    page_size: 6,
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

              <Link href={`${ROUTES.CATEGORY}/${id}`}>
                <p className='bg-white py-1 flex justify-around items-center gap-2 whitespace-nowrap hover:bg-light font-medium px-3 rounded-3xl border border-disabled/50'>See all <ChevronRightIcon /></p>
              </Link>
            </div>
            <p className="text-disabled text-sm">{description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.data.map((project, index) => (
              <CardPreview key={project.id} {...project} index={index}/>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
