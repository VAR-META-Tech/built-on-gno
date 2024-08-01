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

interface Props {
  loading: boolean
  data: IProjectCompare[]
  features: IProjectFeature[]
}

const CompareTable = ({ loading, data, features }: Props) => {
  return (
    <div className="relative">
      {loading && (
        <Table variant="striped">
          <TableHeader>
            <TableRow>
              <TableHead />
              {Array.from({ length: 5 })
                .fill(0)
                .map((item, idx) => (
                  <TableHead key={idx} className="p-4 text-center">
                    <div className="flex cursor-pointer flex-col items-center justify-center gap-1">
                      <div className="relative h-12 w-12 rounded-full border-2">
                        <Skeleton className="h-12 w-12 rounded-full" />
                      </div>
                      <h2 className="max-w-32 overflow-hidden text-ellipsis text-nowrap text-lg font-semibold">
                        <Skeleton className="h-6 w-20" />
                      </h2>
                    </div>
                  </TableHead>
                ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 })
              .fill(0)
              .map((item, idx) => (
                <TableRow key={idx}>
                  {Array.from({ length: 6 })
                    .fill(0)
                    .map((item, idx) => (
                      <TableCell key={idx} className="p-6" align="center">
                        <Skeleton className="h-6 w-20" />
                      </TableCell>
                    ))}
                </TableRow>
              ))}
          </TableBody>
          <TableCaption />
        </Table>
      )}
      <Table size="lg" layout="fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-56 min-w-56 max-w-56 text-center" />
            {data.map((item) => (
              <TableHead
                key={String(item.id)}
                className="w-56 min-w-56 max-w-56 text-center"
              >
                <div className="flex cursor-pointer flex-col items-center justify-center">
                  <div className="relative h-12 w-12 rounded-full border-2">
                    <Image
                      src={String(item.logoUrl)}
                      alt=""
                      unoptimized
                      layout="fill"
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h2 className="max-w-40 overflow-hidden text-ellipsis text-nowrap text-lg font-semibold">
                    {item.name}
                  </h2>
                </div>
              </TableHead>
            ))}
            <TableHead />
            <TableHead />
            <TableHead />
            <TableHead />
            <TableHead />
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map(({ id, featureId, feature }) => (
            <TableRow key={id}>
              <TableCell className="w-56 min-w-56 max-w-56">
                <span className="overflow-hidden text-ellipsis text-nowrap text-lg">
                  {feature.label}
                </span>
              </TableCell>
              {data.map(({ projectFeatures, logoUrl, id }) => (
                <TableCell key={id} className="w-56 min-w-56 max-w-56">
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
    </div>
  )
}

export default CompareTable
