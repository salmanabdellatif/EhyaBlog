import React, { useState } from 'react'
import MainLayout from '../../components/MainLayout'
import BreadCrumbs from '../../components/BreadCrumbs'
import { images } from '../../constants'
import { Link, useParams } from 'react-router-dom'
import SuggestedPosts from './container/SuggestedPosts'
import CommentsContainer from '../../components/comments/CommentsContainer'
import SocialShareButtons from '../../components/SocialShareButtons'
import { getSinglePost } from '../../services/index/posts'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const PostsData = [
  {
    _id: '1',
    image: images.Post1Image,
    title: 'Help children get better education',
    createdAt: 'Jun 27, 2022',
  },
  {
    _id: '2',
    image: images.Post1Image,
    title: 'Help children get better education',
    createdAt: 'Jun 27, 2022',
  },
  {
    _id: '3',
    image: images.Post1Image,
    title: 'Help children get better education',
    createdAt: 'Jun 27, 2022',
  },
  {
    _id: '4',
    image: images.Post1Image,
    title: 'Help children get better education',
    createdAt: 'Jun 27, 2022',
  },
  {
    _id: '5',
    image: images.Post1Image,
    title: 'Help children get better education',
    createdAt: 'Jun 27, 2022',
  },
]
const tags = ['Medical', 'Lifestyle', 'Learn', 'Healthy', 'Food', 'Diet', 'Education']

const ArticlePage = () => {
  const [breadCrumbs, setBreadCrumbs] = useState([])

  const { slug } = useParams()

  const { data } = useQuery({
    queryKey: ['singlePost', slug],
    queryFn: () => getSinglePost(slug),
    enabled: Boolean(slug),
    onSuccess: data => {
      setBreadCrumbs([
        { name: 'Home', link: '/' },
        { name: 'Blog', link: '/blog' },
        { name: data.title, link: `/blog/${data.slug}` },
      ])
    },
    onError: error => {
      toast.error(error.message)
    },
  })

  return (
    <MainLayout>
      <section className='container mx-auto max-w-5xl flex flex-col p-5 lg:flex-row gap-x-5'>
        <article className='lg:w-2/3 container mx-auto'>
          <BreadCrumbs data={breadCrumbs} />
          <img src={images.Post1Image} alt='PostImg' className='w-full rounded-xl' />
          <Link to='/blog?category=selectedCategory' className='text-primary mt-2 inline-block text-sm font-roboto md:text-base'>
            EDUCATION
          </Link>
          <h1 className='text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]'>
            Help children get better education
          </h1>
          <div className='mt-4 text-dark-soft'>
            <p className=' leading-7'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue mauris rhoncus aenean vel elit
              scelerisque. In egestas erat imperdiet sed euismod nisi porta lorem mollis. Morbi tristique senectus et netus.
              Mattis pellentesque id nibh tortor id aliquet lectus proin.
            </p>
          </div>
          <CommentsContainer className='mt-10' loggedInUserId='a' />
        </article>
        <div className='lg:w-1/3 container mx-auto h-fit'>
          <SuggestedPosts header='Latest Article' posts={PostsData} tags={tags} />
          <div className='mt-7'>
            <h2 className='font-roboto font-medium md:text-xl text-dark-hard mb-4'>Share on:</h2>
            <SocialShareButtons
              url={encodeURI('https://moonfo.com/post/client-side-and-server-side-explanation')}
              title={encodeURIComponent('Client-side and Server-side explanation')}
            />
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default ArticlePage
