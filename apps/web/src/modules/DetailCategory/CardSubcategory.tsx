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
          <h3 className="text-ellipsis text-lg font-bold lg:text-2xl">
            {sub_category.name}
          </h3>
          <div className="flex w-full flex-wrap justify-start gap-6">
            {data.data.map((project) => (
              <CardPreview key={project.id} {...project} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default CardSubcategory
