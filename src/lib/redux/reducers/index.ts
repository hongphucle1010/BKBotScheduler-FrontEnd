import { combineReducers } from 'redux'
import userReducer from './userState'
import messageReducer from './message'

const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer
})

export default rootReducer
