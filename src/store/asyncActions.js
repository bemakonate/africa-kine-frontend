import * as layoutActions from './layout/actions';

export const openProductModal = ({ product }) => {
    return async (dispatch) => {
        await dispatch(layoutActions.setProductModalItem({ product }));
        dispatch(layoutActions.openProductModal());
    }
}