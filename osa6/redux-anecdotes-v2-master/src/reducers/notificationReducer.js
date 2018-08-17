
export const newNotification = (notification) => {
    return{
        type: 'NEW_NOTIFICATION',
        notification
    }
}

export const removeNotification = () => {
    return{
        type: 'NEW_NOTIFICATION',
        notification: ''
    }
}

const notificationReducer = (state = 'TerveTullo', action) => {
  switch(action.type){
    case 'NEW_NOTIFICATION':
        return action.notification
        
    default:
        return state
    }
}

export default notificationReducer