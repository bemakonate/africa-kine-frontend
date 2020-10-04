import * as layoutActions from './layout/actions';
import * as orderActions from './order/actions';

export const openProductModal = (data) => {
    return async (dispatch) => {
        await dispatch(layoutActions.setProductModalData(data));
        dispatch(layoutActions.openProductModal());
    }
}


export const getUserCart = (allProducts) => {
    return async (dispatch, getState) => {
        const savedCart = JSON.parse(localStorage.getItem('cart'));
        const newCart = [];

        if (savedCart) {
            savedCart.forEach(savedItem => {
                const foundProduct = allProducts.find(itemData => itemData.id === savedItem.product.id);
                if (foundProduct) {
                    newCart.push({ ...savedItem, product: foundProduct });
                }
            });

            await dispatch(orderActions.updateUserCart(newCart));
        } else {
            dispatch(orderActions.updateUserCart(newCart))
        }

    }
}