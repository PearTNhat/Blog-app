/* eslint-disable indent */
import { Link } from 'react-router-dom'
import { SampleImg } from '~/assets/image'
import { stables } from '~/constants/stables'
import useDataTable from '~/hooks/useDataTable'
import { deletePost, getAllPosts } from '~/services/post'
import DataTable from '../../component/DataTable'

function ManagePost() {
  const {
    userState,
    data: postData,
    deleteMutation,
    currentPage,
    search,
    setSearch,
    staleSearch,
    submitSearchTitle,
    deleteHandler,
    setCurrentPage
  } = useDataTable({
    dataQueryKey: 'posts',
    dataQueryFn: ({ search, currentPage }) => {
      return getAllPosts({ search, page: currentPage })
    },
    mutateDeleteFn: ({ slug, token }) => {
      return deletePost({ slug, token })
    },
    deleteMessage: 'Delete post successfully'
  })
  return (
    <DataTable
      pageTitle={'Manage Post'}
      title={'Posts'}
      submitSearchTitle={submitSearchTitle}
      search={search}
      setSearch={setSearch}
      tableHeaderTitleList={['Title', 'Categories', 'Create at', 'Tags', '']}
      data={postData}
      staleSearch={staleSearch}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    >
      <>
        {postData.data?.data?.map((post) => (
          <tr key={post.id}>
            <td className="p-4 gap-2 border-gray-200 border-b text-sm">
              <div className="flex gap-3 items-center justify-start">
                <div className="w-10 h-10 rounded-full  overflow-hidden">
                  <img
                    className="object-cover object-center w-full h-full"
                    src={`${post.photo ? stables.UPLOAD_FOLDER_BASE_URL + post.photo : SampleImg}`}
                    alt=""
                  />
                </div>
                <p className="flex-1 ">{post.title}</p>
              </div>
            </td>
            <td className="p-4 border-gray-200 border-b text-sm ">
              <div className="flex flex-wrap">
                {post.categories?.length > 0
                  ? post.categories?.map((category) => {
                      return (
                        <span key={category._id} className="mr-2">
                          {category.title}
                        </span>
                      )
                    })
                  : 'Uncategorized'}
              </div>
            </td>
            <td className="p-4 border-gray-200 border-b text-sm">
              <p>
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </p>
            </td>
            <td className="p-4 border-gray-200 border-b text-sm max-w-[200px] overflow-auto">
              {post.tags?.length === 0
                ? 'No tag'
                : post.tags?.map((tag, index) => (
                    <span key={tag}>
                      {tag}
                      {index !== post.tags.length - 1 && ', '}
                    </span>
                  ))}
            </td>
            <td className="p-4 border-gray-200 border-b text-sm">
              <button
                disabled={deleteMutation.isLoading}
                className="mr-3 text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
                onClick={() => {
                  deleteHandler({ slug: post.slug, token: userState.userInfo?.token })
                }}
              >
                Delete
              </button>
              <Link to={`/admin/posts/manage/edit/${post.slug}`} className="text-green-600 hover:text-green-900">
                Edit
              </Link>
            </td>
          </tr>
        ))}
      </>
    </DataTable>
  )
}

export default ManagePost
