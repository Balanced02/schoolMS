import { combineReducers } from 'redux'

import auth from './auth'
import feedback from './feedback'

export default combineReducers({
  auth,
  feedback,
})
