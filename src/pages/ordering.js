import React, { useState } from 'react';
import moment from 'moment';

const ConfirmPickUp = ({ data }) => {
    const dateJSX = moment(data.pickUpTime).format('ll');
    const pickUpTimeJSX = moment(data.pickUpTime).format('h:mm a');
    const preOrderTimeJSX = moment(data.preOrderTime).format('h:mm a');

    if (data) {
        return (
            <div>
                <p>Date - {dateJSX}</p>
                <p>Approx Pickup Time: {pickUpTimeJSX}</p>
                <p>Order Must be placed by: {preOrderTimeJSX}</p>

                <button>Continue</button>
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



    const setPickUpToNow = () => {
        const pickUpNow = { preOrderTime: 1604381400000, pickUpTime: 1604382000000 };
        setPickUpData(pickUpNow);
        setCurrentStage(3);
    }

    const setPickUpToLater = (laterPickUp) => {
        setPickUpData(laterPickUp);
        setCurrentStage(3)
    }


    const openLaterPickUp = () => {
        const openPickUps = {
            '2020-11-03': [
                { preOrderTime: 1604380200000, pickUpTime: 1604380800000 },
                { preOrderTime: 1604381400000, pickUpTime: 1604382000000 },
                { preOrderTime: 1604382600000, pickUpTime: 1604383200000 },
                { preOrderTime: 1604383800000, pickUpTime: 1604384400000 },
                { preOrderTime: 1604385000000, pickUpTime: 1604385600000 },
                { preOrderTime: 1604386200000, pickUpTime: 1604386800000 },
                { preOrderTime: 1604387400000, pickUpTime: 1604388000000 },
                { preOrderTime: 1604388600000, pickUpTime: 1604389200000 }
            ]
        }
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
            selectPickUpJSX = <ConfirmPickUp data={pickUpData} />;
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
