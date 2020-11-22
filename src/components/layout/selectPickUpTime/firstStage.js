import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FirstStage = ({ updatePickUp, openLaterPickUp }) => {
    const [nextOpenPickUp, setNextOpenPickUp] = useState(null);
    const [allOpenPickUps, setAllOpenPickUps] = useState(null);
    const [loading, setLoading] = useState(false);
    let contentJSX = null;

    useEffect(() => {
        setLoading(true);
        const run = async () => {
            const res = await axios.get(`http://localhost:1337/restaurant-settings/business-hours/next-open-pickup`);
            const res2 = await axios.get(`http://localhost:1337/restaurant-settings/business-hours/open-pickups`);

            setNextOpenPickUp(res.data.nextPickUp);
            setAllOpenPickUps(res2.data.openPickUps);
            setLoading(false);
        }

        run();
    }, [])

    if (loading) {
        contentJSX = <p>Loading...</p>
    }
    else if (nextOpenPickUp || allOpenPickUps) {
        contentJSX = (
            <div>
                <p>Now/Later</p>
                {nextOpenPickUp && <button onClick={() => updatePickUp(nextOpenPickUp)}>ASAP</button>}
                {allOpenPickUps && <button onClick={openLaterPickUp}>Later</button>}
            </div>
        )
    }
    else {
        contentJSX = <p>No available pick ups at this time</p>
    }


    return contentJSX;
}

export default FirstStage;