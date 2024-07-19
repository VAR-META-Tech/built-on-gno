'use client'
import { useCategory } from '@/apis'
import HeroSection from '@/components/HeroSection'
import { useParams } from 'next/navigation'
import CardSubcategory from './CardSubcategory'

const DetailCategory = () => {
  const { category } = useParams()
  const { data } = useCategory(String(category))

  return (
    <>
      <HeroSection />
      <div className="container mt-10 grid w-full grid-cols-6 justify-center gap-10 sm:mt-20 md:mt-32">
        {(data?.subCategories ?? []).map((category) => (
          <CardSubcategory category_id={Number(data?.id)} sub_category={category} />
        ))}
      </div>
    </>
  )
}

export default DetailCategory
