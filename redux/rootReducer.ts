import { combineReducers } from '@reduxjs/toolkit'
import meditationReducer from './meditationSlice'
import authReducer from './authSlice'

const rootReducer = combineReducers({
  meditation: meditationReducer,
  auth: authReducer
})

export default rootReducer
