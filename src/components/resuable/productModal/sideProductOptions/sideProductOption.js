import React, { useState, useEffect } from 'react'

const SideProductOption = (props) => {
    const [selectedSideProduct, setSelectedSideProduct] = useState(props.selectedSideProduct || null);
    const [showAllSideProducts, setShowAllSideProducts] = useState(true);
    let selectedSideProductJSX = 'Not Choosen';

    useEffect(() => {
        if (selectedSideProduct) {
            setShowAllSideProducts(false);
        }
    }, [])

    useEffect(() => {
        if (props.getSelectedSideProduct) {
            props.getSelectedSideProduct(selectedSideProduct);
        }
    }, [selectedSideProduct])

    const sideProductClicked = (sideProduct) => {
        setSelectedSideProduct(sideProduct);
        setShowAllSideProducts(false);
    };

    const toggleShowAllSideProducts = () => setShowAllSideProducts(!showAllSideProducts);



    //If the side order is choosen then show the selected side order
    if (selectedSideProduct) {

        const extraPriceJSX = selectedSideProduct.additionalCost > 0 ? <span>+${selectedSideProduct.additionalCost}</span> : null;
        selectedSideProductJSX = (
            <span>{selectedSideProduct.name} {extraPriceJSX}</span>
        )
    }

    //Show all side orders available for product 
    const sideProductsListJSX = (
        <ul>
            {props.sideProducts.map(sideProduct => {
                const extraPriceJSX = sideProduct.additionalCost > 0 ? <span>+${sideProduct.additionalCost}</span> : null;
                return <li onClick={() => sideProductClicked(sideProduct)} key={sideProduct.id}>{sideProduct.name} {extraPriceJSX}</li>
            })}
        </ul>
    )

    return (
        <div>
            <p>Side Order({props.seq})</p>
            {selectedSideProductJSX}
            <button onClick={toggleShowAllSideProducts}>{showAllSideProducts ? 'up' : 'down'}</button>
            {showAllSideProducts && sideProductsListJSX}
        </div>
    )
}

export default SideProductOption
