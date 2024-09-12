'use client'

import { useCategories } from '@/apis'
import { DEFAULT_API_RETURN } from '@/constants'
import React, { useMemo } from 'react'
import CategoryCard from './CategoryCard'
import { Skeleton } from '@var-meta/ui'

const CategoryList = () => {
  const {
    data: categories = DEFAULT_API_RETURN,
    isLoading: isLoadingCategories,
  } = useCategories()

  const renderList = useMemo(() => {
    if (isLoadingCategories) {
      return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 })?.map((_, index) => (
            <Skeleton key={index} className="col-span-1 h-52 rounded-3xl" />
          ))}
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories?.data?.map((category, index) => (
          <div className="col-span-1">
            <CategoryCard
              key={`${category?.id}-${index}`}
              category={category}
            />
          </div>
        ))}
      </div>
    )
  }, [categories?.data, isLoadingCategories])

  return renderList
}

export default CategoryList
