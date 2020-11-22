export const TAX_RATE = process.env.GATSBY_TAX_RATE || .01;
export const FREE_SHIPPING_THRESHOLD = process.env.GATSBY_FREE_SHIPPING_THRESHOLD || 100;
export const SHIPPING_RATE = process.env.GATSBY_SHIPPING_RATE || 5;
import axios from 'axios';

export const cartSubtotal = (cart) => {

    const subtotal = cart.reduce((counter, product) => {
        return counter + (product.details.price * product.quantity)
    }, 0)
    return subtotal;
}


export const shouldPayShipping = (cart) => {
    const subtotal = cartSubtotal(cart);
    return subtotal < FREE_SHIPPING_THRESHOLD
}

export const getTaxes = (cart) => {
    const subtotal = cartSubtotal(cart);
    return subtotal * TAX_RATE;
}


export const cartTotal = (cart) => {
    if (!cart.length) {
        return 0;
    }
    const subtotal = cartSubtotal(cart);
    const shipping = shouldPayShipping(cart) ? SHIPPING_RATE : 0;
    const total = (subtotal * (1 + TAX_RATE)) + shipping;

    return total;
}



export const getPopulatedCart = async (cart) => {
    return await Promise.all(cart.map(async (cartItem) => {
        const { data: foundProduct } = await axios.get(`http://localhost:1337/restaurant-settings/products/${cartItem.productId}`);

        const foundSelectedSideProducts = cartItem.selectedSideProducts ? cartItem.selectedSideProducts.map(sideProduct => {
            return foundProduct.sideProducts.find(foundSideProduct => foundSideProduct.id === Number(sideProduct));
        }) : null;

        return {
            product: foundProduct,
            qty: cartItem.qty,
            selectedSideProducts: foundSelectedSideProducts,
            specialRequest: cartItem.specialRequest,
        }
    }))
}

export const getCartSubTotal = (populatedCart) => {
    let total = 0;
    if (populatedCart) {
        populatedCart.forEach(cartItem => {
            const cartItemTotal = getSingleOrderTotal({
                price: cartItem.product.price,
                qty: cartItem.qty,
                selectedSideProducts: cartItem.selectedSideProducts
            })
            total += cartItemTotal;
        })

    }

    return total;
}

export const getSingleOrderTotal = ({ price, qty, selectedSideProducts }) => {
    let total = price * qty;
    if (selectedSideProducts) {
        selectedSideProducts.map(selecteSideProduct => {
            if (selecteSideProduct && selecteSideProduct.additionalCost) {
                total += selecteSideProduct.additionalCost;
            }
        })
    }

    if (!total) {
        return 0;
    }
    return total;
}


