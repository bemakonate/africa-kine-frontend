import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getPopulatedCart, getCartSubTotal, getDividedCart } from '../../../constants/helpers/cart-helpers'

const cartFooter = (props) => {

    // const [cartSubTotal, setCartSubTotal] = useState(0);
    const [availableCart, setAvailableCart] = useState(null);

    useEffect(() => {
        const run = async () => {
            const { availableCart: newAvailableCart } = await getDividedCart({ cart: props.cart, pickUpTime: props.pickUpTime });
            setAvailableCart(newAvailableCart);
        }
        run();
    }, [props.cart, props.pickUpTime])


    const cartSubTotal = getCartSubTotal(availableCart);

    return (
        <div className="cart-footer">
            {(availableCart && Array.isArray(availableCart)) && <span>{availableCart.length}</span>}
            <span onClick={() => props.setShowCart(true)}>View Orders </span>
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
