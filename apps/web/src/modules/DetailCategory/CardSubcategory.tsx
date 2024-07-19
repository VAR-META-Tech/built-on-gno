import { ICategory, useProjects } from '@/apis'
import { Card } from '@repo/ui'
import { Badge, Tooltip, TooltipProvider } from '@var-meta/ui'
import Image from 'next/image'
import Link from 'next/link'
type Iprops = {
  category_id: number
  sub_category: ICategory
}

const CardSubcategory = ({ category_id, sub_category }: Iprops) => {
  const { data } = useProjects({
    category_id,
    sub_category_id: sub_category.id,
  })

  return (
    <Card
      title={sub_category.name}
      className={(data?.data ?? []).length > 3 ? 'col-span-2' : 'col-span-1'}
    >
      {(data?.data ?? []).map((project) => (
        <TooltipProvider>
          <Tooltip
            title={<h2 className="text-2xl font-bold">{project.name}</h2>}
            contentClassName="w-full"
            content={
              <div className="flex w-full flex-col gap-3">
                <div className="text-md font-normal text-gray-600">
                  {project.shortDescription}
                </div>
                <div className="flex w-full flex-row gap-1 overflow-hidden">
                  {project.tags.map((item) => (
                    <Badge size="sm" radius="2xl">
                      <span className="text-nowrap">{item.name}</span>
                    </Badge>
                  ))}
                </div>
              </div>
            }
          >
            <Link
              href={`/ecosystem/${category_id}/${project.id}`}
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
        </TooltipProvider>
      ))}
    </Card>
  )
}

export default CardSubcategory
