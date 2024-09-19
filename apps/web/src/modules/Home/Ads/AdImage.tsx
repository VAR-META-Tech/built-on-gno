import { useAppContext } from '@/context/app.context'
import { cn, HStack, Progress } from '@var-meta/ui'
import Image from 'next/image'
import React, { FC } from 'react'
import { motion } from 'framer-motion'
import { IProject } from '@repo/ui'

interface Props {
  currentProject: IProject | undefined
  selectedProjects: IProject[]
  currentIndex: number
  progress: number
  // eslint-disable-next-line no-unused-vars
  onChangeAd: (index: number) => void
}

const exceptionProject = ['gnoscan']

const AdImage: FC<Props> = ({
  currentProject,
  selectedProjects,
  currentIndex,
  progress,
  onChangeAd,
}) => {
  const { theme } = useAppContext()

  return (
    <div
      className={cn('relative hidden flex-[2] md:block', {
        'bg-black': exceptionProject?.includes(
          String(currentProject?.name).toLowerCase(),
        ),
      })}
    >
      <motion.div
        key={currentProject?.logoUrl}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="transition-all ease-in-out"
      >
        <Image
          src={currentProject?.logoUrl || ''}
          alt="project"
          fill
          priority
          className="object-contain"
        />
      </motion.div>

      <HStack
        pos={'center'}
        noWrap
        className="absolute bottom-5 left-1/2 hidden w-1/2 -translate-x-1/2 md:flex"
      >
        {selectedProjects.map((_, index) => (
          <button
            onClick={() => {
              onChangeAd(index)
            }}
            className="w-full"
            key={index}
          >
            <Progress
              value={index === currentIndex ? progress : 0}
              className={cn(
                '[&>div]:bg-secondary bg-white/50 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]',
                {
                  '[&>div]:bg-white': theme !== 'light',
                },
              )}
            />
          </button>
        ))}
      </HStack>
    </div>
  )
}

export default AdImage
