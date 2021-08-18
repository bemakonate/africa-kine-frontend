import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import MenuCategories from '../components/resuable/menuCategories';
import SEO from '../components/resuable/SEO';
import ErrorPage from '../pages/_error';
import axios from '../constants/instances/backend';
import { getRestaurantStructuredData, getMenuSections } from '../constants/helpers';
// import { MENU_QUERY } from '../graphql/queries';
// import { client } from '../graphql/apolloClient';


const MenuPage = ({ categories, businessInfo, businessHours, error }) => {
    let MenuPageJSX = null;

    const restaurantStructuredData = getRestaurantStructuredData({ businessInfo, businessHours });
    const menuStructuredData = {
        "@type": "Menu",
        "inLanguage": "English",
        "hasMenuSection": getMenuSections(categories),
    }


    const newRestaurantStructuredData = {
        ...restaurantStructuredData,
        "hasMenu": { ...menuStructuredData }
    }


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
                    <h1 className="menu-page-title">Our <br /> West African /<br /> Sengalese Menu</h1>
                    <MenuCategories categories={categories} />
                </div>
            </React.Fragment>
        )

    }



    return (
        <Layout businessInfo={businessInfo}>
            <SEO title="Menu - view all of our west african dishes" desc="Africa Kine menu offers a wide variety of sengalese and west african food for you to select from. Our interactive website menu allows you to see the price and description of each food" jsonLD={newRestaurantStructuredData} />
            <div>
                {MenuPageJSX}
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
