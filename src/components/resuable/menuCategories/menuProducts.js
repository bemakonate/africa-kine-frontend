import React, { useState, useEffect } from 'react';
import * as asyncActions from '../../../store/asyncActions'
import { connect } from 'react-redux';
import styled from 'styled-components';

const shortenText = (str, max) => {
    if (str.length > max) {
        return `${str.substring(0, max)}...`;
    }
    return str;

}

const MenuProducts = (props) => {
    return (
        <MenuProductsStyles>
            <div className="products">
                {props.products.map(product => (
                    <div
                        className="product"
                        key={product.id}
                        onClick={() => props.openProductModal({ props: { productId: product.id } })}>

                        <h3 className="product-title">{product.name}</h3>
                        <p className="product-price"> ${product.price}</p>
                        <p className="product-description">{shortenText(product.description, 100)}</p>
                    </div>
                ))}
            </div>
        </MenuProductsStyles>
    )
};


const MenuProductsStyles = styled.div`
.products{
    display:grid;
    grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));
    grid-gap:10px;
}

.product{
    display:grid;
    grid-template-columns: 1fr 100px;
    grid-template-rows: auto 1fr;
    grid-row-gap:10px;
    border:1px solid black;
    border-radius:2px;
    padding:10px;
    min-height:90px;
}


.product-description{
    grid-column: 1/-1;
    margin:0;
}
.product-title{
    margin:0;
}

.product-price{
    margin:0;
    text-align:right;
}
`;

const mapDispatchToProps = dispatch => {
    return {
        openProductModal: (data) => dispatch(asyncActions.openProductModal(data)),
    }
}

export default connect(null, mapDispatchToProps)(MenuProducts);