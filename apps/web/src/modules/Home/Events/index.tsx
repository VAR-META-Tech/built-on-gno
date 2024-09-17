import LogoGno from '@/components/LogoGno'
import { ROUTES } from '@/lib/routes'
import { HStack, VStack } from '@var-meta/ui'
import { format } from 'date-fns'
import Link from 'next/link'
import React from 'react'

interface Event {
  title: string
  description: string
  location: string
  start: Date
  end: Date
  url: string
}

const events: Event[] = [
  {
    title:
      'Distributed communities: How to Build Timeless and Decentralized apps, with Go',
    description: 'Join our meetup!',
    location: 'Turin, Italy',
    start: new Date('2024-09-23T18:30:00+02:00'),
    end: new Date('2024-09-23T20:30:00+02:00'),
    url: 'https://www.meetup.com/golang-torino/events/303140845/',
  },
  {
    title: 'BUIDL with Cosmos Tooling',
    description: 'Join us at our side event during Web3 Summit!',
    location: 'Berlin, Germany',
    start: new Date('2024-08-20T17:00:00+02:00'),
    end: new Date('2024-08-20T22:00:00+02:00'),
    url: 'https://www.eventbrite.com/e/buidl-with-cosmos-tooling-tickets-981775686507?aff=oddtdtcreator',
  },
  {
    title: 'Web3 Kamp 2024',
    description:
      'Workshop: "Exploring Web3 Ecosystems - Building a dapp in Go"',
    location: 'Petnica, Serbia',
    start: new Date('2024-08-01T10:00:00+02:00'),
    end: new Date('2024-08-09T17:00:00+02:00'),
    url: 'https://web3kamp.org/',
  },
  {
    title: 'Nebular Summit 2024',
    description: 'Join our workshop!',
    location: 'Brussels, Belgium',
    start: new Date('2024-07-12T10:00:00+02:00'),
    end: new Date('2024-07-13T18:00:00+02:00'),
    url: 'https://nebular.builders/',
  },
  {
    title: 'GopherCon US 2024',
    description: 'Come meet us at our booth!',
    location: 'Chicago, US',
    start: new Date('2024-07-07T10:00:00-06:00'),
    end: new Date('2024-07-10T18:00:00-06:00'),
    url: 'https://www.gophercon.com/',
  },
  {
    title: 'GopherCon EU 2024',
    description: 'Come meet us at our booth!',
    location: 'Berlin, Germany',
    start: new Date('2024-06-17T10:00:00+02:00'),
    end: new Date('2024-06-20T10:00:00+02:00'),
    url: 'https://www.gophercon.com/',
  },
  {
    title: 'Gno @ Golang Serbia',
    description: 'Join the meetup!',
    location: 'Belgrade, Serbia',
    start: new Date('2024-05-23T18:00:00+02:00'),
    end: new Date('2024-05-23T22:00:00+02:00'),
    url: 'https://gno.land/r/gnoland/blog:p/gnomes-in-serbia',
  },
  {
    title: 'Intro to Gno Tokyo',
    description: 'Join the meetup!',
    location: 'Shinjuku City, Tokyo, Japan',
    start: new Date('2024-04-11T18:30:00+09:00'),
    end: new Date('2024-04-11T22:00:00+09:00'),
    url: 'https://gno.land/r/gnoland/blog:p/gno-tokyo',
  },
  {
    title: 'Go to Gno Seoul',
    description: 'Join the workshop!',
    location: 'Seoul, South Korea',
    start: new Date('2024-03-23T10:00:00+09:00'),
    end: new Date('2024-03-23T18:00:00+09:00'),
    url: 'https://medium.com/onbloc/go-to-gno-recap-intro-to-the-gno-stack-with-memeland-284a43d7f620',
  },
  {
    title: 'GopherCon US 2023',
    description: 'Come meet us at our booth!',
    location: 'San Diego, US',
    start: new Date('2023-09-26T10:00:00-07:00'),
    end: new Date('2023-09-29T18:00:00-07:00'),
    url: 'https://www.gophercon.com/',
  },
  {
    title: 'GopherCon EU 2023',
    description: 'Come meet us at our booth!',
    location: 'Berlin, Germany',
    start: new Date('2023-07-26T10:00:00+02:00'),
    end: new Date('2023-07-29T18:00:00+02:00'),
    url: 'https://gophercon.eu/',
  },
  {
    title: 'Nebular Summit gno.land for Developers',
    description: '',
    location: 'Paris, France',
    start: new Date('2023-07-24T10:00:00+02:00'),
    end: new Date('2023-07-25T18:00:00+02:00'),
    url: 'https://www.nebular.builders/',
  },
  {
    title: 'EthCC',
    description: 'Come meet us at our booth!',
    location: 'Paris, France',
    start: new Date('2023-07-17T10:00:00+02:00'),
    end: new Date('2023-07-20T18:00:00+02:00'),
    url: 'https://ethcc.io/',
  },
  {
    title: 'BUIDL Asia',
    description: 'Proof of Contribution in gno.land',
    location: 'Seoul, South Korea',
    start: new Date('2023-06-06T10:00:00+09:00'),
    end: new Date('2023-06-07T18:00:00+09:00'),
    url: 'https://www.buidl.asia/',
  },
  {
    title: 'ETH Seoul',
    description: 'The Evolution of Smart Contracts: A Journey into gno.land',
    location: 'Seoul, South Korea',
    start: new Date('2023-06-02T10:00:00+09:00'),
    end: new Date('2023-06-04T18:00:00+09:00'),
    url: 'https://2023.ethseoul.org/',
  },
  {
    title: 'Game Developer Conference',
    description: 'Side Event: Web3 Gaming Apps Powered by Gno',
    location: 'San Francisco, US',
    start: new Date('2023-03-23T10:00:00-07:00'),
    end: new Date('2023-03-23T18:00:00-07:00'),
    url: '',
  },
  {
    title: 'EthDenver 2023',
    description: 'Side Event: Discover gno.land',
    location: 'Denver, US',
    start: new Date('2023-02-24T10:00:00-06:00'),
    end: new Date('2023-03-05T10:00:00-06:00'),
    url: 'https://www.youtube.com/watch?v=IJ0xel8lr4c',
  },
  {
    title: 'Istanbul Blockchain Week',
    description: '',
    location: 'Istanbul, Turkey',
    start: new Date('2022-11-14T10:00:00+03:00'),
    end: new Date('2022-11-17T18:00:00+03:00'),
    url: 'https://www.youtube.com/watch?v=JX0gdWT0Cg4',
  },
  {
    title: 'Web Summit Buckle Up and Build with Cosmos',
    description: '',
    location: 'Lisbon, Portugal',
    start: new Date('2022-11-01T09:00:00+01:00'),
    end: new Date('2022-11-04T18:00:00+01:00'),
    url: '',
  },
  {
    title: 'Cosmoverse',
    description: '',
    location: 'Medellin, Colombia',
    start: new Date('2022-09-26T09:00:00-05:00'),
    end: new Date('2022-09-28T18:00:00-05:00'),
    url: 'https://www.youtube.com/watch?v=6s1zG7hgxMk',
  },
  {
    title: 'Berlin Blockchain Week Buckle Up and Build with Cosmos',
    description: '',
    location: 'Berlin, Germany',
    start: new Date('2022-09-11T09:00:00+02:00'),
    end: new Date('2022-09-18T18:00:00+02:00'),
    url: 'https://www.youtube.com/watch?v=hCLErPgnavI',
  },
]

const Events = () => {
  return (
    <div className="dark:bg-primary-dark h-80 flex-[2] overflow-hidden rounded-3xl bg-white">
      <HStack
        pos="apart"
        className="h-[3.25rem] border-b border-black/10 px-4 py-3 dark:border-white/10"
      >
        <span className="text-xl font-bold dark:text-white">Events</span>
        <Link
          href={ROUTES.EVENTS}
          className="text-secondary font-medium transition-opacity duration-200 ease-linear hover:opacity-50"
        >
          See all
        </Link>
      </HStack>
      <VStack
        spacing={16}
        className="max-h-[calc(20rem-3.25rem)] overflow-y-scroll px-4 py-4"
      >
        <VStack className="flex-1">
          {events?.slice(0, 5)?.map((item, index) => {
            const isUpcoming = new Date() < item?.start
            return (
              <Link
                key={index}
                href={item?.url}
                target="_blank"
                className="group flex cursor-pointer flex-nowrap items-start justify-between gap-4"
              >
                <HStack align="start" spacing={16} noWrap className="flex-1">
                  <div className="py-1">
                    <LogoGno width={28} height={28} />
                  </div>

                  <VStack
                    spacing={2}
                    className="flex-1 transition-opacity duration-200 ease-linear group-hover:opacity-50"
                  >
                    <span className="line-clamp-3 w-fit flex-1 py-0.5 font-semibold dark:text-white">
                      {item?.title}{' '}
                      {!!isUpcoming && (
                        <span className="border-primary dark:text-light text-nowrap rounded-full border px-2 py-0.5 text-xs font-medium dark:border-white">
                          Coming Soon
                        </span>
                      )}
                    </span>

                    <VStack spacing={0} className="dark:text-white">
                      <span className="text-xs">
                        <span className="font-semibold">Location:</span>{' '}
                        {item?.location}
                      </span>
                      <span className="text-xs">
                        <span className="font-semibold">Starts:</span>{' '}
                        {format(new Date(item?.start), 'dd MMMM yyyy')}
                      </span>
                    </VStack>
                  </VStack>
                </HStack>
              </Link>
            )
          })}
        </VStack>
      </VStack>
    </div>
  )
}

export default Events
