import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getPopulatedCart, getCartSubTotal, getDividedCart, getPopulatedServerCart } from '../../../constants/helpers/cart-helpers';
import axios from 'axios';
import { useRouter } from 'next/router';

const cartFooter = (props) => {
    const router = useRouter();


    // const [availableCart, setAvailableCart] = useState(null);
    const [numOfItems, setNumOfItems] = useState(0);
    const [cartSubTotal, setCartSubTotal] = useState(0);


    useEffect(() => {
        const run = async () => {

            const data = await getPopulatedServerCart({ cart: props.cart, pickUpTime: props.pickUpTime });
            setNumOfItems(data.cart.length);
            setCartSubTotal(data.receipt.subtotal);
        }
        run();
    }, [props.cart, props.pickUpTime])



    return (
        <div className="cart-footer">
            <span>{numOfItems}</span>
            <span onClick={() => router.push('/ordering/cart')}>View Orders </span>
            <span>${cartSubTotal}</span>
            <style jsx>{`
            .cart-footer{
                padding:10px;
                border:1px solid black;
                position:fixed;
                bottom:0;
                left:0;
                width:100%;
                display:flex;
                justify-content:space-around;
                background:white;
            }
            
            `}</style>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        cart: state.order.cart,
        pickUpTime: state.order.pickUpTime,
    }
}
export default connect(mapStateToProps)(cartFooter)
