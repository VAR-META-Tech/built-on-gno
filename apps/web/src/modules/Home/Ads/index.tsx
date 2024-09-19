import { useProjects } from '@/apis'
import { DEFAULT_API_RETURN } from '@/constants'
import { useAppContext } from '@/context/app.context'
import { ROUTES } from '@/lib/routes'
import { Button, cn, HStack, Progress, VStack } from '@var-meta/ui'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const Ads = () => {
  const { theme } = useAppContext()
  const { data: projects = DEFAULT_API_RETURN } = useProjects()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  const selectedProjects = projects?.data?.slice(0, 3)
  const currentProject = selectedProjects[currentIndex]

  let nextAdInterval: any
  let progressInterval: any

  useEffect(() => {
    nextAdInterval = setInterval(() => {
      setProgress(0)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % selectedProjects?.length)
    }, 5000)

    return () => clearInterval(nextAdInterval)
  }, [selectedProjects?.length, currentIndex])

  useEffect(() => {
    progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 100 / 50
        clearInterval(progressInterval)
        return 100
      })
    }, 100)

    return () => clearInterval(progressInterval)
  }, [currentIndex])

  return (
    <div className="flex flex-[2] overflow-hidden rounded-3xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
      <VStack
        spacing={20}
        justify="center"
        className="relative flex-1 bg-black/40 p-5 backdrop-blur-2xl dark:bg-white/10"
      >
        <div className="absolute left-0 top-0 z-[-1] h-full w-full blur-2xl">
          <Image
            src={currentProject?.logoUrl || ''}
            alt="blur project"
            fill
            priority
          />
        </div>
        <motion.p
          className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-200 p-2 text-black/40 dark:text-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          Ad
        </motion.p>

        <motion.p
          key={currentProject?.name}
          className="text-2xl font-semibold text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {currentProject?.name}
        </motion.p>

        <motion.p
          key={currentProject?.shortDescription}
          className="line-clamp-3 text-white/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {currentProject?.shortDescription}
        </motion.p>

        <Link href={`${ROUTES.PROJECT}/${currentProject?.id}`}>
          <Button
            radius="full"
            className="bg-secondary hover:bg-secondary/70 w-fit transition-all duration-100 ease-linear"
            size="lg"
          >
            View app
          </Button>
        </Link>
      </VStack>

      <div className="relative flex-1">
        <motion.div
          key={currentProject?.logoUrl}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={currentProject?.logoUrl || ''}
            alt="project"
            fill
            priority
          />
        </motion.div>

        <HStack
          pos={'center'}
          noWrap
          className="absolute bottom-5 left-1/2 w-1/2 -translate-x-1/2"
        >
          {selectedProjects.map((_, index) => (
            <button
              onClick={() => {
                setCurrentIndex(index)
                setProgress(0)
                clearInterval(progressInterval)
                clearInterval(nextAdInterval)
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
    </div>
  )
}

export default Ads
