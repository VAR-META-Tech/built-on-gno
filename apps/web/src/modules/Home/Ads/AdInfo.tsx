import React, { FC } from 'react'
import { motion } from 'framer-motion'
import { Button, VStack } from '@var-meta/ui'
import Image from 'next/image'
import { ROUTES } from '@/lib/routes'
import Link from 'next/link'
import { IProject } from '@repo/ui'

interface Props {
  currentProject: IProject | undefined
}

const AdInfo: FC<Props> = ({ currentProject }) => {
  return (
    <VStack
      spacing={20}
      justify="center"
      className="relative flex-1 overflow-hidden bg-black/40 p-5 backdrop-blur-2xl dark:bg-white/10"
    >
      <motion.div
        key={currentProject?.logoUrl}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute left-0 top-0 z-[-1] h-full w-full blur-2xl transition-all ease-in-out"
      >
        <Image
          src={currentProject?.logoUrl || ''}
          alt="blur project"
          fill
          priority
        />
      </motion.div>

      <motion.p
        key={currentProject?.name}
        className="text-2xl font-semibold text-white transition-all ease-in-out"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
      >
        {currentProject?.name}
      </motion.p>

      <motion.p
        key={currentProject?.shortDescription}
        className="h-18 line-clamp-3 text-white/70 transition-all ease-in-out"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
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
  )
}

export default AdInfo
