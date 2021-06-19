import React from 'react'
import SEO from '../components/resuable/SEO';
import Layout from '../components/layout';

const Error = () => {
    return (
        <Layout>
            <SEO title="Error" />
            <div className="global__container">
                <h1>We apologize there was an error</h1>
            </div>
        </Layout>
    )
}

export default Error
