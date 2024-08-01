import { CheckCircleBrokenIcon } from '@var-meta/icons'
import { Button, Divider } from '@var-meta/ui'
// eslint-disable-next-line no-redeclare
import Image from 'next/image'
import { useState } from 'react'
import { IProjectDetail } from '../types'
import Link from 'next/link'

export const CardInfo = ({ data }: { data: IProjectDetail | undefined }) => {
  const [showMore, setShowMore] = useState<boolean>(false)

  const onShow = () => {
    setShowMore((state) => !state)
  }

  return (
    <div className="border-gray shadow-xs shadow-secondary flex flex-col gap-4 rounded-lg border p-8">
      <h2 className="text-2xl font-bold">{data?.name}</h2>
      <div className="flex w-full flex-col gap-1">
        <p className="text-sm font-light">Industry</p>
        <p className="font-medium">
          {(data?.category?.parent?.name ?? '') +
            (', ' + data?.category?.name ?? '')}
        </p>
        <Divider />
      </div>
      <div className="flex w-full flex-col gap-1">
        <p className="text-sm font-light">Tags</p>
        <p className="font-medium">
          {data?.projectTags?.map(({ tag }) => tag.name).join(', ')}
        </p>
        <Divider />
      </div>
      <div
        className="flex w-full cursor-pointer flex-col gap-1"
        onClick={onShow}
      >
        <div className="flex justify-between">
          <p className="text-sm font-light">Partnerships</p>
          {showMore && <p className="text-sm font-light">Hide</p>}
        </div>
        {showMore && (
          <div
            className={`flex w-full flex-col gap-4 ${showMore ? 'animate-accordion-down' : 'animate-accordion-up'}`}
          >
            {data?.partnerships?.map((item) => (
              <div
                key={item.id}
                className="flex flex-row items-center justify-between"
              >
                <div className="relative h-14 w-16">
                  <Image
                    alt=""
                    fill
                    unoptimized
                    className="relative z-0 rounded"
                    src={item.logoUrl}
                  />
                </div>
                <p className="font-medium">{item.name}</p>
              </div>
            ))}
          </div>
        )}
        {!showMore && (
          <p className="font-medium">
            View {data?.partnerships?.length} partnerships
          </p>
        )}
        <Divider />
      </div>
      <div className="flex w-full flex-col gap-1">
        <p className="text-sm font-light">Author</p>
        <p className="flex items-center gap-2 font-medium">
          <CheckCircleBrokenIcon color="green" /> {data?.author}
        </p>
        <Divider />
      </div>
      <div className="flex w-full flex-col gap-1">
        <p className="text-sm font-light">Links</p>
        <p className="flex items-center gap-1 font-medium">
          {data?.projectSocials?.map(({ url, id, social }) => (
            <Link href={url} key={id} target="_blank">
              <Button
                variant="outline"
                radius="full"
                className="border-secondary relative rounded-full"
                iconOnly
              >
                <Image
                  alt=""
                  unoptimized
                  className="rounded-full p-1"
                  src={social.iconUrl}
                  fill
                />
              </Button>
            </Link>
          ))}
        </p>
      </div>
    </div>
  )
}
