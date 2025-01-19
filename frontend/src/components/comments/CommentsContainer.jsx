import React from 'react'
import { getCommentsData } from '../../data/comments'
import CommentForm from './CommentForm'
import { useState } from 'react'
import { useEffect } from 'react'
import Comment from './Comment'

const CommentsContainer = ({ className, loggedInUserId }) => {
  const [comments, setComments] = useState([])
  const mainComments = comments.filter(comment => comment.parent === null)
  const [affectedComment, setAffectedComment] = useState(null)


  useEffect(() => {
    async function fetchComments(params) {
      const commentData = await getCommentsData()
      setComments(commentData)
    }
    fetchComments()
  }, [])

  const addCommentHandler = (value, parent = null, replayOnUser = null) => {
    const newComment = {
      _id: Math.random().toString(),
      user: {
        _id: 'a',
        name: 'Mohammad Rezaii',
      },
      desc: value,
      post: '1',
      parent: parent,
      replyOnUser: replayOnUser,
      createdAt: new Date().toISOString(),
    }
    setComments(curState => {
      return [...curState, newComment]
    })
    setAffectedComment(null)
  }
  const editCommentHandler = (value, commentId) => {
    const updatedComments = comments.map(comment => {
      if (comment._id === commentId) {
        return { ...comment, desc: value }
      }
      return comment
    })
    setComments(updatedComments)
    setAffectedComment(null)
  }
  const deleteCommentHandler = commentId => {
    const updatedComments = comments.filter(comment => {
      return comment._id !== commentId
    })
    setComments(updatedComments)
  }
  const getRepliesHandler = commentId => {
    return comments
      .filter(comment => comment.parent === commentId)
      .sort((a, b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      })
  }
  return (
    <div className={`${className}`}>
      <CommentForm
        btnLabel='Send'
        formSubmitHandler={value => addCommentHandler(value)}
      />
      <h2 className='font-bold text-dark-hard my-5 font-roboto text-xl'>
        All Comments ({mainComments.length})
      </h2>
      <div className='space-y-4 mt-8'>
        {mainComments.map(comment => (
          <Comment
            key={comment._id}
            commentData={comment}
            loggedInUserId={loggedInUserId}
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            addComment={addCommentHandler}
            editComment={editCommentHandler}
            deleteComment={deleteCommentHandler}
            replies={getRepliesHandler(comment._id)}
          />
        ))}
      </div>
    </div>
  )
}

export default CommentsContainer
