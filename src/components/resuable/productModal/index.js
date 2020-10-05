import ItemQty from '../itemQuantity';
import React, { useState } from 'react';
import SideOrders from './sideOrders';
import { getSingleOrderTotal } from '../../../constants/helpers/custom-helpers';

import { connect } from 'react-redux';
import * as layoutActions from '../../../store/layout/actions';
import * as orderActions from '../../../store/order/actions';

const productModal = (props) => {


    if (!props.product) {
        return <p>product prop must be passed</p>
    }


    const { name, description, price, sideOrders, sideOrdersPerQty } = props.product;
    const { addToCart, closeProductModal, editCartItem } = props;

    const [itemQuantity, setItemQuantity] = useState(props.qty);
    const [selectedSideOrders, setSelectedSideOrders] = useState(null);
    const [speicalRequestVal, setSpeicalRequestVal] = useState(props.specialRequest || '');


    const getSelectedOrders = (data) => setSelectedSideOrders(data);
    const getSpecialRequest = (e) => setSpeicalRequestVal(e.target.value);
    const singleOrderTotal = getSingleOrderTotal({ price: price, qty: itemQuantity, selectedSideOrders: selectedSideOrders })


    const validatedOrder = () => {
        let isAllSideOrdersSelected = true;
        if (selectedSideOrders) {
            selectedSideOrders.forEach(selectedSideOrder => {
                if (!selectedSideOrder.data) {
                    isAllSideOrdersSelected = false;
                }
            })
        }

        if (!isAllSideOrdersSelected) {
            alert("Must select all side orders given");
            return null;
        }

        const orderData = {
            product: props.product,
            qty: itemQuantity,
            selectedSideOrders: selectedSideOrders,
            specialRequest: speicalRequestVal,
        }

        return orderData;
    }

    const addOrderToCart = () => {
        const orderData = validatedOrder();
        if (orderData) {
            addToCart(orderData);
            closeProductModal();
            alert("Item was added to cart")
        }

    }

    const changeProductOrder = () => {
        const orderData = validatedOrder();
        if (orderData) {
            editCartItem({ index: props.cartIndex, newCartItem: orderData });
            closeProductModal();
            alert("Saved item to cart");
        }
    }

    return (
        <div className="modal">
            <div className="close" onClick={props.close}>X</div>
            <header>
                <h2>{name}</h2>
                <span>Available Now</span>
                <div>${price}</div>
            </header>

            <p>{description}</p>

            <div>
                <p>Quantity: </p>
                <ItemQty defaultNum={props.qty} getQuantity={setItemQuantity} />
            </div>

            {sideOrdersPerQty ? <div className="side-order-container">
                <p>You can have {sideOrdersPerQty} side order(s) per quantity</p>
                <SideOrders
                    qty={itemQuantity * sideOrdersPerQty}
                    sideOrderItems={sideOrders}
                    getSelectedSideOrders={getSelectedOrders}
                    selectedSideOrders={props.selectedSideOrders}
                />
            </div> : <p>No Side Orders Available</p>}

            <div className="special-request">
                <p>Special Request:</p>
                <textarea name="" onChange={getSpecialRequest} defaultValue={speicalRequestVal}></textarea>
            </div>


            <div className="modal-order-subtotal">
                <p>Order Subtotal:</p>
                <p>${singleOrderTotal}</p>
            </div>

            {!props.editMode && <button onClick={addOrderToCart}>Add To Cart</button>}
            {props.editMode && <button onClick={changeProductOrder}>Save Changes</button>}

            <button onClick={closeProductModal}>Cancel</button>
            <style jsx>{`
        .modal{
            border:1px solid black;
            padding:10px;
        }
         `} </style>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (cartItem) => dispatch(orderActions.addToCart(cartItem)),
        editCartItem: ({ index, newCartItem }) => dispatch(orderActions.editCartItem({ index, newCartItem })),
        closeProductModal: () => dispatch(layoutActions.closeProductModal()),
    }
}

export default connect(null, mapDispatchToProps)(productModal)
