import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import axios from '../constants/instances/backend';
import { AiFillPhone, AiOutlineSmile } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md'
import SEO from '../components/resuable/SEO';
import { formatPhoneNum } from '../constants/helpers/index';
import ErrorPage from '../pages/_error';
import LoadingBackdrop from '../components/resuable/loadingBackdrop';


const Contact = (props) => {
    let ContactPageJSX = <LoadingBackdrop />;

    const [contactPage, setContactPage] = useState(null);
    const [businessInfo, setBusinessInfo] = useState(null);
    const [loadingError, setLoadingError] = useState(false);

    useEffect(() => {
        const run = async () => {
            try {
                const res = await Promise.all([
                    axios.get(`/contact-page`),
                    axios.get(`/business-info`),
                ]);

                const contactPage = res[0].data;
                const businessInfo = res[1].data;


                setContactPage(contactPage);
                setBusinessInfo(businessInfo);
            } catch (error) {
                setLoadingError(true);
            }
        }
        run();
    }, [])

    if (loadingError) {
        return <ErrorPage />
    }

    if (contactPage && businessInfo) {

        const emailAddress = `mailto:${contactPage.contactEmail}?subject=Mail from Our Site`;
        const phoneNum = formatPhoneNum(businessInfo.phone);

        ContactPageJSX = (
            <div className="global__container">
                <header className="page-contact__header">
                    <h1 className="page-contact__title">Contact</h1>
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
                                <p className="contact-details__detail">{contactPage.contactEmail}</p>
                            </div>
                        </div>
                        <p className="contact-text">{contactPage.contactText}</p>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <Layout>
            <SEO title="Contact" />
            <div className="page-contact">
                {ContactPageJSX}
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
