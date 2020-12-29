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

export const updateIsUserOrderBeingProcessed = (isUserOrderBeingProcessed) => {
    localStorage.setItem('isUserOrderBeingProcessed', isUserOrderBeingProcessed);
    return {
        type: actionTypes.UPDATE_IS_USER_ORDER_BEING_PROCESSED,
        payload: {
            isUserOrderBeingProcessed,
        }
    }
}

export const updateValidGateway = (isGatewayValid) => {
    return {
        type: actionTypes.UPDATE_VALID_GATEWAY,
        payload: {
            isGatewayValid: isGatewayValid
        }
    }
}

export const setPickUpTimeToApp = (pickUpTime) => {
    localStorage.setItem('pickUpTime', pickUpTime);

    return {
        type: actionTypes.SET_PICKUP_TIME,
        payload: {
            pickUpTime,
        }
    }
}

export const userPickUpExpire = () => {
    localStorage.setItem('pickUpTime', null);
    localStorage.setItem('isUserOrderBeingProcessed', true);

    return {
        type: actionTypes.USER_PICKUP_EXPIRE,
    }
}

export const setExpiringDate = (value) => {
    return {
        type: actionTypes.SET_EXPIRING_DATE,
        payload: { value }
    }
}

