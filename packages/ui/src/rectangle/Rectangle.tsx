'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export const Rectangle = ({ src }: { src: string }) => {
  return (
    <motion.div
      className="relative h-24 w-24 rounded"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: Math.random() }}
    >
      <Image
        alt=""
        layout="fill"
        className="delay-50 h-24 w-24 rounded object-contain transition duration-200 ease-in-out hover:scale-110"
        src={src}
      />
    </motion.div>
  )
}
