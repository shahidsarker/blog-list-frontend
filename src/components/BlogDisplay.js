import React from 'react'
import Toggleable from './Toggleable'
import BlogForm from './BlogForm'
import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog, likeBlog, removeBlog } from '../reducers/blogReducer'
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

  const handleLikeBlog = (id, updatedObj) => {
    try {
      dispatch(likeBlog(id, updatedObj))
    } catch (exception) {
      console.log('blog update unsuccessful')
    }
  }

  const handleDeleteBlog = async (id) => {
    try {
      dispatch(removeBlog(id))
    } catch (exception) {
      console.log('error deleting')
    }
  }

  return (
    <>
      {blogForm()}
      <div id="blog-list">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={handleLikeBlog}
            deleteBlog={handleDeleteBlog}
          />
        ))}
      </div>
    </>
  )
}

export default BlogDisplay
