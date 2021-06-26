import React from 'react';
import Layout from '../components/layout';
import MenuCategories from '../components/resuable/menuCategories';
import SEO from '../components/resuable/SEO';
import ErrorPage from '../pages/_error';
import LoadingBackdrop from '../components/resuable/loadingBackdrop';
import useSWR from 'swr';

const MenuPage = (props) => {
    const { data: restaurantCategories, error: loadingError } = useSWR('/restaurant-settings/categories');
    let MenuPageJSX = <LoadingBackdrop />;

    if (loadingError) return <ErrorPage />;

    if (restaurantCategories) {
        const categories = restaurantCategories;
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


export default MenuPage;
