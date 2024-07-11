import { MdClose } from 'react-icons/md'
import { FaCheck } from 'react-icons/fa'
import { stables } from '~/constants/stables'
import { SampleImg, UserImg } from '~/assets/image'
import { Link } from 'react-router-dom'
function ArticleCard({ className, post }) {
  return (
    <div className={`${className} shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] rounded-xl overflow-hidden`}>
      <Link to={`/blog/${post.slug}`}>
        <img
          src={`${post.photo ? stables.UPLOAD_FOLDER_BASE_URL + post.photo : SampleImg}`}
          alt="title"
          className="w-full"
        />
      </Link>
      <div className="p-4">
        <Link to={`/blog/${post.slug}`}>
          <h2 className="font-roboto appear text-xl lg:text-3xl text-dark-hard mt-4">{post.title}</h2>
          <p className="text-sm my-4 md:text-lg text-dark-light limited-text">{post.caption}</p>
        </Link>
        <div className="flex justify-between items-center my-4">
          <div className="flex">
            <span className="mr-4">
              <img
                src={`${post.user.avatar ? stables.UPLOAD_FOLDER_BASE_URL + post.user.avatar : UserImg}`}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover object-center"
                alt="img-user"
              />
            </span>
            <div className="">
              <h4 className="text-sm md:text-base text-dark-soft font-bold italic">{post.user.name}</h4>
              <div className="flex items-center italic text-xs text-dark-light">
                {post.verified ? (
                  <>
                    <span
                      className={`flex items-center justify-center mr-1 w-4 h-4  bg-[#36B37E]'  bg-opacity-20 rounded-full overflow-hidden`}
                    >
                      <FaCheck className="text-[#36B37E] " />
                    </span>
                    Verified writer
                  </>
                ) : (
                  <>
                    <span
                      className={`flex items-center justify-center mr-1 w-4 h-4  bg-[#FF5630] bg-opacity-20 rounded-full overflow-hidden`}
                    >
                      <MdClose className="text-[#FF5630]" />
                    </span>
                    Unverified writer
                  </>
                )}
              </div>
            </div>
          </div>
          <span className="italic text-xl md:text-base font-bold text-dark-light">
            {new Date(post.createdAt).getDate() +
              ' ' +
              new Date(post.createdAt).toLocaleString('default', { month: 'short' })}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ArticleCard
