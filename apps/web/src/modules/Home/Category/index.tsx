import { useProjects } from '@/apis'
import { DEFAULT_API_RETURN } from '@/constants'
import { ROUTES } from '@/lib/routes'
import { ICategory } from '@repo/ui'
import { Skeleton } from '@var-meta/ui'
import Link from 'next/link'
import { ChevronRightIcon } from '@var-meta/icons'
import CardPreview from '@repo/ui/src/card/CardPreview'

const exceptionText = [
  {
    name: 'devtools',
    value: 'Dev Tools',
  },
]

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
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold lg:text-3xl">
                {exceptionText.find(
                  (item) => item?.name === String(name).toLowerCase(),
                )?.value || name}{' '}
                <span className="text-xl text-gray-500">
                  {data.pagination.total_items || '-'}
                </span>
              </p>

              {data?.data?.length > 6 && (
                <Link href={`${ROUTES.CATEGORY}/${id}`}>
                  <p className="dark:bg-primary-dark dark:hover:bg-primary-dark/35 hover:bg-light flex items-center justify-around gap-2 whitespace-nowrap rounded-3xl border border-gray-500/50 bg-white px-3 py-1 font-medium">
                    See all <ChevronRightIcon />
                  </p>
                </Link>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-white">
              {description}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data?.data.map((project, index) => (
              <CardPreview key={project.id} {...project} index={index} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
