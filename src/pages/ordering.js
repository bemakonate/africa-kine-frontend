import React, { useState, useEffect } from 'react'
import Layout from '../components/layout';
import axios from '../constants/instances/backend';
import SEO from '../components/resuable/SEO';
import ErrorPage from '../pages/_error';
import * as gtag from '../../lib/gtag';

const Ordering = ({ orderingPage, error }) => {
    let OrderingPageJSX = null;

    const orderLinkClicked = (link) => {
        gtag.event({
            action: "order_link_clicked",
            category: "ecommerce",
            label: "Ordering Link",
            value: link
        })
    }

    if (error) {
        return <ErrorPage />
    }

    if (orderingPage) {
        OrderingPageJSX = (
            <div className="ordering-page">
                <div className="global__container">
                    <header className="page-header">
                        <h1 className="page-title">Ordering</h1>
                        <p className="page-tagline">Use our ordering platforms to order our products</p>
                    </header>

                    <div className="platform-links">
                        {orderingPage.orderingPlatforms.length > 0 && orderingPage.orderingPlatforms.map((orderingPlatform, index) => {
                            return orderingPlatform.name &&
                                <a onClick={() => orderLinkClicked(orderingPlatform.link)} key={`platform-${index}`} className="platform-link" href={orderingPlatform.link} target="_blank">
                                    {orderingPlatform.name}
                                </a>
                        })}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <Layout>
            <SEO title="Ordering" />
            {OrderingPageJSX}
        </Layout>

    )
}



export const getStaticProps = async (ctx) => {
    try {
        const res = await axios.get('/ordering-page');
        const orderingPage = res.data;
        return { props: { orderingPage } };
    } catch (error) {
        return { props: { error } };
    }

}

export default Ordering
