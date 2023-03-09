import {combineReducers} from 'redux'
import authReducer from './authSlice'
const rootReducer = combineReducers({
  auths:authReducer
})

export default rootReducer