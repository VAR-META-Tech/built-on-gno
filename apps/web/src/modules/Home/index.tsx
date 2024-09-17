'use client'
import React, { useMemo } from 'react'
import HeroSection from '@/modules/Home/HeroSection'
import { useCategories, useProjects } from '@/apis'
import { Category } from './Category'
import { ExploreAll } from './ExploreAll'
import { DEFAULT_API_RETURN } from '@/constants'
import { ICategoriesResponse, Loading } from '@repo/ui'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { VStack } from '@var-meta/ui'

const HomePage = () => {
  const { data: categories = DEFAULT_API_RETURN, isLoading } = useCategories()
  const { data: projects = DEFAULT_API_RETURN } = useProjects()

  const columns = useMemo(
    () => [
      { title: '#', key: 'index' },
      { title: 'Name', key: 'name' },
      { title: 'Price', key: 'price' },
      { title: '1h %', key: 'hour' },
      { title: '24h %', key: 'hours' },
      { title: '7d %', key: 'day' },
      { title: 'Market Cap', key: 'marketCap' },
      { title: 'Volume (24h)', key: 'volume' },
      { title: 'Holders', key: 'holders' },
      { title: 'Last 7 Days', key: 'last7Days' },
    ],
    [],
  )

  if (isLoading) return <Loading />

  return (
    <div className="h-full">
      <div className="gap-18 container flex w-full flex-col">
        <HeroSection
          categories={categories as ICategoriesResponse}
          totalProjects={projects?.pagination?.total_items}
        />

        <VStack spacing={20}>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold lg:text-3xl">Jettons</p>

              {/* <Link href={`${ROUTES.CATEGORY}/${id}`}>
              <p className="dark:bg-primary-dark dark:hover:bg-primary-dark/35 hover:bg-light flex items-center justify-around gap-2 whitespace-nowrap rounded-3xl border border-gray-500/50 bg-white px-3 py-1 font-medium">
                See all <ChevronRightIcon />
              </p>
            </Link> */}
            </div>
            <p className="text-sm text-gray-500 dark:text-white">
              Jettons are custom fungible tokens on the GNO Blockchain
            </p>
          </div>
          <Table>
            <TableHeader className="dark:bg-primary-dark border-none bg-white font-bold">
              <TableRow>
                {columns.map((column) => (
                  <TableCell className="text-center" key={column.key}>
                    {column.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody className="blur-sm">
              {Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index} className="dark:bg-primary-dark bg-white">
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell className="text-center">GNO</TableCell>
                  <TableCell className="text-center">$235</TableCell>
                  <TableCell className="text-center">$235</TableCell>
                  <TableCell className="text-center">$235</TableCell>

                  <TableCell className="text-center">$235</TableCell>
                  <TableCell className="text-center">$235</TableCell>
                  <TableCell className="text-center">$235</TableCell>
                  <TableCell className="text-center">$235</TableCell>
                  <TableCell className="text-center">$235</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
