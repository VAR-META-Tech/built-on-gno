import { useProjects } from '@/apis'
import { DEFAULT_API_RETURN } from '@/constants'
import { ICategory } from '@repo/ui'
import { Avatar, Skeleton } from '@var-meta/ui'
import Link from 'next/link'

export const ProjectByCategory = ({ id, name }: ICategory) => {
  const { data = DEFAULT_API_RETURN, isLoading } = useProjects({
    category_id: id,
    page_size: 10000,
  })

  return (
    <>
      {isLoading && (
        <div className="grid w-full grid-cols-4 gap-4">
          <Skeleton className="col-span-12 h-8 w-[80%] rounded-xl lg:col-span-1"></Skeleton>
          <Skeleton className="col-span-12 h-28 rounded-xl lg:col-span-3"></Skeleton>
        </div>
      )}
      {data.pagination.total_items > 0 && (
        <div className="grid w-full grid-cols-4 gap-4">
          <div className="col-span-12 text-lg font-bold lg:col-span-1 lg:text-2xl">
            {name}
          </div>
          <div className="col-span-12 flex flex-wrap gap-1 lg:col-span-3">
            {data.data.map(({ logoUrl, name, id }) => (
              <Link
                key={id}
                href={'/ecosystem/project/' + id}
                className="col-span-3 flex flex-nowrap items-center justify-center gap-0.5"
              >
                <Avatar
                  key={logoUrl}
                  indicator="none"
                  radius="half"
                  size="sm"
                  className="border-primary relative z-0 border-2"
                  src={logoUrl}
                />
                <span>{name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
