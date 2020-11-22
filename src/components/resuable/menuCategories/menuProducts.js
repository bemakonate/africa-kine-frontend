import React, { useState, useEffect } from 'react';
import * as asyncActions from '../../../store/asyncActions'
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        pickUpTime: state.order.pickUpTime,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        openProductModal: (data) => dispatch(asyncActions.openProductModal(data)),
    }
}

const MenuProducts = connect(mapStateToProps, mapDispatchToProps)((props) => {
    const pickUpTime = props.pickUpTime ? props.pickUpTime.toString() : null;
    return props.products.map(product => {
        return (
            <div key={product.id} className="product" onClick={() => props.openProductModal({ props: { productId: product.id, orderingMode: props.orderingMode, pickUpTime: pickUpTime } })} >
                <p>Name: {product.name}</p>
                <p>Description: {product.description}</p>
                <p>Price: ${product.price}</p>
                <p>{(product.isOpenForPickUp && props.orderingMode) && <span className="active-product">*Available For Pick Up</span>}</p>
                <style jsx>{`
                    .product{
                        border:1px solid black;
                        padding:10px;
                        margin-bottom:10px;
                    }

                    .active-product{
                        color:green;
                    }
                `}

                </style>
            </div>
        )
    })
});

export default MenuProducts;