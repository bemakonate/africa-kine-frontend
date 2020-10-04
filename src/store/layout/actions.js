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


export const setProductModalData = ({ props }) => {
    return {
        type: actionTypes.SET_PRODUCT_MODAL_DATA,
        payload: {
            props
        }
    }
}

