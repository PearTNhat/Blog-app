/* eslint-disable no-console */
import { useState } from 'react'
import CommentFrom from './CommentFrom'
import Comment from './Comment'
import { createComment, deleteComment, updateComment } from '~/services/comment'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
function CommentsContainer({ className, user, comments, currentSlugPost }) {
  const queryClient = useQueryClient()
  // to show the form to reply or edit comment
  const [affectedComment, setAffectedComment] = useState(null)
  const createCommentMutation = useMutation({
    mutationFn: ({ desc, slug, parentId, replyOnUser }) => createComment({ desc, slug, parentId, replyOnUser, token: user?.token }),
    onSuccess: () => {
      queryClient.invalidateQueries(['blog', currentSlugPost])
      toast.success('Your comment is sent successfully')
      setAffectedComment(null)
    },
    onError: () => {
      toast.error('Created comment failed')
    }
  })
  const updateCommentMutation = useMutation({
    mutationFn: ({ desc, commentId, token }) => updateComment({ desc, commentId, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(['blog', currentSlugPost])
      toast.success('Update comment successfully')
      setAffectedComment(null)
    },
    onError: () => {
      toast.error('Updated comment failed')
    }
  })
  const deleteCommentMutation = useMutation({
    mutationFn: ({ commentId, token }) => deleteComment({ commentId, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(['blog', currentSlugPost])
      toast.success('Delete comment successfully')
      setAffectedComment(null)
    },
    onError: () => {
      toast.error('Delete comment failed')
    }
  })
  const addNewComment = ({ value, parentId = null, replyOnUser = null }) => {
    try {
      if (!user?.token) return toast.error('You need to login to comment')
      createCommentMutation.mutate({ desc: value, slug: currentSlugPost, parentId, replyOnUser })
    } catch (error) {
      console.log(error)
    }
  }
  const updateCommentHandler = (value, id) => {
    try {
      updateCommentMutation.mutate({ desc: value, commentId: id, token: user?.token })
    } catch (error) {
      console.log(error)
    }
  }
  const deleteCommentHandler = (commentId) => {
    try {
      deleteCommentMutation.mutate({ commentId, token: user?.token })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className={className}>
      <CommentFrom isLoading={createCommentMutation.isLoading} btnLabel={'Send'} formSubmitHandler={(value) => addNewComment({ value })} />
      <p className='text-3xl animate-pul'>All comments ({comments?.length})</p>
      {comments?.map((comment) => (
        <Comment key={comment._id}
          comment={comment}
          userLogin={user}
          isLoading={createCommentMutation.isLoading}
          affectedComment={affectedComment}
          setAffectedComment={setAffectedComment}
          addComment={addNewComment}
          updateComment={updateCommentHandler}
          deleteComment={deleteCommentHandler}
          replies={comment.replies}
        />
      ))
      }
    </div>
  )
}

export default CommentsContainer
