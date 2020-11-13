import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';

const moveToOrderingPage = async ({ pickUpConfig }) => {
    const res = await axios.get(`http://localhost:1337/restaurant-settings/business-hours/is-pickup-valid?_pickUpTime=${pickUpConfig.pickUpTime}`);

    const { isValid } = res.data;

    if (isValid) {
        //Redirect user to ordering page
    } else {
        //alert user that pick up time is not valid
        alert("Please try another pick up time, this pick up time does not exist")
    }
}
const ConfirmPickUp = ({ pickUpConfig }) => {
    const dateJSX = moment(pickUpConfig.pickUpTime).format('ll');
    const pickUpTimeJSX = moment(pickUpConfig.pickUpTime).format('h:mm a');
    const preOrderTimeJSX = moment(pickUpConfig.preOrderTime).format('h:mm a');

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

const SelectLaterPickup = ({ allOpenPickUps, setPickUpData }) => {
    const allPickUpDates = Object.keys(allOpenPickUps);
    const [currentDate, setCurrentDate] = useState(null);
    const [laterPickUp, setLaterPickUp] = useState(null);


    const setPickUpTime = () => {
        setPickUpData(laterPickUp);
    }

    return (
        <div>
            <p>Date - {currentDate}</p>
            <li>Pleae choose a pickup date: </li>
            <ul>
                {allPickUpDates.map((pickUpDate, index) => <li key={index} onClick={() => setCurrentDate(pickUpDate)}>{pickUpDate}</li>)}
            </ul>
            <p>Please choose a pickup time: </p>

            {currentDate && <ul>
                {allOpenPickUps[currentDate].map((data, index) =>
                    <li key={index} onClick={() => setLaterPickUp(data)}>{moment(data.pickUpTime).format('h:mm a')}</li>)}
            </ul>

            }
            <button onClick={setPickUpTime} disabled={!laterPickUp}>Continue</button>
        </div>
    )
}


const FirstStage = ({ setPickUpToNow, openLaterPickUp }) => {
    return (
        <div>
            <p>Now/Later</p>
            <button onClick={setPickUpToNow}>Now</button>
            <button onClick={openLaterPickUp}>Later</button>
        </div>
    )
}
const Ordering = () => {
    const [currentStage, setCurrentStage] = useState(1);
    const [pickUpData, setPickUpData] = useState(null);
    const [allOpenPickUps, setAllOpenPickUps] = useState(null);



    const setPickUpToNow = async () => {
        const res = await axios.get(`http://localhost:1337/restaurant-settings/business-hours/next-open-pickup`);
        const pickUpNow = res.data;

        setPickUpData(pickUpNow);
        setCurrentStage(3);
    }

    const setPickUpToLater = (laterPickUp) => {
        setPickUpData(laterPickUp);
        setCurrentStage(3)
    }


    const openLaterPickUp = async () => {
        const res = await axios.get(`http://localhost:1337/restaurant-settings/business-hours/open-pickups`);
        const openPickUps = res.data;
        setAllOpenPickUps(openPickUps);
        setCurrentStage(2.1);
    }

    let selectPickUpJSX = null;
    switch (currentStage) {
        case 1:
            selectPickUpJSX = <FirstStage setPickUpToNow={setPickUpToNow} openLaterPickUp={openLaterPickUp} />;
            break;
        case 2.1:
            selectPickUpJSX = <SelectLaterPickup allOpenPickUps={allOpenPickUps} setPickUpData={setPickUpToLater} />;
            break;
        case 3:
            selectPickUpJSX = <ConfirmPickUp pickUpConfig={pickUpData} />;
            break;
        default:
            selectPickUpJSX = <FirstStage setPickUpToNow={setPickUpToNow} openLaterPickUp={openLaterPickUp} />;
    }
    return (
        <div>
            {selectPickUpJSX}
        </div>
    )
}


export default Ordering
