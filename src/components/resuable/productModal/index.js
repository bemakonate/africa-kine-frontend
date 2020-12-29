import ItemQty from '../itemQuantity';
import React, { useState, useEffect } from 'react';
import SideProductOptions from './sideProductOptions';
import { getSingleOrderTotal } from '../../../constants/helpers/cart-helpers';
import { MENU_QUERY, PRODUCT_QUERY } from '../../../graphql/queries';
import { useApolloClient } from '@apollo/react-hooks';

import { connect } from 'react-redux';
import * as layoutActions from '../../../store/layout/actions';
import * as orderActions from '../../../store/order/actions';
import Backdrop from '../backdrop';
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
            const res = await client.query({
                query: PRODUCT_QUERY, variables: {
                    id: productId,
                    pickUpTime: props.pickUpTime ? props.pickUpTime.toString() : 'null'
                }
            })

            return res.data.restaurantProduct;
        } catch (err) {
            console.log(err);
            return null;
        }
    }


    const validatedOrder = () => {
        let isAllSideOrdersSelected = true;
        if (selectedSideProducts) {
            selectedSideProducts.forEach(selectedSideProduct => {
                if (!selectedSideProduct) {
                    isAllSideOrdersSelected = false;
                }
            })
        }

        if (!isAllSideOrdersSelected) {
            props.openFlashMessage({ content: "Please choose each side order", isTemporary: true });
            return null;
        }

        const orderData = {
            productId: product.id,
            qty: itemQuantity,
            selectedSideProducts: selectedSideProducts ? selectedSideProducts.map(sideProduct => sideProduct.id) : null,
            specialRequest: speicalRequestVal,
        }


        return orderData;
    }

    const addOrderToCart = () => {
        const orderData = validatedOrder();

        if (orderData) {
            addToCart(orderData);
            closeProductModal();
            props.openFlashMessage({ content: "Item was added to cart", isTemporary: true })
        }

    }

    const changeProductOrder = () => {
        const orderData = validatedOrder();
        if (orderData) {
            editCartItem({ index: props.cartIndex, newCartItem: orderData });
            closeProductModal();
            props.openFlashMessage({ content: "Saved changes to cart", isTemporary: true })
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

        </>);


        modalContentJSX = (props.orderingMode && product.isOpenForPickUp) ? orderProductContentJSX : menuContentJSX;
    } else {
        modalContentJSX = <p>Failed getting product</p>
    }


    return (
        <Backdrop open handleClose={props.close}>
            <div className="modal">
                <div className="close" onClick={props.close}>X</div>
                {loadingProduct && <p>Loading...</p>}
                {modalContentJSX}
                <style jsx>{`
        .modal{
            border:3px solid red;
            padding:10px;
            position:fixed;
            width:100%;
            top:0;
            left:0;
            z-index:100;
            background:white;
        
        }
         `} </style>
            </div>
        </Backdrop>
    )
}


const mapStateToProps = state => {
    return {
        pickUpTime: state.order.pickUpTime,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (cartItem) => dispatch(orderActions.addToCart(cartItem)),
        editCartItem: ({ index, newCartItem }) => dispatch(orderActions.editCartItem({ index, newCartItem })),
        closeProductModal: () => dispatch(layoutActions.closeProductModal()),
        openFlashMessage: (data) => dispatch(layoutActions.openFlashMessage(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(productModal)
