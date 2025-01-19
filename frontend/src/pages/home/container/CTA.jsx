import React from 'react'
import images from '../../../constants/images'

const CTA = () => {
  return (
    <>
      <svg
        className='w-full h-auto max-h-40 translate-y-[1px]'
        preserveAspectRatio='none'
        viewBox='0 0 2160 263'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          id='Wave'
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M2160 262.5H0V0C360 80 720 120 1080 120C1440 120 1800 80 2160 0V262.5Z'
          fill='#0D2436'
        />
      </svg>
      <section className='bg-dark-hard'>
        <div className='container py-10 gap-5 md:flex md:flex-col lg:flex-row lg:justify-center lg:items-center mx-auto'>
          <div className='w-full max-w-[575px] mx-auto p-10 md:px-0'>
            <h2 className='font-roboto text-2xl text-white font-bold'>
              Get our stories delivered From us to your inbox weekly.
            </h2>
            <div className='w-full max-w-[494px] mt-12 mx-auto md:flex gap-2'>
              <input
                type='text'
                placeholder='Your Email'
                className='px-4 py-3 rounded-lg w-full placeholder:text-dark-light focus:outline-none mt-3'
              />
              <button className='px-4 py-3 rounded-lg w-full md:w-1/2  bg-primary text-white font-bold whitespace-nowrap mt-3'>
                Get Started
              </button>
            </div>
            <p className=' text-dark-light text-sm leading-7 mt-6 md:text-center lg:text-left'>
              <span className='font-bold italic text-[#B3BAC5]'>
                Get a response tomorrow
              </span>{' '}
              if you submit by 9pm today. If we received after 9pm will get a
              reponse the following day.
            </p>
          </div>
          <div className='hidden md:block md:order-first lg:order-last'>
            <div className=' w-3/4 relative z-10 mx-auto'>
              <div className=' w-1/2 h-1/2 z-[-1] rounded-xl bg-[#FC5A5A] absolute right-[-30px] top-10' />
              <div className=' w-1/2 h-1/2 z-[-1] rounded-xl bg-[#E5EAF4] absolute left-[-35px] bottom-[-25px] opacity-10' />
              <div className='w-full rounded-xl bg-white p-3'>
                <img
                  src={images.CtaImage}
                  alt='title'
                  className='w-full object-cover object-center h-auto'
                />
                <div className='p-5'>
                  <h2 className='font-roboto font-bold text-xl text-dark-soft md:text-2xl'>
                    The best aticles every week
                  </h2>
                  <p className='text-dark-soft mt-3 text-sm md:text-lg'>
                    Our insurance plans offers are priced the same everywhere
                    else.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CTA
