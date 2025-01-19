import React from 'react'
import { Link } from 'react-router-dom'

const SuggestedPosts = ({ className, header, posts = [], tags }) => {
  return (
    <div
      className={`w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-4 rounded-lg mt-10 lg:mt-5 ${className}`}>
      <h2 className='text-dark-hard font-roboto font-bold md:text-xl'>
        {header}
      </h2>
      <div className='grid mt-5 gap-y-5 grid-cols-1 md:grid-cols-2 md:gap-x-5 lg:grid-cols-1'>
        {posts.map(item => (
          <div
            className='flex flex-nowrap space-x-3 items-center'
            key={item._id}>
            <img
              src={item.image}
              alt='post'
              className='rounded-lg object-cover aspect-square w-1/5'
            />
            <div className='text-sm font-roboto text-dark-hard font-medium'>
              <h3 className=''>{item.title}</h3>
              <span className=' text-dark-light text-xs font-light'>
                {new Date(item.createdAt).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
      <h2 className='text-dark-hard font-roboto font-bold mt-8'>Tags</h2>
      <div className='flex flex-wrap gap-2 mt-4'>
        {tags.map((item, index) => (
          <Link
            key={index}
            to='/'
            className='inline-block rounded-md py-1.5 px-3 font-roboto text-sm bg-primary text-white'>
            {item}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SuggestedPosts
