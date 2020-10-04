import React from 'react'
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import * as orderActions from '../store/order/actions';
import * as asyncActions from '../store/asyncActions';
import { getSingleOrderTotal } from '../constants/helpers/custom-helpers';


const Cart = (props) => {
    const { removeFromCart, openProductModal } = props;
    const router = useRouter()
    return (
        <Layout>
            {props.cart.map((cartItem, index) => {
                return (
                    <div key={`cartItem-${index}`}>
                        <h2>{cartItem.product.name}</h2>
                        <p>Qty: {cartItem.qty}</p>
                        <p>Price: ${getSingleOrderTotal({
                            price: cartItem.product.price,
                            qty: cartItem.qty,
                            selectedSideOrders: cartItem.selectedSideOrders
                        })}</p>
                        <ul>
                            {cartItem.selectedSideOrders.map((selectedSideOrder, index) => {
                                return <li key={`sideOrder-${index}`}>{selectedSideOrder.data.name}</li>
                            })}
                        </ul>
                        <button onClick={() => openProductModal({
                            props: {
                                product: cartItem.product,
                                qty: cartItem.qty,
                                specialRequest: cartItem.specialRequest,
                                selectedSideOrders: cartItem.selectedSideOrders,
                                cartIndex: index,
                                editMode: true,
                            }
                        })}>Edit</button>
                        <button onClick={() => removeFromCart(index)}>Remove</button>
                    </div>
                );
            })}
            <button onClick={() => router.push('/checkout')}>Checkout</button>
        </Layout>
    )
}

const mapStateToProps = state => {
    return {
        cart: state.order.cart,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        removeFromCart: (index) => dispatch(orderActions.removeFromCart(index)),
        openProductModal: (data) => dispatch(asyncActions.openProductModal(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
