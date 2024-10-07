import React, { FC, useMemo } from 'react'
import { IEvent } from '../utils/type'
import { format } from 'date-fns'
import { HStack, VStack } from '@var-meta/ui'
import { Link } from 'next-view-transitions'
import { CalendarCheck01Icon, MarkerPin01Icon } from '@var-meta/icons'

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
    <div className="space-y-16">
      {sortedYears.map((year) => (
        <div key={year} className="space-y-5">
          <h2 className="text-2xl font-bold">
            {year}{' '}
            <span className="text-end text-base font-semibold text-gray-400 lg:text-lg">
              {eventsByYear[year]?.length}
            </span>
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {eventsByYear[year]?.map((event, index) => {
              const startDate = format(new Date(event?.start), 'dd MMM')
              const endDate = format(new Date(event?.end), 'dd MMM')

              return (
                <Link
                  target="_blank"
                  href={event?.url}
                  key={`${event?.title}-${index}`}
                  className="group"
                >
                  <VStack className="relative col-span-1 h-full w-full cursor-pointer overflow-hidden rounded-3xl px-8 py-7 shadow-[0_3px_6px_rgb(0,0,0,0.1)] transition-all duration-200 ease-linear dark:bg-white/5">
                    <span className="absolute right-0 top-0 z-0 h-36 w-36 -translate-y-1/2 translate-x-1/2 rounded-full bg-gray-300 transition-all duration-700 ease-out group-hover:scale-[1000%] dark:bg-white/10" />

                    {/* <LogoGno width={64} height={64} className="z-10" /> */}
                    <p className="z-10 text-2xl font-semibold">{event?.title}</p>
                    <HStack>
                      <CalendarCheck01Icon className="h-5 w-5" />
                      <p className="z-10 text-base font-medium opacity-50">{`${startDate} - ${endDate}`}</p>
                    </HStack>

                    <HStack>
                      <MarkerPin01Icon className="h-5 w-5" />
                      <p className="z-10 text-base font-medium opacity-50">
                        {event?.location}
                      </p>
                    </HStack>
                    <p className="z-10 text-lg">{event?.description}</p>
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
