import layoutReducer from './layout/reducer';
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    layout: layoutReducer,
})

export default rootReducer;