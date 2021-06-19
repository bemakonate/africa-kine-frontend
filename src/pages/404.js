import React from 'react'
import Layout from '../components/layout';
import SEO from '../components/resuable/SEO';

const NotFoundPage = () => {
    return (
        <Layout>
            <SEO title="Page Not Found" />
            <div className="global__container">
                <h1>Page Not Found</h1>
                <p>Sorry but this site doesn't recognize this link</p>
            </div>
        </Layout>
    )
}

export default NotFoundPage
