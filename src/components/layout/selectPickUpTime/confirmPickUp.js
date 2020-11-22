import React from 'react';
import moment from 'moment';
import { useRouter } from 'next/router'
import axios from 'axios';
import { connect } from 'react-redux';
import * as orderActions from '../../../store/order/actions';
import * as asyncActions from ''



const ConfirmPickUp = ({ pickUpConfig, ...props }) => {
    const dateJSX = moment(pickUpConfig.pickUpTime).format('ll');
    const pickUpTimeJSX = moment(pickUpConfig.pickUpTime).format('h:mm a');
    const preOrderTimeJSX = moment(pickUpConfig.preOrderTime).format('h:mm a');
    const router = useRouter();

    const moveToOrderingPage = async ({ pickUpConfig }) => {
        const res = await axios.get(`http://localhost:1337/restaurant-settings/business-hours/is-pickup-valid?_pickUpTime=${pickUpConfig.pickUpTime}`);


        const { isValid } = res.data;

        if (isValid) {
            //Redirect user to ordering page
            props.setPickUpTime(pickUpConfig.pickUpTime);
            router.push('/ordering/menu');

        } else {
            //alert user that pick up time is not valid
            alert("Please try another pick up time, this pick up time does not exist")
        }
    }

    if (pickUpConfig) {
        return (
            <div>
                <p>Date - {dateJSX}</p>
                <p>Approx Pickup Time: {pickUpTimeJSX}</p>
                <p>Order Must be placed by: {preOrderTimeJSX}</p>

                <button onClick={() => moveToOrderingPage({ pickUpConfig })}>Continue</button>
            </div>
        );
    }
    return null;
}

const mapDispatchToProps = dispatch => {
    return {
        setPickUpTime: (pickUpTime) => dispatch(orderActions.setPickUpTime(pickUpTime)),
    }

}

export default connect(null, mapDispatchToProps)(ConfirmPickUp);