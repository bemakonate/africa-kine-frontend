import React, { useEffect, useState } from 'react';
import { getPopulatedCart, getCartSubTotal, getSingleOrderTotal } from '../../../constants/helpers/cart-helpers'
import { connect } from 'react-redux';
import * as asyncActions from '../../../store/asyncActions';
import * as orderActions from '../../../store/order/actions';
import * as layoutActions from '../../../store/layout/actions';

const CartItem = (props) => {
    const cartItem = props.cartItem;
    const index = props.index;

    const cartItemTotal = getSingleOrderTotal({
        price: cartItem.product.price,
        qty: cartItem.qty,
        selectedSideProducts: cartItem.selectedSideProducts,
    })
    return (
        <div className="cart-item">
            <div className="cart-item-content">
                {!props.fixed && <span onClick={() => props.removeFromCart(index)}>x</span>}
                <span>{cartItem.qty}</span>
                <div>
                    <h3 className="product-title">{cartItem.product.name}</h3>
                    {cartItem.selectedSideProducts &&
                        cartItem.selectedSideProducts.map((selectedSideProduct) => <span>{selectedSideProduct.name}</span>)}

                </div>

                {!props.fixed && <span onClick={() => props.openProductModal({
                    props: {
                        productId: cartItem.product.id,
                        qty: cartItem.qty,
                        specialRequest: cartItem.specialRequest,
                        selectedSideProducts: cartItem.selectedSideProducts,
                        cartIndex: index,
                        editMode: true,
                        orderingMode: true,
                    }
                })}>Edit</span>}
                <span>${cartItemTotal}</span>
            </div>
            {cartItem.specialRequest && <p>Notes: {cartItem.specialRequest}</p>}

            <style jsx>{`
            .cart-item-content{
                display:flex;
                justify-content:space-around;
            }
            .product-title{
                margin:0;
            }
        `}

            </style>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        // pickUpTime: state.order.pickUpTime,
        // expiringDate: state.order.pickUpExpiringTime,
        // cart: state.order.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // cancelUserOrder: (data) => dispatch(asyncActions.cancelUserOrder(data)),
        // setIsUserRescheduling: (data) => dispatch(orderActions.setIsUserRescheduling(data)),
        // closeProductModal: () => dispatch(layoutActions.closeProductModal()),
        removeFromCart: (index) => dispatch(orderActions.removeFromCart(index)),
        openProductModal: (data) => dispatch(asyncActions.openProductModal(data)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);