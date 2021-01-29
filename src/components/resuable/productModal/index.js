import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as layoutActions from '../../../store/layout/actions';
import Backdrop from '../backdrop';
import styled from 'styled-components';
import axios from 'axios';


const productModal = (props) => {

    if (!props.productId) {
        return <p>productId prop must be passed</p>
    }


    const [loadingProduct, setLoadingProduct] = useState(true);
    const [loadingProductFailed, setLoadingProductFailed] = useState(false);
    const [product, setProduct] = useState(null);


    useEffect(() => {
        const run = async () => {
            setLoadingProduct(true);
            const product = await getProduct(props.productId);

            if (product) {
                setProduct(product);
                setLoadingProductFailed(false);
                setLoadingProduct(false);
            } else {
                setLoadingProductFailed(true);
                setLoadingProduct(false);
            }
        }
        run();
    }, [])




    const getProduct = async (productId) => {
        try {
            const res = await axios.get(`http://localhost:1337/restaurant-settings/products/${productId}`);
            return res.data;
        } catch (err) {
            console.log(err);
            return null;
        }
    }




    let modalContentJSX = null;
    if (!loadingProduct && !loadingProductFailed) {
        const { name, description, price, sideProducts, sideProductsPerQuantity, categories } = product;

        const menuContentJSX = (<>
            <header className="header">
                <div className="header-content">
                    <h2 className="header-title">{name}</h2>
                    <span>${price}</span>
                </div>
            </header>

            <main className="main">
                <div>
                    <p>{description}</p>
                </div>

                <div>
                    <h4 className="sideOrders-title">Side Orders</h4>
                    <ul className="sideOrders">
                        {sideProducts.map(sideProduct => {
                            const extraCost = sideProduct.additionalCost > 0 && <span>+${sideProduct.additionalCost}</span>
                            return <li className="sideOrderItem" key={sideProduct.id}>{sideProduct.name} {extraCost}</li>
                        })}
                    </ul>
                </div>

                <div>
                    <h4 className="categoriesList-title">Categories</h4>
                    <ul className="categoriesList">
                        {categories.map((category, index) => {
                            return <li className="categoryList-item" key={index}>{category.title}</li>
                        })}
                    </ul>
                </div>


            </main>
        </>);


        modalContentJSX = menuContentJSX;
    } else {
        modalContentJSX = <p>Failed getting product</p>
    }


    return (
        <Backdrop open handleClose={props.close}>
            <ProductModalStyles>
                <span className="close-modal" onClick={props.close}>X</span>
                {loadingProduct && <p>Loading...</p>}
                {modalContentJSX}
            </ProductModalStyles>
        </Backdrop>
    )
}


const ProductModalStyles = styled.div`
    /* padding:10px; */
    position:fixed;
    width:90%;
    margin-left:-45%;
    left:50%;
    top:10vh;
    z-index:100;
    background:white;
    border-radius:2px;
    overflow:hidden;

    .header{
        background:gold;
        position:relative;
        min-height: 150px;
        text-align: center;
        display:flex;
        align-items:center;
        justify-content:center;
    }

    .header-title{
        margin:0;
        margin-bottom:10px;
    }

    .close-modal{
        position:absolute;
        z-index:10;
        font-size:20px;
        top:10px;
        left:10px;
    }

    .main{
        padding:10px;
    }

    .sideOrders-title{
        margin:0 0 10px;
    }

    .sideOrders{
        padding-left:0;
        list-style:none;
        margin:0;
        display:flex;
        flex-wrap:wrap;
    }

    .sideOrderItem{
        background:gray;
        color:white;
        padding: 3px 10px;
        border-radius:20px;
        margin-right:5px;
        margin-bottom:5px;
        display:inline-block;
    }

    .categoriesList{
        padding-left:0;
        list-style:none;
        margin:0;
        display:flex;
        flex-wrap:wrap;
    }

    .categoriesList-title{
        margin:0;
        margin-bottom:10px;
    }
    .categoryList-item{
        padding:5px;
        border-radius:2px;
        background:green;
        color:white;
    }

`;


const mapDispatchToProps = dispatch => {
    return {
        closeProductModal: () => dispatch(layoutActions.closeProductModal()),
    }
}

export default connect(null, mapDispatchToProps)(productModal)
