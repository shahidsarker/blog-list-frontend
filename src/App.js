import React, { useEffect } from 'react'
import Notification from './components/Notification'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logoutUser } from './reducers/userReducer'
import Login from './components/Login'
import BlogDisplay from './components/BlogDisplay'

const App = () => {
  const dispatch = useDispatch()
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

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />
      {user === null ? (
        <Login />
      ) : (
        <>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <BlogDisplay />
        </>
      )}
    </div>
  )
}

export default App
