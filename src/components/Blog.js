import React, { useState } from 'react'
import './Blog.css'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [expanded, setExpanded] = useState(false)

  const handleToggle = (e) => {
    e.preventDefault()
    setExpanded(!expanded)
  }

  const handleLike = (e) => {
    e.preventDefault()
    updateBlog(blog.id, { likes: blog.likes + 1 })
  }

  const handleDelete = (e) => {
    e.preventDefault()
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  }

  const details = () => {
    if (expanded) {
      return (
        <>
          <div className="blog-url">{blog.url}</div>
          <div className="blog-likes">
            likes {blog.likes}
            <button onClick={handleLike} className="blog-like-button">
              like
            </button>
          </div>
          {blog.user && <div className="blog-user">{blog.user.name}</div>}
          <button className="remove-blog-button" onClick={handleDelete}>
            remove
          </button>
        </>
      )
    }
  }

  return (
    <>
      <div className="blog">
        <span className="blog-title">{blog.title}</span>{' '}
        <span className="blog-author">{blog.author}</span>
        <button onClick={handleToggle} className="blog-toggle">
          {expanded ? 'hide' : 'view'}
        </button>
        {details()}
      </div>
    </>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
  }),
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog
