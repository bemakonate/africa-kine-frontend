import React, { useState } from 'react';
import FirstStage from '../components/layout/selectPickUpTime/firstStage';
import ConfirmPickUp from '../components/layout/selectPickUpTime/confirmPickUp';
import SelectLaterPickup from '../components/layout/selectPickUpTime/selectLaterPickUp';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';


const Ordering = (props) => {
    const [currentStage, setCurrentStage] = useState(1);
    const [pickUpData, setPickUpData] = useState(null);
    const router = useRouter();

    if (props.pickUpTime) {
        router.push('/ordering/menu');
    }



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
            selectPickUpJSX = <SelectLaterPickup updatePickUp={updatePickUp} />;
            break;
        case 3:
            selectPickUpJSX = <ConfirmPickUp pickUpConfig={pickUpData} />;
            break;
        default:
            selectPickUpJSX = <FirstStage updatePickUp={updatePickUp} openLaterPickUp={openLaterPickUp} />;
    }
    return (
        <div>
            {selectPickUpJSX}
        </div>
    )
}


const mapStateToProps = state => {
    return {
        pickUpTime: state.order.pickUpTime,
    }
}
export default connect(mapStateToProps)(Ordering);
