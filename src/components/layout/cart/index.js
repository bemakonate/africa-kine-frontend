import React, { useEffect, useState } from 'react';
import { getPopulatedCart, getCartSubTotal, getSingleOrderTotal } from '../../../constants/helpers/cart-helpers'


const CartComponent = (props) => {

    const [cart, setCart] = useState(null);

    let cartJSX = null;

    useEffect(() => {
        const run = async () => {
            const newCart = await getPopulatedCart(props.cart);
            setCart(newCart);
        }
        run();
    }, [props.cart])


    const cartSubTotal = getCartSubTotal(cart);
    if (cart && cart.length > 0) {
        cartJSX = cart.map((cartItem, index) => {
            const cartItemTotal = getSingleOrderTotal({
                price: cartItem.product.price,
                qty: cartItem.qty,
                selectedSideProducts: cartItem.selectedSideProducts,
            })


            return (
                <div className="cart-item">
                    <div className="cart-item-content">
                        <span onClick={() => props.removeFromCart(index)}>x</span>
                        <span>{cartItem.qty}</span>
                        <div>
                            <h3 className="product-title">{cartItem.product.name}</h3>
                            {cartItem.selectedSideProducts &&
                                cartItem.selectedSideProducts.map((selectedSideProduct) => <span>{selectedSideProduct.name}</span>)}

                        </div>

                        <span onClick={() => props.openProductModal({
                            props: {
                                productId: cartItem.product.id,
                                qty: cartItem.qty,
                                specialRequest: cartItem.specialRequest,
                                selectedSideProducts: cartItem.selectedSideProducts,
                                cartIndex: index,
                                editMode: true,
                                orderingMode: true,
                            }
                        })}>Edit</span>
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
        })
    }



    return (
        <>
            <div className="cart-container">
                <div onClick={props.closeCartModal}>Close</div>
                <div>
                    {cartJSX}
                    <div>
                        Cart Subtotal: <span>{cartSubTotal}</span>
                    </div>
                </div>
                <button>Proceed to Checkout</button>

            </div>
            <style jsx>{`
        .cart-container{
            width:100%;
            height:100%;
            position:fixed;
            top:0;
            left:0;
            z-inde:10;
            background:rgba(209, 209, 209);
        }
     
        `}

            </style>
        </>
    )
}

export default CartComponent;