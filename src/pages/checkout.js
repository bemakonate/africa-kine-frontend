import React, { useState } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/layout';
import ContactForm from '../components/layout/checkout/contactForm';
import Receipt from '../components/layout/checkout/receipt';
import CartItem from '../components/resuable/cartItem';

const Checkout = (props) => {

    const [billingDetails, setBillingDetails] = useState(null);
    const [isContactFormValid, setIsContactFormValid] = useState(false);

    const updateBillingDetails = (formData) => setBillingDetails(formData);
    const updateContactFormValidity = (boolean) => setIsContactFormValid(boolean);


    return (
        <Layout>
            <div className="orderDetails">
                <h2>Order Details</h2>
                {props.cart.map((cartItem, index) => {
                    return <CartItem
                        fixed
                        key={index}
                        index={index}
                        cartItem={cartItem} />
                })}
            </div>

            <div>
                <h2>Contact Details</h2>
                <ContactForm
                    getFormData={updateBillingDetails}
                    getIsFormValid={updateContactFormValidity} />
            </div>

            <div>
                <h2>Summary</h2>
                <Receipt serverSummary={{
                    shouldPayShipping: true,
                    shipping: 10,
                    subtotal: 100,
                    taxes: .10,
                    total: 110.10,
                }} />
            </div>


        </Layout>
    )
}

const mapStateToProps = state => {
    return {
        cart: state.order.cart,
    }
}

export default connect(mapStateToProps)(Checkout);
