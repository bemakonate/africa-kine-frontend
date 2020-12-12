import { updatedObj } from '../../constants/helpers';
import * as actionTypes from './actionTypes';

const initialState = {
    isProductModalOpen: false,
    isCartComponentOpen: false,
    productModalData: {
        props: null,
    },
    confirmOrderPageData: null,
}

const openProductModal = (state, action) => updatedObj(state, {
    isProductModalOpen: true
})

const closeProductModal = (state, action) => updatedObj(state, {
    isProductModalOpen: false,
    productModalItem: null,
})


const setProductModalData = (state, action) => updatedObj(state, {
    productModalData: updatedObj(state.productModalData, { props: action.payload.props })
})

const addConfirmOrderPageData = (state, action) => updatedObj(state, {
    confirmOrderPageData: action.payload.data,
})

const updateIsCartComponentOpen = (state, action) => updatedObj(state, { isCartComponentOpen: action.payload.value });

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.OPEN_PRODUCT_MODAL: return openProductModal(state, action);
        case actionTypes.CLOSE_PRODUCT_MODAL: return closeProductModal(state, action);
        case actionTypes.SET_PRODUCT_MODAL_DATA: return setProductModalData(state, action);
        case actionTypes.ADD_CONFIRM_ORDER_DATA: return addConfirmOrderPageData(state, action);
        case actionTypes.ADD_CONFIRM_ORDER_DATA: return addConfirmOrderPageData(state, action);
        case actionTypes.UPDATE_IS_CART_COMPONENT_OPEN: return updateIsCartComponentOpen(state, action);
        default:
            return state
    }
}
export default reducer;