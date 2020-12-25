import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notificationMessage = useSelector(state => state.notification.message)
  const notificationType = useSelector(state => state.notification.type)
  if (notificationMessage === null) {
    return null
  }

  return (
    <div className={notificationType}>
      {notificationMessage}
    </div>
  )
}

export default Notification