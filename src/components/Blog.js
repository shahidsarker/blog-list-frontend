import React, { useEffect } from 'react'
import './Blog.css'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  initializeBlogs,
  likeBlog,
  removeBlog,
  newComment,
} from '../reducers/blogReducer'
import Comments from './Comments'

const Blog = ({ history }) => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blog = blogs.find((b) => b.id === id)
  if (!blog) return null

  const handleLike = (e) => {
    e.preventDefault()
    try {
      dispatch(likeBlog(blog.id, { likes: blog.likes + 1 }))
    } catch (e) {
      console.log('blog update unsuccessful')
    }
  }

  const handleDelete = (e) => {
    e.preventDefault()
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog.id))
      history.push('/')
    }
  }

  const removeButton = () =>
    blog.user && user.username === blog.user.username ? (
      <button className="remove-blog-button" onClick={handleDelete}>
        remove
      </button>
    ) : null

  const createComment = (comment) => {
    try {
      dispatch(newComment(blog.id, comment))
    } catch (e) {
      console.log('new comment unsuccessful')
    }
  }

  return (
    <>
      <div className="blog">
        <h3 className="blog-title">{blog.title}</h3>
        <p className="blog-author">{blog.author}</p>
        <a href={blog.url} className="blog-url">
          {blog.url}
        </a>
        <div className="blog-likes">
          likes {blog.likes}
          <button onClick={handleLike} className="blog-like-button">
            like
          </button>
        </div>
        {blog.user && (
          <div className="blog-user">added by {blog.user.name}</div>
        )}
        {removeButton()}

        <Comments comments={blog.comments} createComment={createComment} />
      </div>
    </>
  )
}

export default Blog
