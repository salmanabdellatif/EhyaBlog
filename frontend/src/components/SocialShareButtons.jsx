import React from 'react'
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaRedditSquare,
  FaWhatsappSquare,
} from 'react-icons/fa'

function SocialShareButtons({ url, title }) {
  return (
    <div className='flex justify-between w-full'>
      <a
        href={`https://www.facebook.com/dialog/share?app_id=1391117998263290&display=popup&href=${url}`}
        rel='noreferrer'
        target='_blank'>
        <FaFacebookSquare className='w-12 h-auto text-[#3b5998]' />
      </a>
      <a
        href={`https://www.twitter.com/intent/tweet?url=${url}`}
        rel='noreferrer'
        target='_blank'>
        <FaTwitterSquare className='w-12 h-auto text-[#00acee]' />
      </a>
      <a
        href={`https://www.reddit.com/submit?url=${url}&title=${title}`}
        rel='noreferrer'
        target='_blank'>
        <FaRedditSquare className='w-12 h-auto text-[#ff4500]' />
      </a>
      <a
        href={`https://api.whatsapp.com/send?text=${url}`}
        rel='noreferrer'
        target='_blank'>
        <FaWhatsappSquare className='w-12 h-auto text-[#25d366]' />
      </a>
    </div>
  )
}

export default SocialShareButtons
