import { ISubCategory, useProjects } from '@/apis'
import { Card } from '@repo/ui'
import { Badge, Tooltip, TooltipProvider } from '@var-meta/ui'
import Image from 'next/image'
import Link from 'next/link'
type Iprops = {
  category: string
  sub_category: ISubCategory
}

const CardSubcategory = ({ category, sub_category }: Iprops) => {
  const { data } = useProjects({ category, sub_category: sub_category.name })

  return (
    <Card title={sub_category.name}>
      {data?.map((project) => (
        <TooltipProvider>
          <Tooltip
            title={
              <h2 className="text-2xl font-bold">{project.display_term}</h2>
            }
            contentClassName="w-full"
            content={
              <div className="flex w-full flex-col gap-3">
                <div className="">{project.short_description}</div>
                <div className="flex w-full flex-row gap-1 overflow-hidden">
                  {project.tags.map((item) => (
                    <Badge size="sm" radius="2xl">
                      <span className="text-nowrap">{item}</span>
                    </Badge>
                  ))}
                </div>
              </div>
            }
          >
            <Link
              href={`/ecosystem/${category}/${project.display_term}`}
              className="group flex cursor-pointer flex-col"
            >
              <div className="relative h-16 w-16 rounded-full border-2">
                <Image
                  src={
                    'https://images.thedapplist.com/prod/uploads/projects/image_1691752774323_aragon.jpeg'
                  }
                  alt=""
                  layout="fill"
                  className="rounded-full object-cover"
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
