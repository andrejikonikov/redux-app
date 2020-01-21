import { combineReducers } from 'redux'

import inputReducer from './input'
import fetchReducer from './fetchReducer'
import fetchCountReducer from './fetchCount'

const reducers = combineReducers({
  inputReducer,
  fetchCountReducer,
  fetchReducer,
})

export default reducers
