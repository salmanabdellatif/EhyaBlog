import React from 'react'
import { FiMessageSquare, FiEdit2, FiTrash } from 'react-icons/fi'
import { images } from '../../constants'
import CommentForm from './CommentForm'

const Comment = ({
  commentData,
  loggedInUserId,
  affectedComment,
  setAffectedComment,
  addComment,
  editComment,
  deleteComment,
  replies,
}) => {
  const isUserLoggedIn = Boolean(loggedInUserId)
  const isCommentBelongsToUser = loggedInUserId === commentData.user._id
  const isReplying =
    affectedComment &&
    affectedComment.type === 'replying' &&
    affectedComment._id === commentData._id
  const isEditing =
    affectedComment &&
    affectedComment.type === 'editing' &&
    affectedComment._id === commentData._id

  const parentCommentId = commentData._id || null
  const replyOnUserId = commentData.user._id || null
  return (
    <div className='flex flex-nowrap items-start gap-x-3 bg-[#F2F4F5] p-3 rounded-lg'>
      <img
        src={images.PostProfile}
        alt='avatar'
        className='w-9 h-9 object-cover rounded-full'
      />
      <div className='flex flex-col flex-1'>
        <h5 className='font-bold text-dark-hard text-xs'>
          {commentData.user.name}
        </h5>
        <span className='text-dark-light text-xs font-light mt-2'>
          {new Date(commentData.createdAt).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
          })}
        </span>
        <p className='text-dark-light font-opensans mt-[10px]'>
          {commentData.desc}
        </p>
        <div className='flex items-center text-dark-light font-roboto my-3 space-x-4'>
          {isUserLoggedIn && (
            <button
              className='flex items-center space-x-1'
              onClick={() =>
                setAffectedComment({ type: 'replying', _id: commentData._id })
              }>
              <FiMessageSquare className='w-4 h-auto' />
              <span>Replay</span>
            </button>
          )}
          {isCommentBelongsToUser && (
            <>
              <button
                className='flex items-center space-x-1'
                onClick={() =>
                  setAffectedComment({ type: 'editing', _id: commentData._id })
                }>
                <FiEdit2 className='w-4 h-auto' />
                <span>Edit</span>
              </button>
              <button
                className='flex items-center space-x-1'
                onClick={() => deleteComment(commentData._id)}>
                <FiTrash className='w-4 h-auto' />
                <span>Delete</span>
              </button>
            </>
          )}
        </div>
        {isReplying && (
          <CommentForm
            btnLabel='Reply'
            formSubmitHandler={value =>
              addComment(value, parentCommentId, replyOnUserId)
            }
            formCancelHandler={() => setAffectedComment(null)}
          />
        )}
        {isEditing && (
          <CommentForm
            btnLabel='Update'
            formSubmitHandler={value => editComment(value, commentData._id)}
            formCancelHandler={() => setAffectedComment(null)}
            initialText={commentData.desc}
          />
        )}
        {replies.length > 0 && (
          <div>
            {replies.map(reply => (
              <Comment
                key={reply._id}
                commentData={reply}
                addComment={addComment}
                affectedComment={affectedComment}
                setAffectedComment={setAffectedComment}
                editComment={editComment}
                deleteComment={deleteComment}
                loggedInUserId={loggedInUserId}
                replies={[]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Comment
