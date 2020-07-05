import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  const setBlogs = (args) => console.log(...args)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      setMessage({ type: 'success', text: `Welcome ${user.name}` })
      setTimeout(() => {
        setMessage('')
      }, 5000)
    } catch (exception) {
      setMessage({ type: 'error', text: 'wrong credentials' })
      setTimeout(() => {
        setMessage('')
      }, 5000)
      console.log('Wrong credentials')
    }
  }

  const handleLogout = async (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    blogService.setToken(null)
    setUser(null)

    setMessage({ type: 'success', text: 'logged out' })
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            id="username"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            id="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )

  const handleCreateBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(blogObject))

      setMessage({
        type: 'success',
        text: `new blog ${blogObject.title} by ${blogObject.author} added`,
      })
      setTimeout(() => {
        setMessage('')
      }, 5000)
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

  const handleLikeBlog = async (id, updatedObj) => {
    try {
      const updatedBlog = await blogService.update(id, updatedObj)
      const newBlogs = await blogs
        .map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
        .sort((a, b) => b.likes - a.likes)

      setBlogs(newBlogs)
    } catch (exception) {
      console.log('blog update unsuccessful')
    }
  }

  const handleDeleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      const updatedBlogs = blogs.filter((b) => b.id !== id)
      setBlogs(updatedBlogs)
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
      <Notification message={message} />
      {user === null ? loginForm() : blogDisplay()}
    </div>
  )
}

export default App
