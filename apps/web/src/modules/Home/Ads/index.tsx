import { useProjects } from '@/apis'
import { DEFAULT_API_RETURN } from '@/constants'
import React, { useCallback, useEffect, useState } from 'react'
import AdInfo from './AdInfo'
import AdImage from './AdImage'
import { Skeleton } from '@var-meta/ui'

const Ads = () => {
  const { data: projects = DEFAULT_API_RETURN, isLoading } = useProjects()
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [progress, setProgress] = useState<number>(0)

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

  const onChangeAd = useCallback(
    (index: number) => {
      setProgress(0)
      setCurrentIndex(index)
      clearInterval(progressInterval)
      clearInterval(nextAdInterval)
    },
    [progressInterval, nextAdInterval],
  )

  if (isLoading) {
    return <Skeleton className="z-20 h-full min-h-80 flex-[3] rounded-3xl" />
  }

  return (
    <div className="flex h-80 min-h-80 flex-[3] flex-col overflow-hidden rounded-3xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] md:flex-row dark:border dark:border-white/10">
      <AdInfo currentProject={currentProject} />

      <AdImage
        currentProject={currentProject}
        selectedProjects={selectedProjects}
        currentIndex={currentIndex}
        progress={progress}
        onChangeAd={onChangeAd}
      />
    </div>
  )
}

export default Ads
