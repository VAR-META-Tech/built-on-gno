import { CheckCircleBrokenIcon, GitPullRequestIcon } from '@var-meta/icons'
import { Button, Divider } from '@var-meta/ui'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export interface IInfo {
  name: string
  description: string
  industry: string[]
  displayTerm: string
  term: string
  tags: string[]
  partnerships: Partnership[]
  author: string
  social: Social
  glossary: Glossary[]
}

interface Partnership {
  name: string
  image: string
}

interface Social {
  website: string
  twitter: string
  git: string
  discord: string
  telegram: string
}

interface Glossary {
  name: string
  description: string
}

export const CardInfo = ({ data }: { data: IInfo }) => {
  const [showMore, setShowMore] = useState<boolean>(false)

  const onShow = () => {
    setShowMore((state) => !state)
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-8 shadow-md">
      <h2 className="text-2xl font-bold">{data.displayTerm}</h2>
      <div className="flex w-full flex-col gap-1">
        <p className="text-sm font-light">Industry</p>
        <p className="font-medium">{data.industry.join(', ')}</p>
        <Divider />
      </div>
      <div className="flex w-full flex-col gap-1">
        <p className="text-sm font-light">Tags</p>
        <p className="font-medium">{data.tags.join(', ')}</p>
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
            {data.partnerships.map((item) => (
              <div className="flex flex-row items-center justify-between">
                <Image
                  alt=""
                  className="rounded"
                  src={item.image}
                  width={60}
                  height={60}
                />
                <p className="font-medium">{item.name}</p>
              </div>
            ))}
          </div>
        )}
        {!showMore && (
          <p className="font-medium">
            View {data.partnerships.length} partnerships
          </p>
        )}
        <Divider />
      </div>
      <div className="flex w-full flex-col gap-1">
        <p className="text-sm font-light">Author</p>
        <p className="flex items-center gap-2 font-medium">
          <CheckCircleBrokenIcon color="green" /> {data.author}
        </p>
        <Divider />
      </div>
      <div className="flex w-full flex-col gap-1">
        <p className="text-sm font-light">Links</p>
        <p className="flex items-center gap-1 font-medium">
          <Link href={data.social.website} target="_blank">
            <Button variant="outline" radius="full">
              Project website
            </Button>
          </Link>
          <Link href={data.social.git} target="_blank">
            <Button variant="outline" radius="full" iconOnly>
              <GitPullRequestIcon />
            </Button>
          </Link>
        </p>
      </div>
    </div>
  )
}
