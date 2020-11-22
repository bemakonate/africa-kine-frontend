import * as layoutActions from './layout/actions';
import * as orderActions from './order/actions';
import { getPopulatedCart } from '../constants/helpers/cart-helpers';
import axios from 'axios';

export const openProductModal = (data) => {
    return async (dispatch) => {
        await dispatch(layoutActions.setProductModalData(data));
        dispatch(layoutActions.openProductModal());
    }
}


export const getUserCart = (allProducts) => {
    return async (dispatch, getState) => {
        const savedCart = JSON.parse(localStorage.getItem('cart'));

        if (savedCart) {
            await dispatch(orderActions.updateUserCart(savedCart));
            await dispatch(orderActions.fetchUserCartDone())
        }

    }
}


export const validatePickUpTime = () => {
    return async (dispatch, getState) => {
        const pickUpTime = localStorage.getItem('pickUpTime');

        if (!pickUpTime) {
            //return clear the ordering data
            return dispatch(orderActions.clearOrderingData());
        }

        const res = await axios.get(`http://localhost:1337/restaurant-settings/business-hours/is-pickup-valid`, {
            params: {
                _pickUpTime: pickUpTime,
            }
        })

        if (!res.data.isValid) {
            //return clear ordering data
            return dispatch(orderActions.clearOrderingData());
        }

        const expiresIn = res.data.foundPickUpTime.preOrderTime - Date.now();

        await dispatch(orderActions.setPickUpTime(pickUpTime));
        setTimeout(() => {
            return dispatch(orderActions.clearOrderingData());
        }, 3000);

    }

}