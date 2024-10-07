import { CalendarCheck01Icon, MarkerPin01Icon } from '@var-meta/icons'
import { HStack, VStack } from '@var-meta/ui'
import Link from 'next/link'
import React, { FC } from 'react'
import { IEvent } from '../utils/type'

interface IEventCardProps extends IEvent {
  startDate: string
  endDate: string
}

const EventCard: FC<IEventCardProps> = ({
  url,
  title,
  description,
  location,
  startDate,
  endDate,
}) => {
  return (
    <Link target="_blank" href={url} className="group">
      <VStack className="relative col-span-1 h-full w-full cursor-pointer overflow-hidden rounded-3xl px-8 py-7 shadow-[0_3px_6px_rgb(0,0,0,0.1)] transition-all duration-200 ease-linear dark:bg-white/5">
        <span className="absolute right-0 top-0 z-0 h-36 w-36 -translate-y-1/2 translate-x-1/2 rounded-full bg-gray-300 transition-all duration-700 ease-out group-hover:scale-[1000%] dark:bg-white/10" />

        <p className="z-10 text-2xl font-semibold">{title}</p>
        <HStack>
          <CalendarCheck01Icon className="z-10 h-5 w-5" />
          <p className="z-10 text-base font-medium opacity-50">{`${startDate} - ${endDate}`}</p>
        </HStack>

        <HStack>
          <MarkerPin01Icon className="z-10 h-5 w-5" />
          <p className="z-10 text-base font-medium opacity-50">{location}</p>
        </HStack>

        <p className="z-10 text-lg">{description}</p>
      </VStack>
    </Link>
  )
}

export default EventCard
