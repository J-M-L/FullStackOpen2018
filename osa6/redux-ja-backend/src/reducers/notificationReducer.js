/* eslint-disable */

export const notify = (notification, showTime) => {
    return async (dispatcher) => {
        dispatcher({
            type:'NEW_NOTIFICATION',
            notification
        })
        await setTimeout(() => {
            dispatcher({
                type:'NEW_NOTIFICATION',
                notification: ''
            })
        }, showTime * 1000)
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