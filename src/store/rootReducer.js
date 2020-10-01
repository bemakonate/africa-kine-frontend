// import cartReducer from './cart/reducer';
import layoutReducer from './layout/reducer';
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    // cart: cartReducer,
    layout: layoutReducer,
})

export default rootReducer;