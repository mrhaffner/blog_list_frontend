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

// const Notification = ({ message, messageType }) => {
//   if (message === null) {
//     return null
//   }

//   return (
//     <div className={messageType}>
//       {message}
//     </div>
//   )
// }

export default Notification