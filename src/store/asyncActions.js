import * as layoutActions from './layout/actions';
import axios from 'axios';

const openProductModal = (data) => {
    return async (dispatch) => {
        await dispatch(layoutActions.setProductModalData(data));
        dispatch(layoutActions.openProductModal());
    }
}


export {
    openProductModal,
};