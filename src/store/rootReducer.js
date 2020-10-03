import orderReducer from './order/reducer';
import layoutReducer from './layout/reducer';
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    order: orderReducer,
    layout: layoutReducer,
})

export default rootReducer;