import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const message = useSelector(state => state.notification.message)
  const type = useSelector(state => state.notification.type)

  return (
    <div>
      {(message &&
        <Alert variant={type}>
          {message}
        </Alert>
      )}
    </div>

  )
}

export default Notification