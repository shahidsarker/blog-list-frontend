import React, { useEffect } from 'react'
import Notification from './components/Notification'
import Users from './components/Users'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logoutUser } from './reducers/userReducer'
import Login from './components/Login'
import BlogDisplay from './components/BlogDisplay'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import User from './components/User'

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

  // const matchUsers = useRouteMatch('/users/:id')

  return (
    <div>
      <Link to="/">
        <h2>blogs</h2>
      </Link>
      <Link to="/users">
        <h2>Users</h2>
      </Link>
      <Notification message={notification} />
      {user === null ? (
        <Login />
      ) : (
        <>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Switch>
            <Route path="/users/:id" component={User} />
            <Route path="/users" component={Users} />
            <Route path="/">
              <BlogDisplay />
            </Route>
          </Switch>
        </>
      )}
    </div>
  )
}

export default App
