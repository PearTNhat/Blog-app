/* eslint-disable indent */
import { deleteComment, getAllComments, updateComment } from '~/services/comment'
import DataTable from '../../component/DataTable'
import useDataTable from '~/hooks/useDataTable'
import { stables } from '~/constants/stables'
import { SampleImg } from '~/assets/image'
import { Link } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

function Comments() {
  const queryClient = useQueryClient()
  const {
    userState,
    data: commentsData,
    deleteMutation,
    currentPage,
    search,
    setSearch,
    staleSearch,
    submitSearchTitle,
    deleteHandler,
    setCurrentPage
  } = useDataTable({
    dataQueryKey: 'comments',
    dataQueryFn: ({ search, currentPage, token }) => {
      return getAllComments({ search, page: currentPage, token })
    },
    mutateDeleteFn: ({ slug, token }) => {
      return deleteComment({ commentId: slug, token })
    },
    deleteMessage: 'Delete comment successfully'
  })
  const updateCommentMutation = useMutation({
    mutationFn: ({ check, commentId, token }) => updateComment({ check, commentId, token }),
    onSuccess: () => {
      queryClient.invalidateQueries('comments')
      toast.success('Comment updated successfully')
    },
    onError: () => {
      toast.error('Update check comment failed')
    }
  })
  const updateCommentHandler = ({ check, commentId }) => {
    updateCommentMutation.mutate({ check, commentId, token: userState?.userInfo?.token })
  }
  return (
    <DataTable
      pageTitle={'Manage Comments'}
      title={'Comments'}
      submitSearchTitle={submitSearchTitle}
      search={search}
      setSearch={setSearch}
      tableHeaderTitleList={['Author', 'Comment', 'In response to', 'Created at', '']}
      data={commentsData}
      staleSearch={staleSearch}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    >
      {commentsData.data?.data?.map((comment) => (
        <tr key={comment._id}>
          <td className="p-4 gap-2 border-gray-200 border-b text-sm">
            <div className="flex gap-3 items-center justify-start">
              <div className="w-10 h-10 rounded-full  overflow-hidden">
                <img
                  className="object-cover object-center w-full h-full"
                  src={`${comment?.user.avatar ? stables.UPLOAD_FOLDER_BASE_URL + comment?.user.avatar : SampleImg}`}
                  alt=""
                />
              </div>
              <p className="flex-1 ">{comment?.user.name}</p>
            </div>
          </td>
          <td className="p-4 border-gray-200 border-b text-sm">
            <span className="block">
              {comment?.replyOnUser?._id ? 'In reply to ' : ''}
              <Link
                className="text-blue-400 hover:text-blue-500"
                to={`/blog/${comment?.post?.slug}/#comment-${comment?._id}`}
              >
                {comment?.replyOnUser?.name}
              </Link>
            </span>
            <p>
              <span className="text-[#862bcc]">Desc:</span> {comment.desc}
            </p>
          </td>
          <td className="p-4 border-gray-200 border-b text-sm">
            <Link className="text-blue-400 hover:text-blue-500" to={`/blog/${comment?.post?.slug}`}>
              {comment?.post?.title}
            </Link>
          </td>
          <td className="p-4 border-gray-200 border-b text-sm">
            <p>
              {new Date(comment.createdAt).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                minute: '2-digit'
              })}
            </p>
          </td>
          <td className="p-4 border-gray-200 border-b text-sm">
            <button
              className={`mr-3 ${
                comment.checked ? 'text-yellow-400 hover:text-yellow-600' : 'text-green-400 hover:text-green-600'
              }`}
              onClick={() => updateCommentHandler({ check: !comment.checked, commentId: comment._id })}
            >
              {comment.checked ? 'Unapproved' : 'Approve'}
            </button>
            <button
              disabled={deleteMutation.isLoading}
              className=" text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={() => {
                deleteHandler({ slug: comment._id, token: userState.userInfo?.token })
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </DataTable>
  )
}

export default Comments
