import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return <div className={`notification ${message.type}`}>{message.text}</div>
}

Notification.propTypes = {
  message: PropTypes.shape({ type: PropTypes.string, text: PropTypes.string }),
}

export default Notification
