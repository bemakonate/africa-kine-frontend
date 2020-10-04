import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as asyncActions from '../../store/asyncActions';
import * as orderActions from '../../store/order/actions';
import allProducts from '../../constants/products';

const RootElmt = (props) => {
    const { getUserCart, cart } = props;

    useEffect(() => {
        getUserCart(allProducts);
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart])

    return props.children;
}

const mapStateToProps = state => {
    return {
        cart: state.order.cart,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getUserCart: (allProducts) => dispatch(asyncActions.getUserCart(allProducts)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RootElmt);
