import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const User = ({ match }) => {
  const users = useSelector((s) => s.users)

  const user = users.find((u) => u.id === match.params.id)

  console.log(match, user)
  if (!user) return null
  return (
    <>
      <h3>User page</h3>
      {user.name}
    </>
  )
}

export default User
