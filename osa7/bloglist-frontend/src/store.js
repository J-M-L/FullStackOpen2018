import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'



const reducers = combineReducers({
  notification: notificationReducer,
  user: userReducer,
  blogInfo: blogReducer
})

const store = createStore(
  reducers,
  applyMiddleware(thunk)
)

export default store
