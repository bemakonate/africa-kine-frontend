import React, { useEffect, useState } from 'react';
import { getPopulatedCart, getCartSubTotal, getSingleOrderTotal, getDividedCart } from '../../../constants/helpers/cart-helpers'
import { useRouter } from 'next/router';
import * as asyncActions from '../../../store/asyncActions';
import * as orderActions from '../../../store/order/actions';
import * as layoutActions from '../../../store/layout/actions';
import { connect } from 'react-redux';
import moment from 'moment';
import { setIsUserRescheduling } from '../../../store/order/actions';
import CartItem from '../../resuable/cartItem';




const CartComponent = (props) => {
    const [availableCart, setAvailableCart] = useState(null);
    const [unavailableCart, setUnavailableCart] = useState(null);
    const router = useRouter();

    let availableCartJSX = null;
    let unavailableCartJSX = null;

    useEffect(() => {
        const run = async () => {
            const dividedCart = await getDividedCart({ cart: props.cart, pickUpTime: props.pickUpTime });

            setAvailableCart(dividedCart.availableCart);
            setUnavailableCart(dividedCart.unavailableCart);
        }
        run();
    }, [props.cart])



    const availableCartSubTotal = getCartSubTotal(availableCart);
    if (availableCart && availableCart.length > 0) {
        availableCartJSX = availableCart.map((cartItem, index) => {
            return <CartItem
                cartItem={cartItem}
                index={cartItem.cartIndex} />
        })
    }

    if (unavailableCart && unavailableCart.length > 0) {
        unavailableCartJSX = unavailableCart.map((cartItem, index) => {
            return <CartItem
                cartItem={cartItem}
                index={cartItem.cartIndex} />
        })
    }



    const rescheduleHandler = () => {
        props.setIsUserRescheduling(true)
        props.updateIsCartComponentOpen(false);
    }

    const cancelOrderHandler = () => {
        props.cancelUserOrder({ router });
        props.updateIsCartComponentOpen(false);
    }

    const proceedToCheckout = () => {
        router.push('/ordering/checkout');
        props.updateIsCartComponentOpen(false);
    }

    return (
        <>
            <div className="cart-container">
                <div onClick={props.closeCartModal}>Close</div>
                <div>
                    <p>Submit Order By: {moment(Number(props.expiringDate)).format('lll')}</p>
                    <p>Pick Up Date: {moment(Number(props.pickUpTime)).format('lll')}</p>
                    <button onClick={rescheduleHandler}>Reschedule</button>
                </div>
                {/* Available Cart */}
                <div>
                    <h2>Cart</h2>
                    {availableCartJSX}
                    <div>Cart Subtotal: ${availableCartSubTotal}</div>
                </div>


                {/* Unavailable Cart */}
                <div>
                    <h2>Items No Longer Available</h2>
                    {unavailableCartJSX}
                </div>

                <button onClick={proceedToCheckout}>Proceed to Checkout</button>
                <button onClick={cancelOrderHandler}>Cancel Order</button>

            </div>
            <style jsx>{`
        .cart-container{
            width:100%;
            height:100%;
            position:fixed;
            top:0;
            left:0; 
            background:rgba(209, 209, 209);
        }
     
        `}

            </style>
        </>
    )
}

const mapStateToProps = state => {
    return {
        pickUpTime: state.order.pickUpTime,
        expiringDate: state.order.pickUpExpiringTime,
        cart: state.order.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        cancelUserOrder: (data) => dispatch(asyncActions.cancelUserOrder(data)),
        setIsUserRescheduling: (data) => dispatch(orderActions.setIsUserRescheduling(data)),
        closeProductModal: () => dispatch(layoutActions.closeProductModal()),
        removeFromCart: (index) => dispatch(orderActions.removeFromCart(index)),
        updateIsCartComponentOpen: (data) => dispatch(layoutActions.updateIsCartComponentOpen(data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartComponent);