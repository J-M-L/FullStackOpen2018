export const notify = (notification) => {
  return async (dispatcher) => {
    dispatcher({
      type: 'NEW_NOTIFICATION',
      notification
    })
    await setTimeout(() => {
      dispatcher({
        type: 'NEW_NOTIFICATION',
        notification: null
      })
    }, 3000)
  }
}

const notificationReducer = (state='Tervetuloa!', action) => {
  switch(action.type){
  case 'NEW_NOTIFICATION':
    return action.notification
  default:
    return state
  }
}

export default notificationReducer