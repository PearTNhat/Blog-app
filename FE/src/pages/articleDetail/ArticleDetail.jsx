import { Link, useParams } from 'react-router-dom'

import { SampleImg } from '~/assets/image'
import BreadCrumbsCard from '~/components/BreadCrumbsCard'
import MainLayout from '~/sections/MainLayout'
import SuggestedArticle from './container/SuggestedArticle'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'

import CommentsContainer from '~/components/comments/CommentsContainer'
import SocialShareButton from './container/SocialShareButton'
import { getAllPosts, getSinglePost } from '~/services/post'
import { useEffect, useState } from 'react'
import { stables } from '~/constants/stables'
import ArticleDetailSkeleton from './components/ArticleDetailSkeleton'
import ErrorMessage from '~/components/ErrorMessage'
import parseJsonToHtml from '~/utils/parseJsonToHtml'
import Editor from '~/components/edit/Editor'
import InputGroup from '~/components/InputGroup/InputGroup'
function ArticleDetail() {
  const { slug } = useParams()
  const userState = useSelector((state) => state.user.userInfo)
  const [breadCrumbs, setBreadCrumbs] = useState([])
  const [body, setBody] = useState(null)
  const {
    data: postData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['blog', slug],
    queryFn: () => getSinglePost({ slug }),
    onSuccess: (data) => {
      // setBody(parseJsonToHtml(data.data?.body))
      setBreadCrumbs([
        {
          name: 'Home',
          path: '/'
        },
        {
          name: 'Blog',
          path: '/blog'
        },
        {
          name: 'Article detail',
          path: `/blog/${data.data?.slug}`
        }
      ])
    }
  })
  const { data: suggestPostsData } = useQuery({
    queryKey: ['posts'],
    queryFn: () => {
      return getAllPosts({ limit: 5 })
    }
  })
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])
  return (
    <MainLayout>
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage className={'mt-header-height p-5'} message={"Couldn't fetch the post data"} />
      ) : (
        <section className="mt-header-height p-5">
          <div className="max-container flex flex-col lg:flex-row lg:gap-4">
            <article className="">
              <BreadCrumbsCard data={breadCrumbs} />
              <img
                src={postData?.data.photo ? stables.UPLOAD_FOLDER_BASE_URL + postData?.data.photo : SampleImg}
                className="w-full"
                alt="laptop"
              />
              <div className="my-5 text-primary">
                {postData?.data?.categories?.map((category) => (
                  <Link
                    key={category._id}
                    className="text-sm capitalize tracking-wide mr-2 hover:text-blue-800"
                    to={`/blog?category=${category.title}`}
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
              <h1 className="text-dark-hard text-3xl font-bold" >{postData?.data.title}</h1>
              <p className='my-4 py-4 border-b border-t border-gray-500 '>{postData?.data.caption}</p>
              <div className="w-full">
                {!isLoading && !isError && (
                  <Editor
                    content={postData?.data.body}
                    editable={false}
                    onDataChange={(data) => {
                      setBody(data)
                    }}
                  />
                )}
              </div>
              <CommentsContainer user={userState} comments={postData?.data.comments} currentSlugPost={slug} />
            </article>
            <div className="flex-1">
              <SuggestedArticle header="Latest article" posts={suggestPostsData?.data} tags={postData?.data.tags} currentPost={postData?.data} />
              <SocialShareButton
                url={`${encodeURI(window.location.href)}`}
                title={`${encodeURIComponent(postData?.data.title)}`}
              />
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  )
}

export default ArticleDetail
