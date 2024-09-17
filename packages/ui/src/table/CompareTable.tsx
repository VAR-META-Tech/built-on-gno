import {
  Avatar,
  CloseIcon,
  Skeleton,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@var-meta/ui'
import Image from 'next/image'
import { IProjectCompare, IProjectFeature } from '../types'
import { useMemo } from 'react'

interface Props {
  loading: boolean
  data: IProjectCompare[]
  features: IProjectFeature[]
}

const CompareTable = ({ loading, data, features }: Props) => {
  const renderTable = useMemo(() => {
    if (loading) {
      return (
        <Table size="lg" layout="fixed" className="overflow-x-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-44 text-center" />

              {Array.from({ length: 2 }).map((item, idx) => (
                <TableHead key={idx} className="text-center">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <Skeleton className="dark:bg-primary h-12 w-12 rounded-full border-2" />

                    <Skeleton className="dark:bg-primary h-6 w-40" />
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((item, idx) => (
              <TableRow key={idx}>
                <TableCell className="p-3.5">
                  <Skeleton className="h-6 w-full" />
                </TableCell>
                {Array.from({ length: 2 }).map((_, id) => (
                  <TableCell key={id}>
                    <div className="flex items-center justify-center">
                      <Skeleton className="h-6 w-6 rounded-full" />
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableCaption />
        </Table>
      )
    }

    return (
      <Table size="lg" layout="fixed" className="overflow-x-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center" />
            {data.map((item) => (
              <TableHead key={String(item.id)} className="text-center">
                <div className="flex cursor-pointer flex-col items-center justify-center">
                  <div className="relative rounded-full border-2">
                    <Image
                      src={String(item.logoUrl)}
                      alt="logo"
                      unoptimized
                      className="rounded-full object-cover"
                      width={48}
                      height={48}
                    />
                  </div>
                  <h2 className="max-w-40 overflow-hidden text-ellipsis text-nowrap text-lg font-semibold">
                    {item.name}
                  </h2>
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map(({ id, featureId, feature }) => (
            <TableRow key={id}>
              <TableCell>
                <span className="overflow-hidden text-ellipsis text-nowrap text-lg">
                  {feature.label}
                </span>
              </TableCell>
              {data.map(({ projectFeatures, logoUrl, id }) => (
                <TableCell key={id}>
                  <div className="flex justify-center">
                    {projectFeatures.find((item) => item.featureId == featureId)
                      ?.value == 1 ? (
                      <Avatar src={String(logoUrl)} radius="full" size="xs" />
                    ) : (
                      <CloseIcon color="red" />
                    )}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableCaption />
      </Table>
    )
  }, [loading, data, features])

  return <div className="relative">{renderTable}</div>
}

export default CompareTable
