import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from '../../constants/instances/backend';

const SEO = ({ title, desc, jsonLD }) => {

    return (
        <Head>

            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <title> Africa Kine Restaurant &#124; {title} </title>
            <meta name="description" content={desc} />
            <meta property="og:title" content={`${title} | Africa Kine Restaurant`} />
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

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}>

            </script>




        </Head>

    )
}

export default SEO;