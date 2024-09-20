import React, { useMemo } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { VStack } from '@var-meta/ui'

const Jettons = () => {
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

  return (
    <VStack spacing={20}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold lg:text-3xl">Tokens</p>

          {/* <Link href={`${ROUTES.CATEGORY}/${id}`}>
              <p className="dark:bg-primary-dark dark:hover:bg-primary-dark/35 hover:bg-light flex items-center justify-around gap-2 whitespace-nowrap rounded-3xl border border-gray-500/50 bg-white px-3 py-1 font-medium">
                See all <ChevronRightIcon />
              </p>
            </Link> */}
        </div>
        <p className="text-sm text-gray-500 dark:text-white">
          Tokens are custom fungible tokens on the GNO Blockchain
        </p>
      </div>
      <Table className="relative">
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

        <div className="absolute left-[15%] top-[50%] md:left-[35%] lg:left-[45%]">
          <h1 className="font-montserrat dark:animate-typingDark animate-typingLight text-secondary overflow-hidden whitespace-nowrap border-r-4 border-r-white py-3 text-xl font-bold italic transition-all md:text-2xl lg:text-[2.5rem]">
            Coming Soon
          </h1>
        </div>
      </Table>
    </VStack>
  )
}

export default Jettons
