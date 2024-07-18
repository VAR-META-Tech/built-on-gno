'use client'
import { useCategory } from '@/apis'
import HeroSection from '@/components/HeroSection/HeroSection'
import { useParams } from 'next/navigation'
import CardSubcategory from './CardSubcategory'

const DetailCategory = () => {
  const { category } = useParams()
  const { data } = useCategory(String(category))

  return (
    <>
      <HeroSection />
      <div className="container mt-10 flex w-full justify-center gap-6 sm:mt-20 md:mt-32">
        {data?.sub_categories.map((category) => (
          <CardSubcategory category={data?.name} sub_category={category} />
        ))}
      </div>
    </>
  )
}

export default DetailCategory
