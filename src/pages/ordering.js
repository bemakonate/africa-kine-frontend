import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/resuable/SEO';
import ErrorPage from '../pages/_error';
import LoadingBackdrop from '../components/resuable/loadingBackdrop';
import useSWR from 'swr';

const Ordering = (props) => {
    const { data: orderingPage, error: orderingPageError } = useSWR('/ordering-page');
    let OrderingPageJSX = <LoadingBackdrop />;

    if (orderingPageError) return <ErrorPage />


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
                                <a key={`platform-${index}`} className="platform-link" href={orderingPlatform.link} target="_blank">
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



// export const getStaticProps = async (ctx) => {
//     try {
//         const res = await axios.get('/ordering-page');
//         const orderingPage = res.data;
//         return { props: { orderingPage } };
//     } catch (error) {
//         return { props: { error } };
//     }

// }

export default Ordering
