import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
import BlogList from './BlogList'

const User = ({ match }) => {
  const dispatch = useDispatch()
  const users = useSelector((s) => s.users)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const user = users ? users.find((u) => u.id === match.params.id) : null

  if (!user) return null

  return (
    <>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      {<BlogList blogs={user.blogs} />}
    </>
  )
}

export default User
