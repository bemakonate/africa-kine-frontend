import * as layoutActions from './layout/actions';
import * as orderActions from './order/actions';
import { getPopulatedCart } from '../constants/helpers/cart-helpers';
import axios from 'axios';

const openProductModal = (data) => {
    return async (dispatch) => {
        await dispatch(layoutActions.setProductModalData(data));
        dispatch(layoutActions.openProductModal());
    }
}


const getUserCart = (allProducts) => {
    return async (dispatch, getState) => {
        const savedCart = JSON.parse(localStorage.getItem('cart'));

        if (savedCart) {
            await dispatch(orderActions.updateUserCart(savedCart));
            await dispatch(orderActions.fetchUserCartDone())
        }

    }
}


const cancelUserOrder = ({ router }) => {
    return async (dispatch, getState) => {
        await dispatch(orderActions.updateIsUserOrderBeingProcessed(false));
        dispatch(orderActions.updateValidGateway(false));
        dispatch(orderActions.clearCart());
        dispatch(orderActions.setPickUpTimeToApp(null));
        router.push('/ordering');
    }
}

const validateUserOrder = ({ router, confirmPageData }) => {
    console.log('[asyncActions.js] confirmPageData', confirmPageData);
    return async (dispatch, getState) => {
        const pickUpTime = localStorage.getItem('pickUpTime') || 0;
        const isUserOrderBeingProcessed = JSON.parse(localStorage.getItem('isUserOrderBeingProcessed'));


        const res = await axios.get(`http://localhost:1337/restaurant-settings/business-hours/is-pickup-valid`, {
            params: { _pickUpTime: pickUpTime }
        })

        if (!isUserOrderBeingProcessed) {
            //redirect user to default ordering page
            //clear the user ordering data
            dispatch(orderActions.updateValidGateway(false));
            dispatch(orderActions.clearCart());
            dispatch(orderActions.setPickUpTimeToApp(null));
            // !confirmPageData && router.push('/ordering');
            return null;
        }



        if (!res.data.isValid && isUserOrderBeingProcessed) {
            //redirect user to the ordering menu page and force reschedule
            dispatch(orderActions.userPickUpExpire());
            router.push('/ordering/menu')
            return null;
        }


        //User is in ordering phase and has a valid pickUpTime
        dispatch(orderActions.updateValidGateway(true));
        dispatch(orderActions.updateIsUserOrderBeingProcessed(true));
        dispatch(orderActions.setPickUpTimeToApp(pickUpTime));
        dispatch(orderActions.setExpiringDate(res.data.pickUpExpiringTime));
        router.push('/ordering/menu');



        //Once user pickUpTime expire force user to choose a new pick up date
        const expiresIn = res.data.pickUpExpiringTime - Date.now();

        return setTimeout(() => {
            dispatch(orderActions.userPickUpExpire());
            if (isUserOrderBeingProcessed) {
                router.push('/ordering/menu')
            }
        }, expiresIn);

    }

}


export { openProductModal, validateUserOrder, getUserCart, cancelUserOrder };