import React from 'react';
import Layout from '../components/layout';
import initApolloFetch from '../constants/helpers/initApolloFetch';
import MenuCategories from '../components/resuable/menuCategories';
import { withApollo } from '../graphql/apollo';
import { MENU_QUERY } from '../graphql/queries';



const MenuPage = (props) => {
    const { restaurantCategories: categories } = props.data;
    return (
        <Layout>
            <div>
                <MenuCategories categories={categories} />
            </div>
        </Layout>

    )
}

MenuPage.getInitialProps = async ctx => {
    const res = await initApolloFetch(ctx, { query: MENU_QUERY });
    return res;
};



export default withApollo(MenuPage);
