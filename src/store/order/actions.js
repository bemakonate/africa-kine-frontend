import * as actionTypes from './actionTypes';

export const addToCart = (cartItem) => {
    return {
        type: actionTypes.ADD_TO_CART,
        payload: { cartItem }
    }
}

export const removeFromCart = (index) => {
    return {
        type: actionTypes.REMOVE_FROM_CART,
        payload: { index }
    }
}

export const editCartItem = ({ index, newCartItem }) => {
    return {
        type: actionTypes.EDIT_CART_ITEM,
        payload: {
            index,
            newCartItem
        }
    }
}

export const fetchUserCartDone = () => {
    return {
        type: actionTypes.FETCH_USER_CART_DONE,
    }
}

export const updateUserCart = (newCart) => {
    return {
        type: actionTypes.UPDATE_USER_CART,
        payload: {
            newCart
        }
    }
}

export const clearCart = () => {
    return {
        type: actionTypes.CLEAR_CART,
    }
}