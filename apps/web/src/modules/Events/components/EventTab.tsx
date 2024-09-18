import { cn } from '@var-meta/ui'
import React, { FC } from 'react'
import { motion } from 'framer-motion'

interface IData {
  label: string
  value: string
}

interface Props {
  layoutId: string
  data: IData[]
  value: string
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void
}

const EventTab: FC<Props> = ({ data, value, onChange, layoutId }) => {
  return (
    <div className="overflow-x-auto">
      <ul className="flex">
        {data?.map((tab, i) => (
          <li
            onClick={() => onChange(tab.value)}
            className={cn(
              'relative z-10 flex h-10 min-w-32 cursor-pointer items-center justify-center whitespace-nowrap px-4 py-3 text-sm font-semibold text-black dark:text-white',
              {
                'text-white dark:text-black': value === tab.value,
                'transition-opacity duration-300 ease-linear hover:opacity-50':
                  value !== tab.value,
              },
            )}
            key={i}
          >
            {tab.label}
            {value === tab.value ? (
              <motion.div
                layoutId={layoutId}
                className="bg-primary absolute bottom-0 left-0 z-[-1] h-full w-full rounded-full dark:bg-white"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EventTab
