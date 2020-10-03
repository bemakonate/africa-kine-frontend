import { updatedObj } from '../../constants/helpers';
import * as actionTypes from './actionTypes';

const initialState = {
    cart: [],
}

const addToCart = (state, action) => updatedObj(state, {
    cart: state.cart.concat(action.payload.cartItem)
})

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART: return addToCart(state, action);
        default:
            return state
    }
}

export default reducer;