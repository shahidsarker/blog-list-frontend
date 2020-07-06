import React, { useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  removeBlog,
} from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { initializeUser, logoutUser } from './reducers/userReducer'
import Login from './components/Login'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const notification = useSelector((state) => state.notification)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])

  const handleLogout = async (e) => {
    e.preventDefault()
    dispatch(logoutUser())
  }

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
    // send three fields as post request via create service
    // update state
    // clear old values from state
    // use response to update blogs state by concat
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

  const blogDisplay = () => (
    <>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

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

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />
      {user === null ? <Login /> : blogDisplay()}
    </div>
  )
}

export default App
