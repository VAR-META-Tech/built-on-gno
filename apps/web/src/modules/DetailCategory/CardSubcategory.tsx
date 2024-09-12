import { useProjects } from '@/apis'
import { DEFAULT_API_RETURN } from '@/constants'
import { ICategory } from '@repo/ui'
import CardPreview from '@repo/ui/src/card/CardPreview'
import { Skeleton } from '@var-meta/ui'
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
      {isLoading && (
        <Skeleton className="col-span-12 h-32 md:col-span-4 lg:col-span-2" />
      )}
      {data.pagination.total_items > 0 && (
        <div className="col-span-12 flex flex-col items-start justify-start gap-4 p-2">
          <div className='flex flex-col gap-2'>
            <h3 className="text-ellipsis text-lg font-bold lg:text-2xl">
              {sub_category.name}{' '}
              <span className="text-disabled text-xl">
                {data.pagination.total_items || '-'}
              </span>
            </h3>

            <p className='text-disabled lg:max-w-[50%]'>{sub_category?.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.data.map((project, index) => (
              <CardPreview key={project.id} {...project} index={index} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default CardSubcategory
