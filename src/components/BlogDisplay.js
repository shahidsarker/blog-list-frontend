import React from 'react'
import Toggleable from './Toggleable'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogDisplay = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  const handleCreateBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(blogObject))

      dispatch(
        setNotification({
          type: 'success',
          text: `new blog ${blogObject.title} by ${blogObject.author} added`,
        })
      )
    } catch (exception) {
      console.log('new blog unsuccessful')
    }
  }

  const blogFormRef = React.createRef()

  const blogForm = () => (
    <Toggleable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={handleCreateBlog} />
    </Toggleable>
  )

  return (
    <>
      {blogForm()}
      <div id="blog-list">
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default BlogDisplay
