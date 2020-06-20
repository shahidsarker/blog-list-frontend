import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (e) => {
    e.preventDefault()
    props.createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h3>Create new</h3>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            id="title"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            id="author"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            id="url"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </>
  )
}

BlogForm.propTypes = { createBlog: PropTypes.func.isRequired }

export default BlogForm
