import React from 'react'
import { Link } from 'react-router-dom'
import images from '../constants/images'
import { FiCheck } from 'react-icons/fi'
import stables from '../constants/stables'

const ArticleCard = ({ post, className }) => {
  return (
    <div className={`rounded-xl overflow-hidden shadow-[0_3px_10px_rgb(0,0,0,0.2)] ${className}`}>
      <Link to={`/blog/${post.slug}`}>
        <img
          src={post.photo ? stables.UPLOAD_FOLDER_BASE_URL + post.photo : images.samplePostImage}
          alt='title'
          className='w-full object-cover object-center h-auto max-h-[300px]'
        />
      </Link>
      <div className='p-5'>
        <Link to={`/blog/${post.slug}`}>
          <h2 className='font-roboto font-bold text-xl text-dark-soft md:text-2xl'>{post.title}</h2>
          <p className='text-dark-soft mt-3 text-sm md:text-lg'>{post.caption}</p>
        </Link>
        <div className='flex flex-nowrap justify-between items-center mt-6'>
          <div className='flex items-center gap-x-2 md:gap-x-2.5 '>
            <img
              src={post.user.avatar ? stables.UPLOAD_FOLDER_BASE_URL + post.user.avatar : images.PostProfile}
              alt='profile-avatar'
              className='w-9 h-9 md:w-10 md:h-10 rounded-full'
            />
            <div className='flex flex-col'>
              <h4 className='italic font-bold text-dark-soft text-sm md:text-base'>{post.user.name}</h4>
              {post.user.verified && (
                <div className='flex items-center gap-x-2'>
                  <span className='bg-[#36B37E] bg-opacity-20 w-fit rounded-full'>
                    <FiCheck className='text-[#36B37E] p-0.5' />
                  </span>
                  <span className='italic text-dark-light text-xs md:text-sm'>Verified writer</span>
                </div>
              )}
            </div>
          </div>
          <span className='italic text-dark-light font-bold text-sm md:text-base'>
            {new Date(post.createdAt).getDate()}{' '}
            {new Date(post.createdAt).toLocaleString('default', {
              month: 'long',
            })}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ArticleCard
