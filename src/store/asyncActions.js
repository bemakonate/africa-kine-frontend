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

                //If the product still exist in the database
                if (foundProduct) {
                    //Make sure each selected side order still exit in the database
                    const newSelectedSideOrders = savedItem.selectedSideProducts.map(savedSelectedSideProduct => {
                        const foundSideProduct =
                            foundProduct.sideProducts.find(sideProduct => sideProduct.id === savedSelectedSideProduct.data.id);

                        //if you can't find the side order make sure to let the user know
                        if (!foundSideProduct && !savedSelectedSideProduct.data.valid) {
                            return {
                                ...savedSelectedSideProduct,
                                data: {
                                    name: 'No longer available please change',
                                    valid: false,
                                }
                            }
                        }

                        //Check to see if side order is available at current day
                        return {
                            ...savedSelectedSideProduct,
                            data: foundSideProduct,
                        };
                    })
                    newCart.push({
                        ...savedItem,
                        product: foundProduct,
                        selectedSideOrders: newSelectedSideOrders
                    });
                }
            });

            await dispatch(orderActions.updateUserCart(newCart));
            await dispatch(orderActions.fetchUserCartDone())
        } else {
            await dispatch(orderActions.updateUserCart(newCart))
            await dispatch(orderActions.fetchUserCartDone())
        }

    }
}