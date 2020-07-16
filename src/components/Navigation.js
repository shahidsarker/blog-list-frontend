import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'

const Navigation = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logoutUser())
  }

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6">Blogs</Typography>
        <Button component={NavLink} to="/" exact color="inherit">
          blogs
        </Button>
        {user ? (
          <>
            <Button componet={NavLink} color="inherit" to="/users">
              users
            </Button>
            <span>
              {user.name} logged in{' '}
              <Button
                onClick={handleLogout}
                color="secondary"
                variant="contained"
              >
                logout
              </Button>
            </span>
          </>
        ) : null}
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
