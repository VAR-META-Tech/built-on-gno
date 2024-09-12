'use client'
import { useCategory } from '@/apis'
import HeroSection from '@/modules/Home/HeroSection'
import { notFound, useParams } from 'next/navigation'
import CardSubcategory from './CardSubcategory'
import { Loading } from '@repo/ui'
import { ChevronRightIcon } from '@var-meta/icons'
import Link from 'next/link'
import { ROUTES } from '@/lib/routes'

const DetailCategory = () => {
  const { category } = useParams()
  const { data, isError, isLoading } = useCategory(String(category))

  if (isError) {
    notFound()
  }

  if (isLoading) return <Loading />

  return (
    <div className='container space-y-6'>
      <div className='flex items-center gap-2'>
        <Link href={ROUTES.HOME}>
          <p className='text-disabled'>Home</p>
        </Link>
        <ChevronRightIcon />
        <p>{data?.name}</p>
      </div>
      
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
