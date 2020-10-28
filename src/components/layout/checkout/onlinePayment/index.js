import React, { useState } from 'react';
import CardPayment from './cardPayment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const OnlinePayment = () => {
    const [payOption, setPayOption] = useState('card');
    const payChangeHandler = (value) => setPayOption(value);
    return (
        <article className="payment-option-wrapper">
            <div className="payment-options">
                <div className="payment-option">
                    <input
                        type="radio"
                        name="payment"
                        id="card"
                        value="card"
                        checked={payOption === 'card'}
                        className="payment-radio"
                        onChange={() => payChangeHandler('card')} />
                    <label htmlFor="card" className="payment-radio-label">
                        {/* <FaCreditCard className="payment-icon" /> */}
                         Use Card
                    </label>
                </div>

                <div className="payment-option">
                    <input
                        type="radio"
                        name="payment"
                        id="apple-pay"
                        value="apple-pay"
                        className="payment-radio"
                        checked={payOption === 'apple-pay'}
                        onChange={() => payChangeHandler('apple-pay')} />
                    <label htmlFor="apple-pay" className="payment-radio-label">
                        {/* <FaApple className="payment-icon" />  */}
                        Apple Pay
                    </label>
                </div>
            </div>
            <Elements stripe={stripePromise}>
                {payOption === 'card' ? <CardPayment /> : null}
            </Elements>

        </article>
    );
}

export default OnlinePayment
