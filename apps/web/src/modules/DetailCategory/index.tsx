'use client'
import { useCategory } from '@/apis'
import { notFound, useParams } from 'next/navigation'
import CardSubcategory from './CardSubcategory'
import { Loading } from '@repo/ui'
import { ROUTES } from '@/lib/routes'
import BreadCrumb, { IBreadCrumbData } from '@/components/BreadCrumb'

const DetailCategory = () => {
  const { category } = useParams()
  const { data, isError, isLoading } = useCategory(String(category))

  const breadcrumbList: IBreadCrumbData[] = [
    {
      label: 'Home',
      href: ROUTES.HOME,
    },
    {
      label: String(data?.name),
      href: '',
    },
  ]

  if (isError) {
    notFound()
  }

  if (isLoading) return <Loading />

  return (
    <div className="container space-y-6">
      <BreadCrumb data={breadcrumbList} />

      <div className="grid w-full grid-cols-6 justify-center gap-8">
        {(data?.subCategories ?? []).map((category) => (
          <CardSubcategory
            key={category.id}
            category_id={Number(data?.id)}
            sub_category={category}
          />
        ))}
      </div>
    </div>
  )
}

export default DetailCategory
