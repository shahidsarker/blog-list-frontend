import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Comments = ({ comments, createComment }) => {
  const [comment, setComment] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    createComment(comment)
    setComment('')
  }

  return (
    <>
      <h4>Comments</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {comments.length ? (
        <ul>
          {comments.map((comment, idx) => (
            <li key={idx}>{comment}</li>
          ))}
        </ul>
      ) : (
        'No comments yet'
      )}
    </>
  )
}

Comments.propTypes = { comments: PropTypes.shape(PropTypes.string) }

export default Comments
