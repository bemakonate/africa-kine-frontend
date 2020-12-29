import React from 'react';
import Layout from '../../components/layout';
import MenuCategories from '../../components/resuable/menuCategories';
import * as orderActions from '../../store/order/actions';
import * as asyncActions from '../../store/asyncActions';
import { withApollo } from '../../graphql/apollo';
import { MENU_QUERY } from '../../graphql/queries';
import CartFooter from '../../components/layout/cart/cart-footer';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';



const MenuPage = (props) => {
    const pickUpTime = props.pickUpTime ? props.pickUpTime.toString() : 'null'
    const { loading, error, data } = useQuery(MENU_QUERY, { variables: { pickUpTime } });

    console.log(data);
    let contentJSX = null;
    if (loading) {
        contentJSX = <p>Loading...</p>
    }
    else if (!loading && data) {
        const { restaurantCategories: categories } = data;
        contentJSX = (
            <React.Fragment>
                <MenuCategories categories={categories} orderingMode />
                <CartFooter />
            </React.Fragment>

        )
    }

    return (
        <Layout>
            {contentJSX}

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