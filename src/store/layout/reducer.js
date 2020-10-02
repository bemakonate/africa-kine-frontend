import { updatedObj } from '../../constants/helpers';
import * as actionTypes from './actionTypes';

const initialState = {
    isProductModalOpen: false,
    productModalItem: null,
}

const openProductModal = (state, action) => updatedObj(state, {
    isProductModalOpen: true
})

const closeProductModal = (state, action) => updatedObj(state, {
    isProductModalOpen: false,
    productModalItem: null,
})


const setProductModalItem = (state, action) => updatedObj(state, {
    productModalItem: action.payload.product
})

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.OPEN_PRODUCT_MODAL: return openProductModal(state, action);
        case actionTypes.CLOSE_PRODUCT_MODAL: return closeProductModal(state, action);
        case actionTypes.SET_PRODUCT_MODAL_ITEM: return setProductModalItem(state, action);

        default:
            return state
    }
}
export default reducer;