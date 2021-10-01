import React, { useState, useEffect } from 'react'
import Layout from '../components/layout';
import axios from '../constants/instances/backend';
import SEO from '../components/resuable/SEO';
import ErrorPage from '../pages/_error';
import * as gtag from '../../lib/gtag';

import orderingPage from '../constants/data/ordering-page.json';
import businessInfo from '../constants/data/business-info.json';

const Ordering = ({ error }) => {
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
                        <h1 className="page-title">Order Online from <br />Our Delivery Platforms!</h1>
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
        <Layout businessInfo={businessInfo}>
            <SEO title="Order Online and Delivery" desc="Africa Kine has a flexible option of ordering platforms you can order from. If you want to order online online you can call us. And we have the option of delivery" />
            {OrderingPageJSX}
        </Layout>

    )
}




// export const getStaticProps = async (ctx) => {
//     try {

//         const res = await Promise.all([
//             axios.get('/ordering-page'),
//             axios.get(`/business-info`),

//         ])

//         const orderingPage = res[0].data;
//         const businessInfo = res[1].data;

//         return { props: { orderingPage, businessInfo } };
//     } catch (error) {
//         return { props: { error } };
//     }

// }

export default Ordering
