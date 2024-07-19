import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { CardProject } from '@repo/ui'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 2.5,
  slidesToScroll: 1,
  initialSlide: 0,
  centerPadding: '10px',
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 1.5,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
}

const LatestAdded = () => {
  return (
    <div className="container flex flex-col py-20">
      <div className="col-span-12 flex flex-col justify-start gap-8 py-10">
        <p className="text-3xl font-bold lg:text-4xl">Latest Added</p>
      </div>
      <Slider {...settings}>
        <CardProject />
        <CardProject />
        <CardProject />
        <CardProject />
        <CardProject />
        <CardProject />
      </Slider>
    </div>
  )
}

export default LatestAdded
