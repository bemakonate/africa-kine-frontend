import React, { useState } from 'react';
import FirstStage from './firstStage';
import ConfirmPickUp from './confirmPickUp';
import SelectLaterPickup from './selectLaterPickUp';
import { connect } from 'react-redux';
import * as asyncActions from '../../../store/asyncActions';
import * as orderActions from '../../../store/order/actions';
import { useRouter } from 'next/router'
import Link from 'next/link';

const SelectPickUpTime = (props) => {
    const [currentStage, setCurrentStage] = useState(1);
    const [pickUpData, setPickUpData] = useState(null);
    const router = useRouter();


    const updatePickUp = async (pickUpProp) => {
        setPickUpData(pickUpProp);
        setCurrentStage(3);
    }


    const openLaterPickUp = async () => {
        setCurrentStage(2.1);
    }

    let selectPickUpJSX = null;
    switch (currentStage) {
        case 2.1:
            selectPickUpJSX = <SelectLaterPickup updatePickUp={updatePickUp} setCurrentStage={setCurrentStage} />;
            break;
        case 3:
            selectPickUpJSX = <ConfirmPickUp pickUpConfig={pickUpData} setCurrentStage={setCurrentStage} />;
            break;
        default:
            selectPickUpJSX = <FirstStage updatePickUp={updatePickUp} openLaterPickUp={openLaterPickUp} />;
    }
    return (
        <div className="container">

            {props.isUserRescheduling && <button onClick={() => props.setIsUserRescheduling(false)}>X</button>}
            {(props.isUserOrderBeingProcessed && !props.isGatewayValid) &&
                <p>Sorry, the pick up time you've choosen is no longer availale please choose a new one</p>}



            {selectPickUpJSX}
            {props.isUserOrderBeingProcessed && <button onClick={() => props.cancelUserOrder({ router })}>Cancel Order</button>}
            <style jsx>{`
                .container{
                    border:3px solid black;
                    padding:10px;
                    position:fixed;
                    width:400px;
                    background:white;
                    top:30px;
                    left:50%;
                    margin-left:-200px;
                }
            `}</style>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        pickUpTime: state.order.pickUpTime,
        isUserRescheduling: state.order.isUserRescheduling,
        isGatewayValid: state.order.isGatewayValid,
        isUserOrderBeingProcessed: state.order.isUserOrderBeingProcessed,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        cancelUserOrder: (data) => dispatch(asyncActions.cancelUserOrder(data)),
        setIsUserRescheduling: (data) => dispatch(orderActions.setIsUserRescheduling(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SelectPickUpTime);
