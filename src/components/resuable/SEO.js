import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from '../../constants/instances/backend';

const SEO = ({ title, description }) => {

    // const [seoData, setSeoData] = useState(null);

    // useEffect(() => {
    //     const run = async () => {
    //         const res = await axios.get(`/seo`);
    //         setSeoData(res.data);
    //     }
    //     run();
    // }, []);


    // let seoJSX = null;
    // if (seoData) {
    //     seoJSX = (
    //         <React.Fragment>
    //             <title> {title} | {seoData.title}</title>
    //             <meta name="description" content={description || seoData.description} />
    //             <meta property="og:title" content={seoData.title} />
    //             <meta property="og:description" content={seoData.description} />
    //             <meta property="og:url" content={process.env.SITE_URL} />
    //             <meta property="og:type" content="website" />
    //         </React.Fragment>
    //     )
    // }

    const desc = "Welcome to Africa Kine, located in the Heart of Harlem, where you will find some of the best African cuisine that the city of New York has to offer. With a service that is open to having interesting conversations and ready to take your order and ,if you want, give you strong advice on what you should order and try. ";
    return (
        <Head>

            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <title> {title} | Africa Kine Restaurant - Harlem - New York, NY 10300 - African</title>
            <meta name="description" content={desc} />
            <meta property="og:title" content="Africa Kine Restaurant - Harlem - New York 10300 - African" />
            <meta property="og:description" content={desc} />
            <meta property="og:url" content="https://www.africakinerestaurant.com/" />
            <meta property="og:type" content="website" />
            <meta property="og:locale" content="en_US" />


            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@africakine" />
            <meta name="twitter:title" content="Africa Kine" />
            <meta name="twitter:description" content={desc} />
            <meta name="twitter:image" content="https://uploads.africakinerestaurant.com/restaurantWebsiteImage.png" />




        </Head>

    )
}

export default SEO;