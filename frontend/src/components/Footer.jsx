import React from 'react'
import images from '../constants/images'
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaYoutube,
  FaHeart,
} from 'react-icons/fa'

const Footer = () => {
  return (
    <section className='bg-dark-hard'>
      <div className='container mx-auto pt-10'>
        <div className='flex flex-col-reverse md:flex-row gap-5'>
          <div className=' w1/5 p-6'>
            <img src={images.WhiteLogo} alt='Logo' className='mx-auto md:m-0' />
            <p className=' text-dark-light mt-5 text-center md:text-start'>
              Build a modern and creative website with moonfo
            </p>
            <div className='flex gap-10 items-center text-white py-5 my-5 justify-center md:justify-start'>
              <FaFacebook className='w-6 h-6' />
              <FaTwitter className='w-6 h-6' />
              <FaInstagram className='w-6 h-6' />
              <FaGithub className='w-6 h-6' />
              <FaYoutube className='w-6 h-6' />
            </div>
          </div>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-8 p-5'>
            <div className=' text-dark-light leading-8'>
              <h4 className='font-bold text-lg'>Product</h4>
              <p>Landingpage</p>
              <p>Features</p>
              <p>Documentation</p>
              <p>Referral Program</p>
              <p>Pricing</p>
            </div>
            <div className=' text-dark-light leading-8'>
              <h4 className='font-bold text-lg'>Services</h4>
              <p>Documentation</p>
              <p>Design</p>
              <p>Themes</p>
              <p>Illustrations</p>
              <p>UI Kit</p>
            </div>
            <div className=' text-dark-light leading-8'>
              <h4 className='font-bold text-lg'>Company</h4>
              <p>About</p>
              <p>Terms</p>
              <p>Privacy Policy</p>
              <p>Careers</p>
            </div>
            <div className=' text-dark-light leading-8'>
              <h4 className='font-bold text-lg'>More</h4>
              <p>Documentation</p>
              <p>License</p>
              <p>Changelog</p>
            </div>
          </div>
        </div>
        <div className='py-10'>
          <div className='mx-auto text-white w-14 h-14 rounded-full bg-primary flex justify-center items-center my-4'>
            <FaHeart className='w-6 h-6' />
          </div>
          <p className='text-center italic font-bold text-dark-light'>
            Copyright © 2019. Moonfo with love.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Footer
