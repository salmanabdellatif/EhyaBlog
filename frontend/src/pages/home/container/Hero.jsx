import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { images } from '../../../constants'

const Hero = () => {
  return (
    <section className='container mx-auto flex flex-col lg:flex-row px-5 py-5'>
      <div className='mt-10 lg:w-1/2'>
        <h1 className='text-dark-soft text-3xl font-roboto text-center font-bold md:text-5xl lg:text-4xl xl:text-5xl lg:text-left lg:max-w-[540px]'>
          Read the most interesting articles
        </h1>
        <p className='text-dark-soft text-center lg:text-left lg:text-base xl:text-xl mt-4 md:text-xl'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </p>
        <div className='flex flex-col gap-y-2.5 mt-10 lg:mt-6 xl:mt-10 relative'>
          <div className='relative'>
            <FiSearch className='absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#959EAD]' />
            <input
              type='text'
              placeholder='Search article'
              className='placeholder:font-bold font-semibold text-dark-soft placeholder:text-[#959EAD]  focus:outline-none rounded-lg pl-12 pr-3 w-full py-3 md:py-4 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]'
            />
          </div>
          <button className='w-full text-white bg-primary font-semibold px-5 py-3 rounded-lg md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 md:w-fit md:py-2'>
            Search
          </button>
        </div>
        <div className='flex flex-col md:flex-row md:gap-x-4 mt-4 md:mt-7 md:items-center items-start'>
          <span className='text-dark-light font-bold italic whitespace-nowrap mt-2 lg:mt-4 lg:text-sm xl:text-base'>
            Popular tags:
          </span>
          <ul className='flex flex-wrap gap-x-2.5 gap-y-2.5 mt-4 lg:text-sm xl:text-base'>
            <li className='rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-bold italic'>
              Design
            </li>
            <li className='rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-bold italic'>
              User Experience
            </li>
            <li className='rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-bold italic'>
              User Interfaces
            </li>
          </ul>
        </div>
      </div>
      <div className='hidden lg:block'>
        <img
          className='w-full'
          src={images.HeroImage}
          alt='users are reading articles'
        />
      </div>
    </section>
  )
}

export default Hero
