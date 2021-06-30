import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import MenuCategories from '../components/resuable/menuCategories';
import SEO from '../components/resuable/SEO';
import ErrorPage from '../pages/_error';
import axios from '../constants/instances/backend';
import LoadingBackdrop from '../components/resuable/loadingBackdrop';
import { shortenText } from '../constants/helpers';


const MenuPage = ({ restaurantCategories, error }) => {
    // let MenuPageJSX = <LoadingBackdrop />;

    // const [restaurantCategories, setRestaurantCategories] = useState(null);
    // const [loadingError, setLoadingError] = useState(false);

    // useEffect(() => {
    //     const run = async () => {
    //         try {
    //             const res = await axios.get('/restaurant-settings/categories');
    //             const data = res.data;
    //             setRestaurantCategories(data);
    //             setLoadingError(false);
    //         } catch (error) {
    //             setLoadingError(true);
    //         }
    //     }
    //     run();
    // }, [])

    let MenuPageJSX = null;



    if (error) {
        return <ErrorPage />
    }

    if (restaurantCategories) {
        const categories = restaurantCategories;
        const sortedCategories = categories.sort((c1, c2) => c1.id - c2.id);
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
            {MenuPageJSX}
        </Layout>

    )
}


export const getStaticProps = async (ctx) => {
    try {
        const res = await axios.get('/restaurant-settings/categories');
        const restaurantCategories = res.data;
        return { props: { restaurantCategories } };
    } catch (error) {
        return { props: { error } };
    }

};


export default MenuPage;
