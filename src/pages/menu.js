import React from 'react';
import Layout from '../components/layout';
import initApolloFetch from '../constants/helpers/initApolloFetch';
import MenuCategories from '../components/resuable/menuCategories';
import * as asyncActions from '../store/asyncActions'
import { withApollo } from '../graphql/apollo';
import { MENU_QUERY } from '../graphql/queries';
import { connect } from 'react-redux';
import SEO from '../components/resuable/SEO';

const MenuPage = (props) => {
    let MenuPageJSX = null;

    if (props.data && props.data.restaurantCategories) {
        const { restaurantCategories: categories } = props.data;
        MenuPageJSX = (
            <React.Fragment>
                <nav className="menu-nav">
                    <div className="global__container">
                        <div className="menu-nav__content-container">
                            {categories && categories.map(category => (
                                <a key={category.id} className="menu-nav__item" href={`#category-${category.id}`}>{category.title}</a>
                            ))}
                        </div>
                    </div>
                </nav>
                <div className="menu-container">
                    <h1 className="menu-page-title">Menu</h1>
                    <MenuCategories categories={categories} />
                </div>
            </React.Fragment>
        )

    }


    return (
        <Layout>
            <SEO title="Menu" />
            {MenuPageJSX}
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
