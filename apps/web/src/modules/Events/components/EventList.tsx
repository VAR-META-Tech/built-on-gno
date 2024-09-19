import React, { FC, useMemo } from 'react'
import { IEvent } from '../utils/type'
import LogoGno from '@/components/LogoGno'
import { format } from 'date-fns'
import { VStack } from '@var-meta/ui'
import Link from 'next/link'

interface Props {
  data: IEvent[]
}

const EventList: FC<Props> = ({ data }) => {
  const eventsByYear: Record<number, IEvent[]> = useMemo(
    () =>
      data?.reduce(
        (acc, event) => {
          const year = new Date(event.start)?.getFullYear()
          if (!acc[year]) {
            acc[year] = []
          }
          acc[year].push(event)
          return acc
        },
        {} as Record<number, IEvent[]>,
      ),
    [data],
  )

  const sortedYears = useMemo(
    () =>
      Object.keys(eventsByYear)
        .map(Number)
        .sort((a, b) => b - a),
    [eventsByYear],
  )

  return (
    <div className="space-y-5">
      {sortedYears.map((year) => (
        <div key={year} className="space-y-5">
          <h2 className="text-2xl font-bold">{year}</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {eventsByYear[year]?.map((event, index) => {
              const startDate = format(new Date(event.start), 'dd MMM')
              const endDate = format(new Date(event.end), 'dd MMM')

              return (
                <Link
                  target="_blank"
                  href={event.url}
                  key={`${event.title}-${index}`}
                  className="group"
                >
                  <VStack className="relative col-span-1 h-full w-full cursor-pointer overflow-hidden rounded-3xl px-8 py-7 shadow-[0_3px_6px_rgb(0,0,0,0.1)] transition-all duration-200 ease-linear dark:bg-white/5">
                    <span className="absolute right-0 top-0 z-0 h-36 w-36 -translate-y-1/2 translate-x-1/2 rounded-full bg-gray-300 transition-all duration-700 ease-out group-hover:scale-[1000%] dark:bg-white/10" />

                    <LogoGno width={64} height={64} className="z-10" />
                    <span className="z-10 font-medium opacity-50">{`${startDate} - ${endDate}`}</span>
                    <span className="z-10 text-xl font-semibold">
                      {event.title}
                    </span>
                    <span className="z-10 text-base">
                      <span className="font-semibold">Location:</span>{' '}
                      {event.location}
                    </span>
                    <span className="z-10">{event.description}</span>
                  </VStack>
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default EventList
