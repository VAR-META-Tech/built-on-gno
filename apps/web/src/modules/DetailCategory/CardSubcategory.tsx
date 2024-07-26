import { useProjects } from '@/apis'
import { DEFAULT_API_RETURN } from '@/constants'
import { Card, ICategory } from '@repo/ui'
import { Skeleton, Tag, Tooltip, TooltipProvider } from '@var-meta/ui'
import Image from 'next/image'
import Link from 'next/link'
type IProps = {
  category_id: number
  sub_category: ICategory
}

const CardSubcategory = ({ category_id, sub_category }: IProps) => {
  const { data = DEFAULT_API_RETURN, isLoading } = useProjects({
    category_id,
    sub_category_id: sub_category.id,
    page_size: 10000,
  })

  return (
    <>
      {isLoading && <Skeleton className="col-span-12 h-32 lg:col-span-2" />}
      {data.pagination.total_items > 0 && (
        <Card
          title={sub_category.name}
          className={
            data.data.length > 3
              ? 'col-span-12 lg:col-span-2'
              : 'col-span-4 lg:col-span-1'
          }
        >
          <TooltipProvider>
            {data.data.map((project) => (
              <Tooltip
                key={project.id}
                title={
                  <h2 className="p-2 text-2xl font-bold">{project.name}</h2>
                }
                contentClassName="w-full"
                content={
                  <div className="flex w-full flex-col gap-3 p-2">
                    <div className="text-md font-normal text-gray-600">
                      {project.shortDescription}
                    </div>
                    <div className="flex w-full flex-row gap-1 overflow-hidden">
                      {project.projectTags.map(({ tag }) => (
                        <Tag size="sm" radius="xl" key={tag.id}>
                          <span className="text-nowrap p-2">{tag.name}</span>
                        </Tag>
                      ))}
                    </div>
                  </div>
                }
              >
                <Link
                  href={`/ecosystem/project/${project.id}`}
                  className="group flex cursor-pointer flex-col"
                >
                  <div className="relative z-0 h-20 w-20 rounded-full border-2">
                    <Image
                      src={project.logoUrl}
                      alt=""
                      fill
                      className="relative z-0 rounded-full object-cover"
                    />
                    <div className="absolute flex h-full w-full items-center justify-center rounded-full bg-black text-sm text-white opacity-0 transition-all duration-200 group-hover:opacity-50">
                      explore
                    </div>
                  </div>
                  <h2 className="max-w-20 overflow-hidden text-ellipsis text-nowrap text-lg font-semibold">
                    {project.name}
                  </h2>
                </Link>
              </Tooltip>
            ))}
          </TooltipProvider>
        </Card>
      )}
    </>
  )
}

export default CardSubcategory
