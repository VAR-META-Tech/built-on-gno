'use client'
import { motion } from 'framer-motion'

export const Rectangle = ({ src }: { src: string }) => {
  return (
    <motion.div
      className="relative h-16 w-16 rounded"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: Math.random() }}
    >
      <img
        alt=""
        className="delay-50 h-16 w-16 rounded object-cover transition duration-200 ease-in-out hover:scale-110"
        src={src}
      />
    </motion.div>
  )
}
