import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {

  const { notification } = props

  if(notification === null){
    return null
  }
  return(
    <div className='notification'>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification