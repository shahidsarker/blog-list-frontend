import React from 'react'
import PropTypes from 'prop-types'

const Comments = ({ comments }) => {
  return (
    <>
      <h4>Comments</h4>
      <p>Comments form</p>
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
