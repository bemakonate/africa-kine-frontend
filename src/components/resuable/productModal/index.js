import ItemQty from '../itemQuantity';
import React, { useState } from 'react';
import SideOrders from './sideOrders';

import { connect } from 'react-redux';
import * as layoutActions from '../../../store/layout/actions';
import * as orderActions from '../../../store/order/actions';

const productModal = (props) => {

    const { name, description, price, sideOrders, sideOrdersPerQty } = props.product;
    const { addToCart, closeProductModal } = props;

    const [itemQuantity, setItemQuantity] = useState(props.qty);
    const [selectedSideOrders, setSelectedSideOrders] = useState(null);
    const [speicalRequestVal, setSpeicalRequestVal] = useState('');


    if (!props.product) {
        return <p>product must be passed</p>
    }

    const getSelectedOrders = (data) => setSelectedSideOrders(data);
    const getSpecialRequest = (e) => setSpeicalRequestVal(e.target.value);

    const addOrderToCart = () => {
        //Make sure that each side order is determined
        let isAllSideOrdersSelected = true;
        selectedSideOrders.forEach(selectedSideOrder => {
            if (!selectedSideOrder.data) {
                isAllSideOrdersSelected = false;
            }
        })

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

        //Make sure side order quantity is right amount
        //Add the product to the cart
        addToCart(orderData);
        closeProductModal();
        alert("Item was added to cart")

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
                <ItemQty defualtNum={props.qty} getQuantity={setItemQuantity} />
            </div>

            <div className="side-order-container">
                <p>You can have {sideOrdersPerQty} side order(s) per quantity</p>
                <SideOrders qty={itemQuantity * sideOrdersPerQty} sideOrderItems={sideOrders} getSelectedSideOrders={getSelectedOrders} />
            </div>

            <div className="special-request">
                <p>Special Request:</p>
                <textarea name="" onChange={getSpecialRequest}></textarea>
            </div>


            <div className="modal-order-subtotal">
                <p>Order Subtotal:</p>
                <p>${price * itemQuantity}</p>
            </div>

            <button onClick={addOrderToCart}>Add To Cart</button>
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
        closeProductModal: () => dispatch(layoutActions.closeProductModal()),
    }
}

export default connect(null, mapDispatchToProps)(productModal)
