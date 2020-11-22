import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';

const SelectLaterPickup = ({ updatePickUp }) => {

    const [allOpenPickUps, setAllOpenPickUps] = useState(false);
    const [currentDate, setCurrentDate] = useState(null);
    const [laterPickUp, setLaterPickUp] = useState(null);


    const allPickUpDates = allOpenPickUps ? Object.keys(allOpenPickUps) : null;
    useEffect(() => {
        const run = async () => {
            const res = await axios.get(`http://localhost:1337/restaurant-settings/business-hours/open-pickups`);
            setAllOpenPickUps(res.data.openPickUps);
        }

        run();

    }, [])


    const setPickUpTime = () => updatePickUp(laterPickUp);


    let contentJSX = null;

    if (allPickUpDates) {
        contentJSX = (
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
    } else {
        contentJSX = (
            <p>There are no available pickups at this time please come back later</p>
        )
    }


    return contentJSX;
}

export default SelectLaterPickup;