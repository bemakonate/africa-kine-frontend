import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as asyncActions from '../../store/asyncActions';
import { withApollo } from '../../graphql/apollo';
import { PRODUCTS_QUERY } from '../../graphql/queries';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
const RootElmt = (props) => {
    const { getUserCart, cart } = props;
    const { data, loading, error } = useQuery(PRODUCTS_QUERY);
    const router = useRouter();

    const finishedLoading = !loading && data;

    useEffect(() => {
        props.validateUserOrder({ router });
    }, [props.isUserOrderBeingProcessed])

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
        pickUpTime: state.order.pickUpTime,
        isUserOrderBeingProcessed: state.order.isUserOrderBeingProcessed,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getUserCart: (allProducts) => dispatch(asyncActions.getUserCart(allProducts)),
        validateUserOrder: ({ router }) => dispatch(asyncActions.validateUserOrder({ router })),
    }
}


export default withApollo(connect(mapStateToProps, mapDispatchToProps)(RootElmt));
