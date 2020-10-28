import React, { useState, useEffect, useContext } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import PaymentContext from '../../../../context/cardPayment';
import axios from '../../../../constants/instances/backend';

const CardPayment = () => {

    const stripe = useStripe();
    const elements = useElements();

    const [cardBeingProcessed, setCardBeingProcessed] = useState(false);
    const [isStripeLoaded, setIsStripeLoaded] = useState(null);
    const [createdOrder, setCreatedOrder] = useState(null);
    const [success, setSuccess] = useState(false);

    const paymentContext = useContext(PaymentContext);
    const { contactForm, serverCart, token, serverReceipt, isContactFormValid } = paymentContext;
    const { getIsPaymentBeingProcessed, getCreatedOrder, getIsStripeLoaded, getIsPaymentSuccessful } = paymentContext;


    //Check to see if stripe data has been loaded into the component
    useEffect(() => setIsStripeLoaded(stripe), [stripe]);

    /*========PAYMENT CONEXT - SEND DATA TO PARENT COMPONENT===================*/
    useEffect(() => getIsStripeLoaded && getIsStripeLoaded(isStripeLoaded), [isStripeLoaded])

    useEffect(() => getIsPaymentSuccessful && getIsPaymentSuccessful(success), [success]);

    useEffect(() => getCreatedOrder && getCreatedOrder(createdOrder), [createdOrder])

    useEffect(() => getIsPaymentBeingProcessed && getIsPaymentBeingProcessed(cardBeingProcessed), [cardBeingProcessed])
    /*========/PAYMENT CONEXT FUNCTIONS===================*/


    const chargeUserHandler = async (e) => {
        e.preventDefault();
        setCardBeingProcessed(true);
        let result;
        try {
            result = await stripe.confirmCardPayment(token, {
                payment_method: { card: elements.getElement(CardElement) }
            })

            //If the card payment had a problem throw the error
            if (result.error) {
                throw result.error;
            }


        } catch (err) {
            //Deal with card error here
            setCardBeingProcessed(false);
            alert(err.message);
            return null;
            // props.openFlashMessage({ message: err.message })
        }

        const customerOrderDetails = {
            paymentIntent: result.paymentIntent,
            cart: serverCart,
            contact: contactForm,
        }

        try {
            const res = await axios.post('/orders', customerOrderDetails);
            setCardBeingProcessed(false);
            setSuccess(true);
            setCreatedOrder(res.data);
            alert('You order was created');


        } catch (err) {
            setCardBeingProcessed(false);
            setSuccess(false);
            console.log('[cardPayment] err', err);
            alert('We are so sorry, their was an error processing your card');

        }
    }

    return (
        <form>
            {/* {success && <p>Your order was successfully processed</p>} */}
            <div className="card-element">
                <CardElement />
            </div>
            {!isContactFormValid ? <span className="purchase-warning">Complete Form to purchase</span> : null}
            <button
                className="buy-btn"
                // disabled={(!stripe) || (!isContactFormValid)}
                onClick={chargeUserHandler}
            >Pay ${serverReceipt.total}</button>
        </form>
    );
}

export default CardPayment
