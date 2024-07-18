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

interface Props {
  data: {
    [x: 'image' | 'name' | 'id' | string]: boolean | string
  }[]
  features: {
    key: string
    label: string
  }[]
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
                      src={String(item.image)}
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
          {features.map(({ key, label }) => (
            <TableRow key={key}>
              <TableCell>
                <span className="text-lg">{label}</span>
              </TableCell>
              {data.map((item) => (
                <TableCell>
                  <div className="flex justify-center">
                    {item[key as keyof typeof item] ? (
                      <Avatar
                        src={String(item.image)}
                        radius="full"
                        size="xs"
                      />
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
