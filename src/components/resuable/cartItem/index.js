import React from 'react';
import { getSingleOrderTotal } from '../../../constants/helpers/custom-helpers';
import * as orderActions from '../../../store/order/actions';
import * as asyncActions from '../../../store/asyncActions';
import { connect } from 'react-redux';

const CartItem = (props) => {
    const cartItem = props.cartItem;
    const { removeFromCart, openProductModal } = props;
    const { index } = props;


    //Render 
    const controlBtns = (
        <React.Fragment>
            <button onClick={() => openProductModal({
                props: {
                    product: cartItem.product,
                    qty: cartItem.qty,
                    specialRequest: cartItem.specialRequest,
                    selectedSideProducts: cartItem.selectedSideProducts,
                    cartIndex: index,
                    editMode: true,
                }
            })}>Edit</button>
            <button onClick={() => removeFromCart(index)}>Remove</button>
        </React.Fragment>
    )


    return (
        <div>
            <h3>{cartItem.product.name}</h3>
            <p>Qty: {cartItem.qty}</p>
            <p>Single Price: ${cartItem.product.price}</p>
            <p>Total: ${getSingleOrderTotal({
                price: cartItem.product.price,
                qty: cartItem.qty,
                selectedSideProducts: cartItem.selectedSideProducts
            })}</p>
            <p>Special Request: {cartItem.specialRequest}</p>
            <p>Side Products: </p>
            {(cartItem.selectedSideProducts && cartItem.product.sideProducts.length > 0) && <ul>
                {cartItem.selectedSideProducts.map((selectedSideProduct, index) => {
                    const additionalCost =
                        selectedSideProduct.data.additionalCost ? <span>+${selectedSideProduct.data.additionalCost}</span> : null
                    return <li key={`sideOrder-${index}`}>{selectedSideProduct.data.name} {additionalCost}</li>
                })}
            </ul>}
            {!props.fixed && controlBtns}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
