import React, { FC, useMemo } from 'react'
import { IEvent } from '../utils/type'
import { format } from 'date-fns'
import EventCard from './EventCard'

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
                <EventCard
                  key={`${event?.title}-${index}`}
                  startDate={startDate}
                  endDate={endDate}
                  {...event}
                />
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default EventList
