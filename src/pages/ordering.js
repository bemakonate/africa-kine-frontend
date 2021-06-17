import React from 'react'
import Layout from '../components/layout';
import axios from '../constants/instances/backend';
import SEO from '../components/resuable/SEO';

const Ordering = (props) => {
    return (
        <Layout>
            <SEO title="Ordering" />
            <div className="ordering-page">
                <div className="global__container">
                    <header className="page-header">
                        <h1 className="page-title">Ordering</h1>
                        <p className="page-tagline">Use our ordering platforms to order our products</p>
                    </header>

                    <div className="platform-links">

                        {props.orderingPage.orderingPlatforms.map((orderingPlatform, index) => {
                            return (
                                <a key={`platform-${index}`} className="platform-link" href={orderingPlatform.link} target="_blank">
                                    {orderingPlatform.name}
                                </a>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Layout>

    )
}



Ordering.getInitialProps = async (ctx) => {

    const res = await axios.get('/ordering-page');

    const orderingPage = res.data;
    return { orderingPage };
}

export default Ordering
