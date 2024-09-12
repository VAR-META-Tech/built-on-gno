import React from 'react'
import BreadCrumb, { IBreadCrumbData } from '@/components/BreadCrumb'
import { ROUTES } from '@/lib/routes'
import { VStack } from '@var-meta/ui'
import PageTitle from './components/PageTitle'
import CategoryList from './components/CategoryList'

const breadcrumbList: IBreadCrumbData[] = [
  {
    label: 'Home',
    href: ROUTES.HOME,
  },
  {
    label: 'Categories',
    href: ROUTES.CATEGORIES,
  },
]

const CategoriesPage = () => {
  return (
    <div className="container min-h-screen pb-36">
      <div className="pb-8 pt-4">
        <BreadCrumb data={breadcrumbList} />
      </div>

      <VStack spacing={20}>
        <PageTitle />

        <CategoryList />
      </VStack>
    </div>
  )
}

export default CategoriesPage
