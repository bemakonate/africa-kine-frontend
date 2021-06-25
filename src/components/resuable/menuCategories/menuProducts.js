import React, { useState, useEffect } from 'react';
import * as asyncActions from '../../../store/asyncActions'
import { connect } from 'react-redux';
import classes from '../../../styles/modules/menuProducts.module.scss';
import { shortenText } from '../../../constants/helpers';

const MenuProducts = (props) => {
    return (
        <div className={classes.products}>
            {props.products.map(product => (
                <div
                    className={classes.product}
                    key={product.id}
                    onClick={() => props.openProductModal({ props: { productId: product.id } })}>

                    <p className={classes.productTitle}>{product.name}</p>
                    {product.price > 0 && <p className={classes.productPrice}> ${product.price}</p>}
                    <p className={classes.productDescription}>{shortenText(product.description, 100)}</p>
                </div>
            ))}
        </div>
    )
};



const mapDispatchToProps = dispatch => {
    return {
        openProductModal: (data) => dispatch(asyncActions.openProductModal(data)),
    }
}

export default connect(null, mapDispatchToProps)(MenuProducts);