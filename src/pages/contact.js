import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import axios from '../constants/instances/backend';
import { AiFillPhone, AiOutlineSmile } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md'
import SEO from '../components/resuable/SEO';
import { formatPhoneNum } from '../constants/helpers/index';
import ErrorPage from '../pages/_error';
import LoadingBackdrop from '../components/resuable/loadingBackdrop';


import contactPage from '../constants/data/contact-page.json'
import businessInfo from '../constants/data/business-info.json'

const Contact = ({ error }) => {
    if (error) {
        return <ErrorPage />
    }

    let emailAddress = null;
    let phoneNum = null;
    if (contactPage && businessInfo) {
        emailAddress = `mailto:${contactPage.contactEmail}?subject=Mail from Our Site`;
        phoneNum = formatPhoneNum(businessInfo.phone);
    }

    return (
        <Layout businessInfo={businessInfo}>
            <SEO title="Contact us and call our phone number" desc="Would you like to contact us? View and call Africa Kine phone number from our contact page, or send us an email for possible registrations and other events" />
            <div className="page-contact">

                <div className="global__container">
                    <header className="page-contact__header">
                        <h1 className="page-contact__title">Contact &amp; <br /> Phone Number</h1>
                        <p className="page-contact__tagline">Reach out and we will do our best to respond <AiOutlineSmile className="page-contact__tagline-icon" /></p>
                    </header>

                    <main className="contact__main-content">
                        <div className="action-btns">
                            <a href={`tel:${phoneNum}`} className="call-btn">
                                Call <AiFillPhone className="action-btn__icon" />
                            </a>
                            <a href={emailAddress} target="_blank" className="email-btn">
                                Email Us <MdEmail className="action-btn__icon" />
                            </a>
                        </div>

                        <div>
                            <div className="contact-details">
                                <div className="contact-details__row">
                                    <p className="contact-details__label">Phone</p>
                                    <p className="contact-details__detail">{phoneNum}</p>
                                </div>
                                <div className="contact-details__row">
                                    <p className="contact-details__label">Email</p>
                                    {contactPage && <p className="contact-details__detail">{contactPage.contactEmail}</p>}
                                </div>
                            </div>
                            {contactPage && <p className="contact-text">{contactPage.contactText}</p>}
                        </div>
                    </main>
                </div>
            </div>
        </Layout>
    )
}

// export const getStaticProps = async (ctx) => {
//     try {

//         const res = await Promise.all([
//             axios.get(`/contact-page`),
//             axios.get(`/business-info`),
//         ]);

//         const contactPage = res[0].data;
//         const businessInfo = res[1].data;
//         return { props: { contactPage, businessInfo } };
//     } catch (error) {
//         return { props: { error } };
//     }

// }

export default Contact;
