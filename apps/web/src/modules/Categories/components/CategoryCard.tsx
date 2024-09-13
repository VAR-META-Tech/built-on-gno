import { useProjects } from '@/apis'
import { DEFAULT_API_RETURN } from '@/constants'
import { ROUTES } from '@/lib/routes'
import { ICategory } from '@repo/ui'
import { Avatar, cn, VStack } from '@var-meta/ui'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'

interface Props {
  category: ICategory
}

const CategoryCard: FC<Props> = ({ category }) => {
  const router = useRouter()
  const { data: projects = DEFAULT_API_RETURN } = useProjects({
    page_size: 3,
    category_id: category?.id,
  })

  return (
    <VStack
      onClick={() => router.push(`${ROUTES.CATEGORY}/${category?.id}`)}
      className="group relative h-full w-full cursor-pointer overflow-hidden rounded-3xl px-8 py-7 shadow-[0_3px_6px_rgb(0,0,0,0.1)] dark:bg-white/5"
    >
      <span className="absolute right-0 top-0 z-0 h-36 w-36 -translate-y-1/2 translate-x-1/2 rounded-full bg-gray-300 transition-all duration-700 ease-out group-hover:scale-[900%] dark:bg-white/10" />

      <div className="h-14 space-x-2">
        {projects?.data?.map((project, index) => {
          const zIndex = 30 - index * 10

          return (
            <Avatar
              className={cn(
                `z-${zIndex} transition-all duration-500 group-hover:translate-x-0`,
                {
                  '-translate-x-[calc(50%+0.5rem)]': index === 1,
                  '-translate-x-[calc(100%+1rem)]': index === 2,
                },
              )}
              size="lg"
              src={project?.logoUrl || ''}
            ></Avatar>
          )
        })}
      </div>

      <VStack justify="between" className="relative z-10 flex-1">
        <span className="text-xl font-semibold lg:text-2xl">
          {category?.name}{' '}
          <span className="text-end text-base font-semibold text-gray-400 lg:text-lg">
            {projects?.data?.length}
          </span>
        </span>

        <p className="line-clamp-2">{category?.description}</p>
      </VStack>
    </VStack>
  )
}

export default CategoryCard
