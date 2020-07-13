import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, likeBlog } from '../reducers/blogReducer'

const BlogView = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  console.log(id)
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blog = blogs.find((b) => b.id === id)

  const updateBlog = (id, updatedObj) => {
    try {
      dispatch(likeBlog(id, updatedObj))
    } catch (exception) {
      console.log('blog update unsuccessful')
    }
  }

  const handleLike = (e) => {
    e.preventDefault()
    updateBlog(blog.id, { likes: blog.likes + 1 })
  }

  if (!blog) return null
  return (
    <>
      <div className="blog">
        <h3 className="blog-title">{blog.title}</h3>
        <h6 className="blog-author">{blog.author}</h6>
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
        <button
          className="remove-blog-button"
          onClick={console.log('handleDelete')}
        >
          remove
        </button>
      </div>
    </>
  )
}

export default BlogView
