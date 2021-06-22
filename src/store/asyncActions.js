import * as layoutActions from './layout/actions';

const openProductModal = (data) => {
    return async (dispatch) => {
        await dispatch(layoutActions.setProductModalData(data));
        dispatch(layoutActions.openProductModal());
    }
}


export {
    openProductModal,
};