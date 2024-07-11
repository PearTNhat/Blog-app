import { PostProfile, SampleImg } from '~/assets/image'
import { FaPen } from 'react-icons/fa'
import { FiMessageSquare } from 'react-icons/fi'
import { RxTrash } from 'react-icons/rx'
import CommentFrom from './CommentFrom'
import { stables } from '~/constants/stables'
function Comment({
  comment,
  userLogin,
  affectedComment,
  setAffectedComment,
  addComment,
  updateComment,
  deleteComment,
  replies,
  parentId,
  isLoading
}) {
  const isUserLoginId = Boolean(userLogin?.id)
  const isUserBelongToComment = comment.user._id === userLogin?.id
  const isReplying = affectedComment?.type === 'replying' && affectedComment?.id === comment._id
  const isEditing = affectedComment && affectedComment.type === 'editing' && affectedComment.id === comment._id
  const replyCommentId = parentId ? parentId : comment._id
  const replyOnUser = comment.user._id
  return (
    <div className="mt-4 p-2 flex gap-2 bg-[#F2F4F5] rounded-md" id={`comment-${comment._id}`}>
      <img
        src={comment.user.avatar ? stables.UPLOAD_FOLDER_BASE_URL + comment.user.avatar : SampleImg}
        className="w-9 h-9 rounded-full"
        alt="user-image"
      />
      <div className="text-dark-hard text-xs flex-1">
        <h3 className="text-xs font-bold">{comment.user.name}</h3>
        <span className="text-dark-gray text-xs">
          {new Date(comment.createdAt).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit'
          })}
        </span>
        <p className="my-3 text-dark-gray">
          {!comment.replyOnUser ? (
            ''
          ) : comment.replyOnUser._id === comment?.user._id ? (
            ''
          ) : (
            <span className="text-primary">@{comment?.replyOnUser?.name}</span>
          )}{' '}
          {comment.desc}
        </p>
        <div className="">
          {isUserLoginId && (
            <button
              className="[&:not(:last-child)]:mr-3 text-dark-gray text-xs inline-flex gap-1 items-center"
              onClick={() => setAffectedComment({ type: 'replying', id: comment._id })}
            >
              <FiMessageSquare />
              Reply
            </button>
          )}
          {isUserBelongToComment && (
            <>
              <button
                className="[&:not(:last-child)]:mr-3 text-dark-gray text-xs inline-flex gap-1 items-center"
                onClick={() => setAffectedComment({ type: 'editing', id: comment._id })}
              >
                <FaPen />
                Edit
              </button>
              <button
                className="[&:not(:last-child)]:mr-3 text-dark-gray text-xs inline-flex gap-1 items-center"
                onClick={() => deleteComment(comment._id)}
              >
                <RxTrash />
                Delete
              </button>
            </>
          )}
        </div>
        {isReplying && (
          <CommentFrom
            btnLabel={'Reply'}
            isLoading={isLoading}
            formSubmitHandler={(value) => {
              addComment({ value, parentId: replyCommentId, replyOnUser })
            }}
            formCancelHandler={() => setAffectedComment(null)}
          />
        )}
        {isEditing && (
          <CommentFrom
            btnLabel={'Update'}
            intiValue={comment.desc}
            formSubmitHandler={(value) => updateComment(value, comment._id)}
            formCancelHandler={() => setAffectedComment(null)}
          />
        )}
        {replies.map((reply) => (
          <Comment
            key={reply._id}
            comment={reply}
            userLogin={userLogin}
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            addComment={addComment}
            updateComment={updateComment}
            deleteComment={deleteComment}
            parentId={replyCommentId}
            replies={[]}
          />
        ))}
      </div>
    </div>
  )
}

export default Comment
