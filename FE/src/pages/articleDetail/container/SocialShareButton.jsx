import React from 'react'
import { FaFacebook } from 'react-icons/fa6'
import { FaTelegram, FaTwitter } from 'react-icons/fa'
import { IoLogoWhatsapp } from 'react-icons/io'
function SocialShareButton({ url, title }) {
  return (
    <div className="flex justify-between gap-3 p-4">
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://www.facebook.com/dialog/share?app_id=${
          import.meta.env.VITE_APP_ID_FACEBOOK
        }&display=popup&href=${url}`}
      >
        <FaFacebook className="text-[#1877F2] w-12 h-auto" />
      </a>
      <a target="_blank" rel="noreferrer" href={`https://t.me/share/url?url=${url}&text=${title}`}>
        <FaTelegram className="text-[#33A8DA] w-12 h-auto" />
      </a>{' '}
      <a target="_blank" rel="noreferrer" href={`http://twitter.com/share?text=${title}&url=${url}`}>
        <FaTwitter className="text-[#249EF0] w-12 h-auto" />
      </a>
      <a target="_blank" rel="noreferrer" href={`https://api.whatsapp.com/send?text=${title} ${url}`}>
        <IoLogoWhatsapp className="text-[#4CC85A] w-12 h-auto" />
      </a>
    </div>
  )
}

export default SocialShareButton
