import React from 'react';
import Layout from '../components/layout';
import initApolloFetch from '../constants/helpers/initApolloFetch';
import MenuCategories from '../components/resuable/menuCategories';
import * as asyncActions from '../store/asyncActions'
import { withApollo } from '../graphql/apollo';
import { MENU_QUERY } from '../graphql/queries';
import styled from 'styled-components'
import { connect } from 'react-redux';

const MenuPage = (props) => {
    const { restaurantCategories: categories } = props.data;

    const categoriesJSX = categories.map(category => {
        const subCategoriesJSX = category.subCategories.map(subCategory => {
            const productsJSX = subCategory.products.map(product => (
                <div className="product" onClick={() => props.openProductModal({ props: { productId: product.id } })}>
                    <h4 className="product-title">{product.name}</h4>
                    <p className="product-price">${product.price}</p>
                    <p className="product-description">{product.description}</p>

                </div>
            ))

            return (
                <div>
                    <h3>{subCategory.title}</h3>
                    <div className="products"> {productsJSX} </div>
                </div>

            )
        })

        return (
            <div>
                <h1>{category.title}</h1>
                <div className="categories">{subCategoriesJSX}</div>
            </div>
        )
    })




    return (
        <Layout>
            <MenuPageStyles>
                {categoriesJSX}
            </MenuPageStyles>
        </Layout>

    )
}

const MenuPageStyles = styled.div`
.products{
    display:grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap:20px;

}

.product{
    display:grid;
    grid-template-columns: 1fr 100px;
    grid-row-gap:10px;
    margin-bottom:10px;
}

.product-description{
    grid-column: 1/-1;
    margin:0;
}
.product-title{
    margin:0;
}

.product-price{
    margin:0;
    text-align:right;
}
`;

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
