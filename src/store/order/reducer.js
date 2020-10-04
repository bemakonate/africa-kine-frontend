import { updatedObj } from '../../constants/helpers';
import * as actionTypes from './actionTypes';

const initialState = {
    cart: [],
}

const addToCart = (state, action) => updatedObj(state, {
    cart: state.cart.concat(action.payload.cartItem)
})

const removeFromCart = (state, action) => updatedObj(state, {
    cart: state.cart.filter((cartItem, index) => index !== action.payload.index)
})

const editCartItem = (state, action) => updatedObj(state, {
    cart: state.cart.map((cartItem, index) => {
        if (index === action.payload.index) {
            return action.payload.newCartItem;
        }
        return cartItem
    })
})


const updateUserCart = (state, action) => updatedObj(state, {
    cart: action.payload.newCart,
})

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART: return addToCart(state, action);
        case actionTypes.REMOVE_FROM_CART: return removeFromCart(state, action);
        case actionTypes.EDIT_CART_ITEM: return editCartItem(state, action);
        case actionTypes.UPDATE_USER_CART: return updateUserCart(state, action);
        default:
            return state
    }
}

export default reducer;