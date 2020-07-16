import React, { useEffect } from 'react'
import Notification from './components/Notification'
import Users from './components/Users'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import Login from './components/Login'
import BlogDisplay from './components/BlogDisplay'
import { Switch, Route } from 'react-router-dom'
import User from './components/User'
import Blog from './components/Blog'
import Navigation from './components/Navigation'
import { Container } from '@material-ui/core'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])

  return (
    <Container>
      <Navigation />

      <Notification message={notification} />
      <h1>Blog App</h1>

      {user === null ? (
        <Login />
      ) : (
        <>
          <Switch>
            <Route path="/users/:id" component={User} />
            <Route path="/users" component={Users} />
            <Route path="/blogs/:id" component={Blog} />
            <Route path="/" component={BlogDisplay} />
          </Switch>
        </>
      )}
    </Container>
  )
}

export default App
