import { updatedObj } from '../../constants/helpers';
import * as actionTypes from './actionTypes';

const initialState = {
    cart: [],
    fetchingUserCart: true,
    pickUpTime: null,
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


const fetchUserCartDone = (state, action) => updatedObj(state, {
    fetchingUserCart: false,
})

const updateUserCart = (state, action) => updatedObj(state, {
    cart: action.payload.newCart,
})


const clearCart = (state, action) => updatedObj(state, {
    cart: [],
})

const setPickUpTime = (state, action) => updatedObj(state, {
    pickUpTime: action.payload.pickUpTime,
})

const clearOrderingData = (state, action) => updatedObj(state, {
    cart: [],
    fetchingUserCart: false,
    pickUpTime: null,
})

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART: return addToCart(state, action);
        case actionTypes.REMOVE_FROM_CART: return removeFromCart(state, action);
        case actionTypes.EDIT_CART_ITEM: return editCartItem(state, action);
        case actionTypes.UPDATE_USER_CART: return updateUserCart(state, action);
        case actionTypes.FETCH_USER_CART_DONE: return fetchUserCartDone(state, action);
        case actionTypes.CLEAR_CART: return clearCart(state, action);
        case actionTypes.SET_PICKUP_TIME: return setPickUpTime(state, action);
        case actionTypes.CLEAR_ORDERING_DATA: return clearOrderingData(state, action);
        default:
            return state
    }
}

export default reducer;