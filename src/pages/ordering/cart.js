import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import * as asyncActions from '../../store/asyncActions';
import * as orderActions from '../../store/order/actions';
import * as layoutActions from '../../store/layout/actions';
import { connect } from 'react-redux';
import moment from 'moment';
import CartItem from '../../components/resuable/cartItem';
import axios from 'axios';
import { getPopulatedServerCart } from '../../constants/helpers/cart-helpers';
import Layout from '../../components/layout';




const CartComponent = (props) => {
    const router = useRouter();



    const [cart, setCart] = useState(null);
    const [isCartsEqual, setIsCartsEqual] = useState(null);
    const [isCartValid, setIsCartValid] = useState(null);
    const [cartReceipt, setCartReceipt] = useState(null);
    const [loadingCart, setLoadingCart] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);




    useEffect(() => {
        const run = async () => {
            setLoadingCart(true);
            const data = await getPopulatedServerCart({ cart: props.cart, pickUpTime: props.pickUpTime });

            setCart(data.cart);
            setIsCartsEqual(data.isCartsEqual);
            setIsCartValid(data.valid);
            setCartReceipt(data.receipt);
            setLoadingCart(false);
            setErrorMessage(data.errorMessage);


        }
        run();
    }, [props.cart])



    const rescheduleHandler = () => {
        props.openPickUpModal({ rescheduling: true });
    }

    const cancelOrderHandler = () => {
        props.cancelUserOrder({ router });
    }

    const proceedToCheckout = () => {
        router.push('/ordering/checkout');
    }


    let cartJSX = null;
    if (!loadingCart && cart && cart.length > 0) {
        cartJSX = (
            <div>
                {cartMessageJSX}
                <h2>Cart</h2>
                {cart.map((cartItem, index) => {
                    return <CartItem
                        key={index}
                        cartItem={cartItem}
                        index={cartItem.cartIndex} />
                })}
                <div>Cart Subtotal: ${cartReceipt.subtotal}</div>
            </div>
        )
    } else {
        cartJSX = <p>Your Cart is empty</p>
    }

    let cartMessageJSX = null;

    if (!isCartsEqual) {
        cartMessageJSX = <div>
            <span>There was a change in your cart because of the database. Check to see if your okay with the current cart</span>
            <button onClick={() => props.updateUserCart(cart)}>Confirm</button>
        </div>
    }
    else if (!isCartValid) {
        cartMessageJSX = <span>{errorMessage}</span>;
    }


    return (
        <Layout>
            <div className="cart-container">
                <div onClick={() => router.push('/ordering/menu')}>Go back</div>
                <div>
                    <p>Submit Order By: {moment(Number(props.expiringDate)).format('lll')}</p>
                    <p>Pick Up Date: {moment(Number(props.pickUpTime)).format('lll')}</p>
                    <button onClick={rescheduleHandler}>Reschedule</button>
                </div>
                {/* Available Cart */}
                {cartMessageJSX}
                {cartJSX}


                <button
                    onClick={proceedToCheckout}
                    disabled={!isCartValid || !isCartsEqual}>Proceed to Checkout</button>
                <button onClick={cancelOrderHandler}>Cancel Order</button>

            </div>


        </Layout>
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
        updateUserCart: (data) => dispatch(orderActions.updateUserCart(data)),
        openPickUpModal: (data) => dispatch(layoutActions.openPickUpModal(data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartComponent);