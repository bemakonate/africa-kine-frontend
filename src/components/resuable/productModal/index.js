import ItemQty from '../itemQuantity';
import React, { useState } from 'react';
import SideOrders from './sideOrders';

const productModal = (props) => {

    const { name, description, price, sideOrders } = props.product;
    const [itemQuantity, setItemQuantity] = useState(props.qty);

    if (!props.product) {
        return <p>product must be passed</p>
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
                <SideOrders qty={itemQuantity} sideOrderItems={sideOrders} />
            </div>

            <div className="special-request">
                <p>Special Request:</p>
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>


            <div className="modal-order-subtotal">
                <p>Order Subtotal:</p>
                <p>${price * itemQuantity}</p>
            </div>

            <button>Add To Cart</button>
            <style jsx>{`
        .modal{
            border:1px solid black;
            padding:10px;
        }
         `} </style>
        </div>
    )
}

export default productModal
