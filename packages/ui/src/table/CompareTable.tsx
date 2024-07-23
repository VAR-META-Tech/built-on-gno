import {
  Avatar,
  CloseIcon,
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
  data: IProjectCompare[]
  features: IProjectFeature[]
}

const CompareTable = ({ data, features }: Props) => {
  return (
    <div>
      <Table variant="striped">
        <TableHeader>
          <TableRow>
            <TableHead />
            {data.map((item) => (
              <TableHead key={String(item.id)} className="text-center">
                <div className="flex cursor-pointer flex-col items-center justify-center">
                  <div className="relative h-12 w-12 rounded-full border-2">
                    <Image
                      src={String(item.logoUrl)}
                      alt=""
                      layout="fill"
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h2 className="max-w-32 overflow-hidden text-ellipsis text-nowrap text-lg font-semibold">
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
                <span className="text-lg">{feature.label}</span>
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
    </div>
  )
}

export default CompareTable
