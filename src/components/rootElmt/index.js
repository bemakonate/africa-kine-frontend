import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as asyncActions from '../../store/asyncActions';
import { withApollo } from '../../graphql/apollo';
import { PRODUCTS_QUERY } from '../../graphql/queries';
import { useQuery } from '@apollo/react-hooks';

const RootElmt = (props) => {
    const { getUserCart, cart } = props;
    const { data, loading, error } = useQuery(PRODUCTS_QUERY);

    const finishedLoading = !loading && data

    useEffect(() => {
        if (finishedLoading) {
            if (error) {
                //show there was an error getting products
            } else {
                getUserCart(data.restaurantProducts);
            }
        }
    }, [loading]);

    useEffect(() => {
        if (finishedLoading) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart])

    return props.children;
}


const mapStateToProps = state => {
    return {
        cart: state.order.cart,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getUserCart: (allProducts) => dispatch(asyncActions.getUserCart(allProducts)),
    }
}


export default withApollo(connect(mapStateToProps, mapDispatchToProps)(RootElmt));
