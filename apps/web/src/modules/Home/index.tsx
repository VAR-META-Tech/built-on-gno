'use client'
import React from 'react'
import HeroSection from '@/modules/Home/HeroSection'
import { useCategories, useProjects } from '@/apis'
import LatestAdded from './LatestAdded'
import { Category } from './Category'
import { SeeAll } from './SeeAll'
import { DEFAULT_API_RETURN } from '@/constants'
import { ICategoriesResponse, Loading } from '@repo/ui'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const HomePage = () => {
  const { data: categories = DEFAULT_API_RETURN, isLoading } = useCategories()
  const { data: projects = DEFAULT_API_RETURN } = useProjects()

  if (isLoading) return <Loading />

  return (
    <>
      <HeroSection
        categories={categories as ICategoriesResponse}
        totalProjects={projects?.pagination?.total_items}
      />
      {/* <div className="container mt-10 flex w-full flex-wrap justify-center gap-x-4 gap-y-8 sm:mt-20 md:mt-32">
        {categories.data.map((category) => (
          <Category key={category.id} {...category} />
        ))}
        <SeeAll />
      </div> */}
      {/* <LatestAdded /> */}
    </>
  )
}

export default HomePage
