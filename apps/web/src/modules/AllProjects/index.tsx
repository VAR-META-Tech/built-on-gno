'use client'
import { useCategories } from '@/apis'
import HeroSection from '@/components/HeroSection'
import React from 'react'
import { ProjectByCategory } from './ProjectByCategory'
import { DEFAULT_API_RETURN } from '@/constants'
import { Loading } from '@repo/ui'

const AllProjects = () => {
  const { data: categories = DEFAULT_API_RETURN, isLoading } = useCategories({
    page_size: 1000,
  })

  if (isLoading) return <Loading />

  return (
    <div>
      <HeroSection />
      <div className="container mt-20 flex w-full flex-col items-start justify-start gap-4 md:mt-32">
        {categories.data.map((category) => (
          <ProjectByCategory key={category.id} {...category} />
        ))}
      </div>
    </div>
  )
}

export default AllProjects
