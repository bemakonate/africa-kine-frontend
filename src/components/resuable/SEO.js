import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from '../../constants/instances/backend';

const SEO = ({ title, description }) => {

    const [seoData, setSeoData] = useState(null);

    useEffect(() => {
        const run = async () => {
            const res = await axios.get(`/seo`);
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

            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            {seoJSX}
        </Head>

    )
}

export default SEO;