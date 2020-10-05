import React from 'react'
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import CartItem from '../components/resuable/cartItem';


const Cart = (props) => {
    const { removeFromCart, openProductModal } = props;
    const router = useRouter();
    return (
        <Layout>
            {props.cart.map((cartItem, index) => {
                return <CartItem
                    key={index}
                    index={index}
                    cartItem={cartItem} />
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


export default connect(mapStateToProps)(Cart)
