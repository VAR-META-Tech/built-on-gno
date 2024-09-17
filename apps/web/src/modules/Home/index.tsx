'use client'
import React from 'react'
import HeroSection from '@/modules/Home/HeroSection'
import { useCategories, useProjects } from '@/apis'
import { Category } from './Category'
import { ExploreAll } from './ExploreAll'
import { DEFAULT_API_RETURN } from '@/constants'
import { ICategoriesResponse, Loading } from '@repo/ui'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { VStack } from '@var-meta/ui'
import News from './News'
import Events from './Events'

const HomePage = () => {
  const { data: categories = DEFAULT_API_RETURN, isLoading } = useCategories()
  const { data: projects = DEFAULT_API_RETURN } = useProjects()

  if (isLoading) return <Loading />

  return (
    <div className="h-full">
      <div className="gap-18 container flex w-full flex-col">
        <HeroSection
          categories={categories as ICategoriesResponse}
          totalProjects={projects?.pagination?.total_items}
        />
        <VStack spacing={16} className="text-black lg:flex-row">
          <Events />

          <News />
        </VStack>

        {categories.data.map((category) => (
          <Category key={category.id} {...category} />
        ))}

        <ExploreAll />
      </div>
    </div>
  )
}

export default HomePage
