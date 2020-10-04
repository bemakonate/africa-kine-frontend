import React, { useState, useEffect } from 'react'

const SideOrder = (props) => {
    const [selectedSideOrder, setSelectedSideOrder] = useState(props.selectedSideOrder || null);
    const [showAllSideOrders, setShowAllSideOrders] = useState(true);
    let selectedSideOrderJSX = 'Not Choosen';

    const noneSideOrder = { name: 'None', extraPrice: 0 }

    useEffect(() => {
        if (selectedSideOrder) {
            setShowAllSideOrders(false);
        }
    }, [])

    useEffect(() => {
        if (props.getSelectedSideOrder) {
            props.getSelectedSideOrder(selectedSideOrder);
        }
    }, [selectedSideOrder])

    const sideOrderClicked = (sideOrder) => {
        setSelectedSideOrder(sideOrder);
        setShowAllSideOrders(false);
    };

    const toggleShowAllSideOrders = () => setShowAllSideOrders(!showAllSideOrders);



    //If the side order is choosen then show the selected side order
    if (selectedSideOrder) {

        const extraPriceJSX = selectedSideOrder.extraPrice > 0 ? <span>+${selectedSideOrder.extraPrice}</span> : null;
        selectedSideOrderJSX = (
            <span>{selectedSideOrder.name} {extraPriceJSX}</span>
        )
    }

    //Show all side orders available for product 
    const sideOrdersListJSX = (
        <ul>
            {props.sideOrderItems.map(sideOrder => {
                const extraPriceJSX = sideOrder.extraPrice > 0 ? <span>+${sideOrder.extraPrice}</span> : null;
                return <li onClick={() => sideOrderClicked(sideOrder)} key={sideOrder.id}>{sideOrder.name} {extraPriceJSX}</li>
            })}
            <li onClick={() => sideOrderClicked(noneSideOrder)}>None</li>

        </ul>
    )

    return (
        <div>
            <p>Side Order({props.seq})</p>
            {selectedSideOrderJSX}
            <button onClick={toggleShowAllSideOrders}>{showAllSideOrders ? 'up' : 'down'}</button>
            {showAllSideOrders && sideOrdersListJSX}
        </div>
    )
}

export default SideOrder
