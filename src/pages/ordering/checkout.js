import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router'
import Layout from '../../components/layout';
import ContactForm from '../../components/layout/checkout/contactForm';
import Receipt from '../../components/layout/checkout/receipt';
import CartItem from '../../components/resuable/cartItem';
import OnlinePayment from '../../components/layout/checkout/onlinePayment';
import CardPaymentContext from '../../context/cardPayment';
import axios from '../../constants/instances/backend';
import * as layoutActions from '../../store/layout/actions';
import * as orderActions from '../../store/order/actions';
import { getDividedCart, getServerCart } from '../../constants/helpers/cart-helpers'


const Checkout = (props) => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [fetchingPaymentData, setFetchingPaymentData] = useState(false);
    const [contactForm, setContactForm] = useState(null);
    const [isContactFormValid, setIsContactFormValid] = useState(false);
    const [token, setToken] = useState(null);
    const [serverReceipt, setServerReceipt] = useState(null);
    const [checkoutCart, setCheckoutCart] = useState(null);


    const [isStripeLoaded, setIsStripeLoaded] = useState(null);
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(null);
    const [createdOrder, setCreatedOrder] = useState(null);
    const [isPaymentBeingProcessed, setIsPaymentBeingProcessed] = useState(false);



    const serverCart = getServerCart({ cart: checkoutCart });


    //Redirect user back to cart if no items 
    // useEffect(() => {
    //     if (!props.cart.length) {
    //         router.push('/cart').then(() => window.scrollTo(0, 0));
    //     }
    // }, [])

    //Load user token and receipt 
    useEffect(() => {

        const run = async () => {
            const dividedCart = await getDividedCart({ cart: props.cart, pickUpTime: props.pickUpTime });
            setCheckoutCart(dividedCart.availableCart);
        }

        run();
    }, [props.cart])


    useEffect(() => {
        const loadToken = async (cart) => {
            if (cart) {
                const response = await axios.post('/restaurant-settings/orders/payment', { cart });
                const data = response.data;

                setToken(data.paymentIntent.client_secret);
                setServerReceipt(data.summary);
            } else {
                setToken(null);
                setServerReceipt(null);
            }
        }


        const run = async () => {
            setLoading(true);
            await loadToken(serverCart);
            setLoading(false);
        }

        run();

    }, [checkoutCart])


    //Update to check if the server is processing the card information
    useEffect(() => {
        if (isStripeLoaded && token && props.cart) {
            isPaymentBeingProcessed ? setLoading(true) : setLoading(false);
        }
    }, [isPaymentBeingProcessed]);

    //If order is created redirect to '/confirmation'
    useEffect(() => {
        if (isPaymentSuccessful && createdOrder) {
            props.addConfirmOrderPageData({
                createdOrder,
                frontendCart: checkoutCart,
            });
            props.clearCart();
            router.push('/ordering/confirmation').then(() => window.scrollTo(0, 0));
        }
    }, [isPaymentSuccessful, createdOrder])



    const updateContactForm = (formData) => setContactForm(formData);
    const updateContactFormValidity = (boolean) => setIsContactFormValid(boolean);

    const getIsStripeLoaded = (data) => setIsStripeLoaded(data);
    const getIsPaymentSuccessful = (data) => setIsPaymentSuccessful(data);
    const getCreatedOrder = (data) => setCreatedOrder(data);
    const getIsPaymentBeingProcessed = (data) => setIsPaymentBeingProcessed(data);


    let onlinePaymentComponent = null;
    let checkoutJSX = null;


    if (token && serverReceipt) {
        onlinePaymentComponent = (
            <CardPaymentContext.Provider value={{
                isContactFormValid,
                contactForm,
                serverCart,
                serverReceipt,
                token,

                getIsStripeLoaded,
                getIsPaymentSuccessful,
                getCreatedOrder,
                getIsPaymentBeingProcessed
            }}>
                <OnlinePayment />
            </CardPaymentContext.Provider>
        )


        checkoutJSX = (
            <>

                <div>
                    <h2>Contact Details</h2>
                    <ContactForm
                        getFormData={updateContactForm}
                        getIsFormValid={updateContactFormValidity} />
                </div>


                <div>
                    <h2>Payment Option</h2>
                    {/* Payment data goes here */}
                    {onlinePaymentComponent}
                </div>

                <div className="orderDetails">
                    <h2>Order Details</h2>
                    {checkoutCart && checkoutCart.map((cartItem, index) => {
                        return <CartItem
                            fixed
                            key={index}
                            index={index}
                            cartItem={cartItem} />
                    })}
                </div>

                <div>
                    <h2>Receipt</h2>
                    <Receipt serverSummary={serverReceipt} />
                </div>

            </>
        )
    }

    if (!loading && (!token || !serverReceipt)) {
        checkoutJSX = <p>Sorry we couldn't load your checkout page</p>
    }




    return (
        <Layout>
            {loading ? <p>Loading....</p> : null}
            {checkoutJSX}
        </Layout>
    )
}

const mapStateToProps = state => {
    return {
        cart: state.order.cart,
        pickUpTime: state.order.pickUpTime,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addConfirmOrderPageData: (data) => dispatch(layoutActions.addConfirmOrderPageData(data)),
        clearCart: () => dispatch(orderActions.clearCart()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
