import React from 'react';
import Layout from '../components/layout';
import initApolloFetch from '../constants/helpers/initApolloFetch';
import MenuCategories from '../components/resuable/menuCategories';
import * as asyncActions from '../store/asyncActions'
import { withApollo } from '../graphql/apollo';
import { MENU_QUERY } from '../graphql/queries';
import { connect } from 'react-redux';

const MenuPage = (props) => {
    const { restaurantCategories: categories } = props.data;


    return (
        <Layout>
            {/* {categoriesJSX} */}
            <div className="menu-container">
                <MenuCategories categories={categories} />
            </div>
        </Layout>

    )
}


MenuPage.getInitialProps = async ctx => {
    const res = await initApolloFetch(ctx, { query: MENU_QUERY });
    return res;
};

const mapDispatchToProps = dispatch => {
    return {
        openProductModal: (data) => dispatch(asyncActions.openProductModal(data)),
    }
}


export default withApollo(connect(null, mapDispatchToProps)(MenuPage));
