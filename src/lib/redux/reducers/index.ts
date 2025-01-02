import { combineReducers } from 'redux'
import userReducer from './userState'
import messageReducer from './message'
import groupReducer from './group'

const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
  group: groupReducer
})

export default rootReducer
