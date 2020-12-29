import React from 'react';
import { connect } from 'react-redux';
import data from '../../constants/examples/confirmationData';
import Receipt from '../../components/layout/checkout/receipt';
import CartItem from '../../components/resuable/cartItem';
import Layout from '../../components/layout';
const Confirmation = (props) => {

    let pageJSX = <p>If you alredy have an order check your email for confirmation</p>

    if (props.confirmationPageData) {
        const { frontendCart, createdOrder } = props.confirmationPageData;
        pageJSX = (
            <div>
                <header className="page-header">
                    <h2 className="page-header__title">Thank you!</h2>
                    <p className="page-header__details">Your order has been processed. Check email for confirmation of your order</p>

                    {/* <Link href="/" className="back-home-btn">Continue Shopping</Link> */}
                </header>

                <h3>Order Id: #{createdOrder.orderId}</h3>

                <section className="order-details-section sect">
                    <h2 className="order-details__title sect-title">Order Details</h2>
                    <div className="order-details">
                        <div className="order-detail">
                            <p className="order-detail__title">Customer name</p>
                            <p className="order-detail__desc">{createdOrder.customerDetails.lastName}, {createdOrder.customerDetails.firstName}</p>
                        </div>

                        <div className="order-detail">
                            <p className="order-detail__title">Address</p>
                            <p className="order-detail__desc">{createdOrder.customerDetails.address}</p>
                        </div>

                        <div className="order-detail">
                            <p className="order-detail__title">Email</p>
                            <p className="order-detail__desc">{createdOrder.customerDetails.email}</p>
                        </div>
                        <div className="order-detail">
                            <p className="order-detail__title">Phone</p>
                            <p className="order-detail__desc">{createdOrder.customerDetails.phone}</p>
                        </div>
                        <div className="order-detail">
                            <p className="order-detail__title">Order Date</p>
                            <p className="order-detail__desc">{createdOrder.orderDate}</p>
                        </div>
                        <div className="order-detail">
                            <p className="order-detail__title">Pick Up Date</p>
                            <p className="order-detail__desc">{createdOrder.pickUpDate}</p>
                        </div>
                    </div>
                </section>

                <section className="order-summary-section sect">
                    <h2 className="sect-title">Order Summary</h2>
                    <Receipt serverSummary={createdOrder.charge} />
                </section>

                <section className="order-cart-section sect">
                    <h2 className="sect-title">Order Cart</h2>

                    {frontendCart.map((cartItem, index) => {
                        return <CartItem
                            fixed
                            key={index}
                            index={index}
                            cartItem={cartItem} />
                    })}

                </section>

            </div>
        )

    }

    return (
        <Layout>
            {pageJSX}
        </Layout>
    )
}


const mapStateToProps = (state) => {
    return {
        confirmationPageData: state.layout.confirmOrderPageData,
    }
}

export default connect(mapStateToProps)(Confirmation)
