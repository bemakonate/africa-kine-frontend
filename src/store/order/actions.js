import * as actionTypes from './actionTypes';

export const addToCart = (cartItem) => {
    return {
        type: actionTypes.ADD_TO_CART,
        payload: { cartItem }
    }
}