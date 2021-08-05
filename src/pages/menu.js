import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import MenuCategories from '../components/resuable/menuCategories';
import SEO from '../components/resuable/SEO';
import ErrorPage from '../pages/_error';
import axios from '../constants/instances/backend';
import { schemaDataHiddenInputs, openHoursToDateTime, priceRangeToDollars } from '../constants/helpers';
// import { MENU_QUERY } from '../graphql/queries';
// import { client } from '../graphql/apolloClient';


const MenuPage = ({ categories, businessInfo, businessHours, error }) => {


    let MenuPageJSX = null;
    const openHours = JSON.parse(businessHours.open);
    const openHoursDateTime = openHoursToDateTime(openHours)


    const restaurantScope = { itemScope: 'null', itemType: "https://schema.org/Restaurant" }
    const restaurantSchemaData = [
        { itemprop: 'image', content: businessInfo.companyImage ? businessInfo.companyImage.url : 'null' },
        { itemprop: 'name', content: businessInfo.companyName },
        { itemprop: 'address', content: businessInfo.location },
        { itemprop: 'telephone', content: businessInfo.phone },
        { itemprop: 'menu', content: `${process.env.SITE_URL}/menu` },
        { itemprop: 'servesCuisine', content: businessInfo.servesCuisine },
        { itemprop: 'url', content: process.env.SITE_URL },
        { itemprop: 'openingHours', content: openHoursDateTime },
        { itemprop: 'priceRange', content: priceRangeToDollars(businessInfo.priceRange) }
    ]

    const menuScope = { itemScope: 'null', itemprop: 'hasMenu', itemType: 'https://schema.org/Menu' }
    const menuSchemaData = [{ itemprop: 'inLanguage', content: 'English' }]


    if (error) {
        return <ErrorPage />
    }

    if (categories) {
        const sortedCategories = [...categories].sort((c1, c2) => Number(c1.id) - Number(c2.id));

        MenuPageJSX = (
            <React.Fragment>
                <nav className="menu-nav">
                    <div className="global__container">
                        <div className="menu-nav__content-container">
                            {sortedCategories && sortedCategories.map(category => (
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
            <div {...restaurantScope}>
                {schemaDataHiddenInputs(restaurantSchemaData)}

                <div {...menuScope}>
                    {schemaDataHiddenInputs(menuSchemaData)}
                    {MenuPageJSX}
                </div>

            </div>

        </Layout>

    )
}


export const getStaticProps = async (ctx) => {
    try {
        // const res = await axios.get('/restaurant-settings/categories');
        // const categories = res.data;
        // const { data } = await client.query({ query: MENU_QUERY })


        const res = await Promise.all([
            axios.get('/restaurant-settings/categories'),
            axios.get(`/business-info`),
            axios.get('/restaurant-settings/business'),
        ])

        const categories = res[0].data;
        const businessInfo = res[1].data;
        const businessHours = res[2].data.business.hours;

        return { props: { categories, businessInfo, businessHours } };
    } catch (error) {
        return { props: { error } };
    }

};


export default MenuPage;
