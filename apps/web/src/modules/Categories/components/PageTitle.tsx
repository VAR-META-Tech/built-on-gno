import { VStack } from '@var-meta/ui'
import React from 'react'

const PageTitle = () => {
  return (
    <VStack spacing={4}>
      <h1 className="text-[2rem] font-semibold">Categories</h1>
      <p className="text-gray-500">
        Choose a category and find the application you need
      </p>
    </VStack>
  )
}

export default PageTitle
