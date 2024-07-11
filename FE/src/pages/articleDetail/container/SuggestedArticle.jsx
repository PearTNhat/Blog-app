import { Link } from 'react-router-dom'
import { SampleImg } from '~/assets/image'
import { stables } from '~/constants/stables'

function SuggestedArticle({ header, posts, tags, currentPost }) {
  return (
    <div className="p-4 my-6 font-roboto shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] rounded-sm">
      <span className="text-dark-hard text-base font-bold my-2">{header}</span>
      <div className="grid grid-cols-2">
        {posts?.map((post) => (
          post.id === currentPost.id ? null : (
            <div className="lg:col-span-2 max-sm:col-span-2  my-4" key={post.id}>
              <Link to={`/blog/${post.slug}`} className="flex gap-3">
                <img
                  src={`${post.photo ? stables.UPLOAD_FOLDER_BASE_URL + post.photo : SampleImg}`}
                  alt="image"
                  className="w-[57px] h-[59px] object-cover object-center rounded-md"
                />
                <div className="flex flex-col justify-between">
                  <h2 className="font-medium text-dark-hard text-sm leading-[22px]">{post.title}</h2>
                  <span className="mt-[auto] text-[10px] text-dark-light">
                    {new Date(post.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </Link>
            </div>
          )
        ))}
      </div>
      <div className="">
        <span className="text-base font-medium text-dark-hard my-4">Tags</span>
        <div className="flex gap-3 flex-wrap">
          {tags?.length === 0 ? (
            <p className="text-dark-light text-xs">There is no tags this post</p>
          ) : (
            tags?.map((tag) => (
              <div key={tag} className="px-2 py-1 text-xs text-white bg-primary rounded-md">
                {tag}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default SuggestedArticle
