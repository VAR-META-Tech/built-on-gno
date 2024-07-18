'use client'
import React from 'react'
import { Category } from '@repo/ui'
import HeroSection from '@/components/HeroSection/HeroSection'
import { useCategories } from '@/apis'

const HomePage = () => {
  const { data: categories } = useCategories()
  return (
    <>
      <HeroSection />
      <div className="container mt-10 flex w-full flex-wrap justify-center gap-4 sm:mt-20 md:mt-32">
        {categories?.map((category) => (
          <Category
            projects={[
              {
                logo: 'https://img.freepik.com/free-vector/realistic-cardano-coin-illustration_52683-78384.jpg?semt=ais_user',
              },
              {
                logo: 'https://img.freepik.com/free-vector/blockchain-concept_23-2147856383.jpg?semt=ais_user',
              },
              {
                logo: 'https://img.freepik.com/free-vector/gradient-isometric-nft-concept_52683-62009.jpg?semt=ais_user',
              },
              {
                logo: 'https://img.freepik.com/free-psd/3d-nft-icon-chain_629802-28.jpg?semt=ais_user',
              },
            ]}
            title={category?.name}
            link={'/ecosystem/' + category?.name}
          />
        ))}
      </div>
    </>
  )
}

export default HomePage
