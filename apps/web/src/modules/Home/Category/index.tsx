import { useProjects } from '@/apis'
import { DEFAULT_API_RETURN } from '@/constants'
import { ROUTES } from '@/lib/routes'
import { ICategory } from '@repo/ui'
import { Avatar, Skeleton } from '@var-meta/ui'
import Link from 'next/link'
import { useMemo } from 'react'

export const Category = ({ id, name }: ICategory) => {
  const { data = DEFAULT_API_RETURN, isLoading } = useProjects({
    category_id: id,
  })

  const [firstThree, remaining] = useMemo(
    () => [
      data.data.slice(0, 3),
      data.pagination.total_items > 3 ? data.pagination.total_items - 3 : 0,
    ],
    [data.data],
  )

  return (
    <>
      {isLoading && <Skeleton className="h-40 w-80" />}
      {data.pagination.total_items > 0 && (
        <Link href={`${ROUTES.CATEGORY}/${id}`}>
          <div className="shadow-xs shadow-secondary flex h-full flex-col gap-4 rounded-lg border border-gray-500 p-6">
            <div className="text-lg font-bold lg:text-2xl">{name}</div>
            <div className="flex gap-0.5">
              {firstThree.map((i) => (
                <Avatar
                  key={i.logoUrl}
                  indicator="none"
                  radius="half"
                  size="2xl"
                  className="relative z-0 border-2 border-gray-500"
                  src={i.logoUrl}
                />
              ))}
              {remaining > 0 && (
                <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full border-2 border-gray-500">
                  <span className="text-center text-xl text-white">
                    +{remaining}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Link>
      )}
    </>
  )
}
