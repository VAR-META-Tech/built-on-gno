'use client'
import React from 'react'
import HeroSection from '@/modules/Home/HeroSection'
import { useCategories, useProjects } from '@/apis'
import { Category } from './Category'
import { ExploreAll } from './ExploreAll'
import { DEFAULT_API_RETURN } from '@/constants'
import { ICategoriesResponse } from '@repo/ui'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const HomePage = () => {
  const { data: categories = DEFAULT_API_RETURN } = useCategories()
  const { data: projects = DEFAULT_API_RETURN } = useProjects()

  return (
    <div className="h-full">
      <div className="container flex w-full flex-col gap-18">
        <HeroSection
          categories={categories as ICategoriesResponse}
          totalProjects={projects?.pagination?.total_items}
        />
        {categories.data.map((category) => (
          <Category key={category.id} {...category} />
        ))}

        <ExploreAll />
      </div>
    </div>
  )
}

export default HomePage
