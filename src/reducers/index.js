import { combineReducers } from 'redux'
import userReducer from './userReducer'
import dataReducer from './dataReducer'

export default combineReducers({
    userReducer: userReducer,
    dataReducer: dataReducer
})