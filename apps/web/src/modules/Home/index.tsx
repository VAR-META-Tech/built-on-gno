'use client'
import React from 'react'
import HeroSection from '@/components/HeroSection'
import { useCategories } from '@/apis'
import LatestAdded from './LatestAdded'
import { Category } from './Category'
import { SeeAll } from './SeeAll'
import { DEFAULT_API_RETURN } from '@/constants'

const HomePage = () => {
  const { data: categories = DEFAULT_API_RETURN } = useCategories()
  return (
    <>
      <HeroSection />
      <div className="container mt-10 flex w-full flex-wrap justify-center gap-x-4 gap-y-8 sm:mt-20 md:mt-32">
        {categories.data.map((category) => (
          <Category {...category} />
        ))}
        <SeeAll />
      </div>
      <LatestAdded />
    </>
  )
}

export default HomePage
