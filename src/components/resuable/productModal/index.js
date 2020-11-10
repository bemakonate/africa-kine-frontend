import ItemQty from '../itemQuantity';
import React, { useState, useEffect } from 'react';
import SideProductOptions from './sideProductOptions';
import { getSingleOrderTotal } from '../../../constants/helpers/custom-helpers';
import { MENU_QUERY, PRODUCT_QUERY } from '../../../graphql/queries';
import { useApolloClient } from '@apollo/react-hooks';

import { connect } from 'react-redux';
import * as layoutActions from '../../../store/layout/actions';
import * as orderActions from '../../../store/order/actions';

const productModal = (props) => {

    if (!props.productId) {
        return <p>productId prop must be passed</p>
    }

    const client = useApolloClient();
    const [loadingProduct, setLoadingProduct] = useState(true);
    const [loadingProductFailed, setLoadingProductFailed] = useState(false);
    const [product, setProduct] = useState(null);

    const [itemQuantity, setItemQuantity] = useState(props.qty);
    const [selectedSideProducts, setSelectedProducts] = useState(null);
    const [speicalRequestVal, setSpeicalRequestVal] = useState(props.specialRequest || '');

    // let product = null;

    const { addToCart, closeProductModal, editCartItem } = props;


    useEffect(() => {
        const run = async () => {
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




    const getSelectedSideProducts = (data) => setSelectedProducts(data);
    const getSpecialRequest = (e) => setSpeicalRequestVal(e.target.value);


    const getProduct = async (productId) => {
        try {
            const res = await client.query({ query: PRODUCT_QUERY, variables: { id: productId } })
            return res.data.restaurantProduct;
        } catch (err) {
            return null;
        }
    }


    const validatedOrder = () => {
        let isAllSideOrdersSelected = true;
        if (selectedSideProducts) {
            selectedSideProducts.forEach(selectedSideProduct => {
                if (!selectedSideProduct.data) {
                    isAllSideOrdersSelected = false;
                }
            })
        }

        if (!isAllSideOrdersSelected) {
            alert("Must select all side orders given");
            return null;
        }

        const orderData = {
            product: props.product,
            qty: itemQuantity,
            selectedSideProducts: selectedSideProducts,
            specialRequest: speicalRequestVal,
        }

        return orderData;
    }

    const addOrderToCart = () => {
        const orderData = validatedOrder();
        if (orderData) {
            addToCart(orderData);
            closeProductModal();
            alert("Item was added to cart")
        }

    }

    const changeProductOrder = () => {
        const orderData = validatedOrder();
        if (orderData) {
            editCartItem({ index: props.cartIndex, newCartItem: orderData });
            closeProductModal();
            alert("Saved item to cart");
        }
    }

    let modalContentJSX = null;
    if (!loadingProduct && !loadingProductFailed) {
        const { name, description, price, sideProducts, sideProductsPerQuantity } = product;
        const singleOrderTotal = getSingleOrderTotal({ price: price, qty: itemQuantity, selectedSideProducts: selectedSideProducts })

        const menuContentJSX = (<>
            <header>
                <h2>{name}</h2>
                <span>Available Now</span>
                <div>${price}</div>
            </header>


            <h4>Side Orders:</h4>
            <ul>
                {sideProducts.map(sideProduct => {
                    const extraCost = sideProduct.additionalCost > 0 && <span>+${sideProduct.additionalCost}</span>
                    return <li key={sideProduct.id}>{sideProduct.name} {extraCost}</li>
                })}
            </ul>

            <h4>Description:</h4>
            <p>{description}</p>
        </>);

        const orderProductContentJSX = (<>

            <header>
                <h2>{name}</h2>
                <span>Available Now</span>
                <div>${price}</div>
            </header>

            <div>
                <p>Quantity: </p>
                <ItemQty defaultNum={props.qty} getQuantity={setItemQuantity} />
            </div>

            {sideProductsPerQuantity && sideProducts.length > 0 ? <div className="side-order-container">
                <p>You can have {sideProductsPerQuantity} side order(s) per quantity</p>
                <SideProductOptions
                    qty={itemQuantity * sideProductsPerQuantity}
                    sideProducts={sideProducts}
                    getSelectedSideProducts={getSelectedSideProducts}
                    selectedSideProducts={props.selectedSideProducts}
                />
            </div> : <p>No Side Orders Available</p>}

            <div className="special-request">
                <p>Special Request:</p>
                <textarea name="" onChange={getSpecialRequest} defaultValue={speicalRequestVal}></textarea>
            </div>


            <div className="modal-order-subtotal">
                <p>Order Subtotal:</p>
                <p>${singleOrderTotal}</p>
            </div>

            {!props.editMode && <button onClick={addOrderToCart}>Add To Cart</button>}
            {props.editMode && <button onClick={changeProductOrder}>Save Changes</button>}

            <button onClick={closeProductModal}>Cancel</button>

        </>);


        modalContentJSX = props.orderingMode ? orderProductContentJSX : menuContentJSX;
    } else {
        modalContentJSX = <p>Failed getting product</p>
    }

    return (
        <div className="modal">
            <div className="close" onClick={props.close}>X</div>
            {loadingProduct && <p>Loading...</p>}
            {modalContentJSX}
            <style jsx>{`
        .modal{
            border:1px solid black;
            padding:10px;
        }
         `} </style>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (cartItem) => dispatch(orderActions.addToCart(cartItem)),
        editCartItem: ({ index, newCartItem }) => dispatch(orderActions.editCartItem({ index, newCartItem })),
        closeProductModal: () => dispatch(layoutActions.closeProductModal()),
    }
}

export default connect(null, mapDispatchToProps)(productModal)
