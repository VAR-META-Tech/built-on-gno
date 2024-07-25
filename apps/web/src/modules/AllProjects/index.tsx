'use client'
import { useCategories } from '@/apis'
import HeroSection from '@/components/HeroSection'
import React from 'react'
import { ProjectByCategory } from './ProjectByCategory'
import { DEFAULT_API_RETURN } from '@/constants'

const AllProjects = () => {
  const { data: categories = DEFAULT_API_RETURN } = useCategories({ page_size: 1000 })
  return (
    <div>
      <HeroSection />
      <div className="container flex w-full flex-col justify-start items-start gap-4 mt-20 md:mt-32">
        {categories.data.map((category) => (
          <ProjectByCategory {...category} />
        ))}
      </div>
    </div>
  )
}

export default AllProjects
