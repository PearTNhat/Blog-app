import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import ArticleCard from '~/components/ArticleCard'
import ArticleCardSkeleton from '~/components/ArticleCardSkeleton'
import Button from '~/components/Button'
import ErrorMessage from '~/components/ErrorMessage'
import { getAllPosts } from '~/services/post'
function Articles() {
  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: () => {
      return getAllPosts({})
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  return (
    <section className="flex flex-col items-center max-container px-4 py-10 ">
      {/*  do co flex-col ở trên nên dưới phải có w-full để cho chiều ngang 100% */}
      <div className="flex flex-wrap gap-4 w-full">
        {postsQuery.isLoading ? (
          [...Array(3)].map((_, index) => (
            <ArticleCardSkeleton className={'w-full md:w-[calc(50%-16px)] lg:w-[calc(33.33%-16px)]'} key={index} />
          ))
        ) : postsQuery.isError ? (
          <ErrorMessage message={"Couldn't fetch the posts data"} />
        ) : (
          postsQuery.data?.data.map((post) => {
            return (
              <ArticleCard
                key={post._id}
                className={'w-full md:w-[calc(50%-16px)] lg:w-[calc(33.33%-16px)]'}
                post={post}
              />
            )
          })
        )}
      </div>
      <div className="my-7 max-md:mb-0">
        {postsQuery.data?.data.length > 0 && (
          <Button type="link" to="/blog" outline>
            More detail
          </Button>
        )}
      </div>
    </section>
  )
}

export default Articles
