import { createStore } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import { combineReducers } from 'redux'
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'


const reducers = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  contentFilter: filterReducer
})

const store = createStore(
  reducers,
  applyMiddleware(thunk)
)

export default store