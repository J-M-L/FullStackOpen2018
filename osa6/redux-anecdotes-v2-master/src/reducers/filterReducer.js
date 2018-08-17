
export const changeFilter = (currentFilter) => {
    return{
        type: 'CHANGE_FILTER',
        currentFilter
    }
}

const filterReducer = (state = '', action) => {
  switch(action.type){
    case 'CHANGE_FILTER':
        return action.currentFilter
        
    default:
        return state
    }
}

export default filterReducer