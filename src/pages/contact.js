import React from 'react';
import Layout from '../components/layout';
import axios from '../constants/instances/backend';
import { AiFillPhone, AiOutlineSmile } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md'
import SEO from '../components/resuable/SEO';
import { formatPhoneNum } from '../constants/helpers/index';

const Contact = (props) => {

    const emailAddress = `mailto:${props.contactPage.contactEmail}?subject=Mail from Our Site`;
    const phoneAddress = `tel:${formatPhoneNum(props.businessInfo.phone)}`;
    let ContactPageJSX = null;

    if (props.contactPage && props.businessInfo) {
        ContactPageJSX = (
            <div className="page-contact">
                <div className="global__container">
                    <header className="page-contact__header">
                        <h1 className="page-contact__title">Contact</h1>
                        <p className="page-contact__tagline">Reach out and we will do our best to respond <AiOutlineSmile className="page-contact__tagline-icon" /></p>
                    </header>

                    <main className="contact__main-content">
                        <div className="action-btns">
                            <a href={phoneAddress} className="call-btn">
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
                                    <p className="contact-details__detail">{formatPhoneNum(props.businessInfo.phone)}</p>
                                </div>
                                <div className="contact-details__row">
                                    <p className="contact-details__label">Email</p>
                                    <p className="contact-details__detail">{props.contactPage.contactEmail}</p>
                                </div>
                            </div>
                            <p className="contact-text">{props.contactPage.contactText}</p>
                        </div>
                    </main>
                </div>


            </div>
        )
    }

    return (
        <Layout>
            <SEO title="Contact" />
            {ContactPageJSX}
        </Layout>
    )
}

Contact.getInitialProps = async (ctx) => {

    const res = await Promise.all([
        axios.get(`/contact-page`),
        axios.get(`/business-info`),
    ]);

    const contactPage = res[0].data;
    const businessInfo = res[1].data;
    return { contactPage, businessInfo };
}

export default Contact;
