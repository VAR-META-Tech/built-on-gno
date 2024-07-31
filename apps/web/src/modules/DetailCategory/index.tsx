'use client'
import { useCategory } from '@/apis'
import HeroSection from '@/components/HeroSection'
import { notFound, useParams } from 'next/navigation'
import CardSubcategory from './CardSubcategory'
import { Loading } from '@repo/ui'

const DetailCategory = () => {
  const { category } = useParams()
  const { data, isError, isLoading } = useCategory(String(category))

  if (isError) {
    notFound()
  }

  if (isLoading) return <Loading />

  return (
    <>
      <HeroSection />
      <div className="container my-10 grid w-full grid-cols-6 justify-center gap-8 sm:my-20 md:my-32">
        {(data?.subCategories ?? []).map((category) => (
          <CardSubcategory
            key={category.id}
            category_id={Number(data?.id)}
            sub_category={category}
          />
        ))}
      </div>
    </>
  )
}

export default DetailCategory
