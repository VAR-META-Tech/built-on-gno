import { useProjects } from '@/apis'
import { DEFAULT_API_RETURN } from '@/constants'
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
      {isLoading && <Skeleton className="h-20 w-80" />}
      {data.pagination.total_items > 0 && (
        <Link href={'/ecosystem/' + id}>
          <div className="flex h-full flex-col gap-2">
            <div className="mx-4 text-lg font-bold lg:text-2xl">{name}</div>
            <div className="flex gap-1 rounded-3xl border bg-white p-6 shadow-xl">
              {firstThree.map((i) => (
                <Avatar
                  key={i.logoUrl}
                  indicator="none"
                  radius="half"
                  size="2xl"
                  className="border-primary relative z-0 border-2"
                  src={i.logoUrl}
                />
              ))}
              {remaining > 0 && (
                <div className="border-primary flex h-16 w-16 items-center justify-center rounded-full border-2">
                  <span className="text-center text-xl text-gray-400">
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
