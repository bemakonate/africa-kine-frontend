import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import * as asyncActions from '../store/asyncActions'
import { connect } from 'react-redux';
import initApolloFetch from '../constants/helpers/initApolloFetch';
import { withApollo } from '../graphql/apollo';
import { MENU_QUERY, PRODUCT_QUERY } from '../graphql/queries';
import { useApolloClient } from '@apollo/react-hooks';


const mapDispatchToProps = dispatch => {
    return {
        openProductModal: (data) => dispatch(asyncActions.openProductModal(data)),
    }
}

const MenuProducts = connect(null, mapDispatchToProps)((props) => {
    return props.products.map(product => {
        console.log(product.isOpenForPickUp)
        return (
            <div key={product.id} className="product" onClick={() => props.openProductModal({ props: { productId: product.id } })} >
                <p>Name: {product.name}</p>
                <p>Description: {product.description}</p>
                <p>Price: ${product.price}</p>
                <p>{product.isOpenForPickUp && <span className="active-product">*Available Now</span>}</p>
                <button>More Details</button>
                <style jsx>{`
                    .product{
                        border:1px solid black;
                        padding:10px;
                        margin-bottom:10px;
                    }

                    .active-product{
                        color:green;
                    }
                `}

                </style>
            </div>
        )
    })
});




const MenuCategory = (props) => {
    const category = props.category;

    const [subCategoryId, setSubCategoryId] = useState(null);
    const foundSubCategory = category.subCategories.find(subCategory => subCategoryId === subCategory.id);
    let subCategoryProductsJSX = null;

    useEffect(() => {
        if (!subCategoryId) {
            if (category.subCategories.length > 0) {
                setSubCategoryId(category.subCategories[0].id)
            } else {
                setSubCategoryId('all')
            }
        }
    }, [subCategoryId])


    if (foundSubCategory) {
        subCategoryProductsJSX = <MenuProducts products={foundSubCategory.products} />
    }
    else if (subCategoryId === 'all') {
        subCategoryProductsJSX = <MenuProducts products={category.products} />
    }
    else {
        subCategoryProductsJSX = "This subcategory doesn't exist"
    }

    return (
        <article key={category.id}>
            <h2>{category.title}</h2>
            <p>---{category.description}----</p>
            <ul>
                {category.subCategories.map((subCategory) => (
                    <li onClick={() => setSubCategoryId(subCategory.id)}>{subCategory.title}</li>
                ))}
                <li onClick={() => setSubCategoryId('all')}>All Category Products</li>
            </ul>
            <div>
                {subCategoryProductsJSX}
            </div>

        </article>
    )

}
const MenuCategories = (props) => {
    return props.categories.map(category => {
        return <MenuCategory category={category} />

    })
}

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
