import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';

const SEO = ({ title, description }) => {

    const [seoData, setSeoData] = useState(null);

    useEffect(() => {
        const run = async () => {
            const res = await axios.get(`${process.env.CMS_REST_API_URL}/seo`);
            setSeoData(res.data);
        }
        run();
    }, []);


    let seoJSX = null;
    if (seoData) {
        seoJSX = (
            <React.Fragment>
                <title> {title} | {seoData.title}</title>
                <meta name="description" content={description || seoData.description} />
                <meta property="og:title" content={seoData.title} />
                <meta property="og:description" content={seoData.description} />
                <meta property="og:url" content={process.env.SITE_URL} />
                <meta property="og:type" content="website" />
            </React.Fragment>
        )
    }
    return (
        <Head>
            <link rel="shortcut icon" href="/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            {seoJSX}
        </Head>

    )
}

export default SEO;