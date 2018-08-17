import { createStore } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import { combineReducers } from 'redux'


const reducers = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  contentFilter: filterReducer
})

const store = createStore(reducers)

export default store