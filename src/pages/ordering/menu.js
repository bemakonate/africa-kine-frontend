import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import MenuCategories from '../../components/resuable/menuCategories';
import * as orderActions from '../../store/order/actions';
import * as asyncActions from '../../store/asyncActions';
import { getPopulatedCart, getCartSubTotal, getSingleOrderTotal } from '../../constants/helpers/cart-helpers'
import { withApollo } from '../../graphql/apollo';
import { MENU_QUERY } from '../../graphql/queries';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import CartComponent from '../../components/layout/cart';

const MenuPage = (props) => {
    const router = useRouter();


    const pickUpTime = props.pickUpTime ? props.pickUpTime.toString() : null
    const { loading, error, data } = useQuery(MENU_QUERY, { variables: { pickUpTime: pickUpTime || '' } });

    const [cartSubTotal, setCartSubTotal] = useState(0);
    const [showCart, setShowCart] = useState(false);

    useEffect(() => {
        const run = async () => {
            const populatedCart = await getPopulatedCart(props.cart);
            const newCartSubTotal = getCartSubTotal(populatedCart);
            setCartSubTotal(newCartSubTotal);
        }
        run();
    }, [props.cart])


    useEffect(() => {
        if (!props.pickUpTime) {
            router.push('/ordering');
        }

    }, [props.pickUpTime])

    let contentJSX = null;
    if (loading) {
        contentJSX = <p>Loading...</p>
    }
    else if (!loading && data) {
        const { restaurantCategories: categories } = data;
        contentJSX = (
            <div>
                <MenuCategories categories={categories} orderingMode />
            </div>
        )
    }


    return (
        <Layout>
            {contentJSX}
            {(props.cart && props.cart.length > 0) && <div className="cart-footer">
                <span>{props.cart.length}</span>
                <span onClick={() => setShowCart(true)}>View Orders </span>
                <span>${cartSubTotal}</span>
            </div>}
            {showCart && <CartComponent
                cart={props.cart}
                removeFromCart={props.removeFromCart}
                openProductModal={props.openProductModal}
                closeCartModal={() => setShowCart(false)} />}
            <style jsx>{`
            .cart-footer{
                padding:10px;
                border:1px solid black;
                position:fixed;
                bottom:0;
                left:0;
                width:100%;
                display:flex;
                justify-content:space-around;
                background:white;
            }
            
            `}</style>
        </Layout>

    )
}


const mapStateToProps = state => {
    return {
        pickUpTime: state.order.pickUpTime,
        cart: state.order.cart,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeFromCart: (index) => dispatch(orderActions.removeFromCart(index)),
        openProductModal: (data) => dispatch(asyncActions.openProductModal(data)),
    }
}


export default withApollo(connect(mapStateToProps, mapDispatchToProps)(MenuPage));