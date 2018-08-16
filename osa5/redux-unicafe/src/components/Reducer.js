const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }
  
const reviewReducer = (state = initialState, action) => { 
    let newState = {...state}

    switch (action.type) {
      case 'GOOD':
        newState['good'] += 1
        return newState
      case 'OK':
        newState['ok'] += 1
        return newState
      case 'BAD':
        newState['bad'] += 1
        return newState
      case 'ZERO':        
        state = initialState
        return state
      default:
        return state
    }
}

export default reviewReducer