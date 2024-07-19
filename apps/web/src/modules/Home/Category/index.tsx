import { ICategory, useProjects } from '@/apis'
import { Avatar } from '@var-meta/ui'
import Link from 'next/link'
import { useMemo } from 'react'

export const Category = ({ id, name }: ICategory) => {
  const { data } = useProjects({ category_id: id })

  const [firstThree, remaining] = useMemo(
    () => [
      (data?.data ?? []).slice(0, 3),
      (data?.data ?? []).slice(3, (data?.data ?? []).length).length,
    ],
    [data?.data],
  )

  return (
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
  )
}
