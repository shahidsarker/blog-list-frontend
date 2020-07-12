import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'

const User = ({ match }) => {
  const dispatch = useDispatch()
  const users = useSelector((s) => s.users)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const user = users ? users.find((u) => u.id === match.params.id) : null

  if (!user) return null

  const blogList = (
    <>
      <h4>added blogs</h4>
      {user.blogs.length ? (
        <ul>
          {user.blogs.map((b) => (
            <li key={b.id}>{b.title}</li>
          ))}
        </ul>
      ) : (
        <p>No blogs added</p>
      )}
    </>
  )

  return (
    <>
      <h2>{user.name}</h2>
      {blogList}
    </>
  )
}

export default User
