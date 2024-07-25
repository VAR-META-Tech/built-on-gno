import { useProjects } from '@/apis'
import { DEFAULT_API_RETURN } from '@/constants'
import { ICategory } from '@repo/ui'
import { Avatar } from '@var-meta/ui'
import Link from 'next/link'

export const ProjectByCategory = ({ id, name }: ICategory) => {
  const { data = DEFAULT_API_RETURN } = useProjects({
    category_id: id,
    page_size: 10000,
  })

  return (
    <>
      {data.pagination.total_items > 0 && (
        <div className="grid w-full grid-cols-4 gap-4">
          <div className="col-span-12 lg:col-span-1 text-lg font-bold lg:text-2xl">{name}</div>
          <div className="col-span-12 lg:col-span-3 flex flex-wrap gap-1">
            {data.data.map(({ logoUrl, name, id }) => (
              <Link
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
