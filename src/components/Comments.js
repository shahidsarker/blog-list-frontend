import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { TextField, Button } from '@material-ui/core'

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
      <form onSubmit={handleSubmit} className="comment-form">
        <TextField
          type="text"
          name="comment"
          value={comment}
          variant="outlined"
          onChange={({ target }) => setComment(target.value)}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
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
