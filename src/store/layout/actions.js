import * as actionTypes from './actionTypes';

export const openProductModal = () => {
    return {
        type: actionTypes.OPEN_PRODUCT_MODAL,
    }
}

export const closeProductModal = () => {
    return {
        type: actionTypes.CLOSE_PRODUCT_MODAL,
    }
}

export const setProductModalItem = ({ product }) => {
    return {
        type: actionTypes.SET_PRODUCT_MODAL_ITEM,
        payload: {
            product
        }
    }
}

