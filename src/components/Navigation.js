import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

const Navigation = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logoutUser())
  }

  return (
    <nav>
      <NavLink to="/" exact>
        blogs
      </NavLink>
      {user ? (
        <>
          <NavLink to="/users">users</NavLink>
          <span>
            {' '}
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </span>
        </>
      ) : null}
    </nav>
  )
}

export default Navigation
