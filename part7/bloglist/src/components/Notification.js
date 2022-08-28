import { useSelector } from 'react-redux'

import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification === null || notification.message === null) {
    return null
  }
  return (
    <Alert variant= {(notification.isError) ? 'error' : 'success'}>
      {notification.message}
    </Alert>
  )
}

export default Notification