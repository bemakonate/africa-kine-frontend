import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import MenuProducts from '../components/resuable/menuCategories/menuProducts';
import axios from '../constants/instances/backend';
import Link from '../components/resuable/link';
import BusinessDetails from '../components/resuable/businessDetails';
import SEO from '../components/resuable/SEO';
import ErrorPage from '../pages/_error';
import LoadingBackdrop from '../components/resuable/loadingBackdrop';
import Image from '../components/resuable/image';

const fallbackImageURLs = ({ image, size = 'thumbnail' }) => {

  if (!image) {
    return null;
  }

  let imageURL;
  const imageFormats = image.formats;
  const imageFormatSizes = Object.keys(imageFormats);
  switch (size) {
    case 'thumbnail':
      return imageFormats.thumbnail.url;

    case 'small':
      if (imageFormatSizes.includes('small')) {
        imageURL = imageFormats.small.url;
      } else if (imageFormatSizes.includes('thumbnail')) {
        imageURL = imageFormats.thumbnail.url
      }
      break;

    case 'medium':
      if (imageFormatSizes.includes('medium')) {
        imageURL = imageFormats.medium.url;
      }
      else if (imageFormatSizes.includes('small')) {
        imageURL = imageFormats.small.url;
      }
      else if (imageFormatSizes.includes('thumbnail')) {
        imageURL = imageFormats.thumbnail.url
      }
      break;


    case 'large':
      if (imageFormatSizes.includes('large')) {
        imageURL = imageFormats.large.url;
      }
      else if (imageFormatSizes.includes('medium')) {
        imageURL = imageFormats.medium.url;
      }
      else if (imageFormatSizes.includes('small')) {
        imageURL = imageFormats.small.url;
      }
      else if (imageFormatSizes.includes('thumbnail')) {
        imageURL = imageFormats.thumbnail.url
      }
      break;
  }

  return imageURL;

}

const Home = (props) => {

  const [businessInfo, setBusinessInfo] = useState(null);
  const [homePage, setHomePage] = useState(null);
  const [loadingError, setLoadingError] = useState(false);

  let HomePageJSX = <LoadingBackdrop />;



  useEffect(() => {
    const run = async () => {
      try {
        const res = await Promise.all([
          axios.get('/home-page'),
          axios.get('/business-info')
        ]);

        const homePage = res[0].data;
        const businessInfo = res[1].data;

        setHomePage(homePage);
        setBusinessInfo(businessInfo);
        setLoadingError(false);

      } catch (error) {
        setLoadingError(true);
      }
    }

    run();

  }, [])




  if (loadingError) {
    return <ErrorPage />
  }

  if (businessInfo && homePage) {

    HomePageJSX = (
      <div className="page-home">
        <header className="jumbotron">
          {homePage.jumbotronBackground && <div className="jumbotron-bg">
            <img className="jumbotron-bg-img mobile-img"
              src={fallbackImageURLs({ image: homePage.jumbotronBackground, size: 'medium' })}
              alt="jumbotron background" />
            <img
              className="jumbotron-bg-img desktop-img"
              src={fallbackImageURLs({ image: homePage.jumbotronBackground, size: 'large' })}
              alt="jumbotron background" />
            <div className="jumbotron-bg-img-overlay"></div>
          </div>}


          <div className="jumbotron-content global__container">
            <h1 className="jumbotron-title">{businessInfo.companyName}</h1>
            <div className="jumbotron__btns">
              <Link href="/menu"><button className="jumbotron__btn">Menu</button></Link>
              <Link href="/ordering"><button className="jumbotron__btn">Order</button></Link>
              <Link href="/contact"><button className="jumbotron__btn">Contact Us</button></Link>
            </div>
          </div>

        </header>

        <section className="section__intro">
          <div className="global__container">
            <h2>Welcome!!</h2>
            <p>{homePage.introductionText}</p>
          </div>
        </section>

        {homePage.popularProducts.length > 0 && <section className="section__popular-menu">
          <div className="global__container">
            <h2 className="popular-menu__title">Popular Menu</h2>
            <div className="popular-menu__container">
              {homePage.popularProducts && <MenuProducts products={homePage.popularProducts} />}
            </div>
            <Link href="/menu" className="popular-menu__link">View Full Menu</Link>
          </div>
        </section>}

        <div className="contact-order-group global__section-padding">
          <section className="section__contact">
            <h2 className="section__contact-title">Contact Us</h2>
            <span>Give us a call ?</span>
            <Link href="/contact" className="contact-link__btn">Contact Us</Link>
          </section>

          <section className="section__order">
            <h2 className="section__contact-title">Order Online</h2>
            <span>Use our flexible ordering platforms</span>
            <Link href="/ordering" className="order-link__btn">Ordering Online</Link>
          </section>
        </div>

        <section className="section__business-info">
          <div className="global__container">
            <h2 className="business-info__title">Business Info</h2>
            <div className="main__business-info">
              <div className="restaurant-image__container">
                <div>
                  {homePage.restaurantImage && <img
                    className="restaurant-image"
                    src={fallbackImageURLs({ image: homePage.restaurantImage, size: 'medium' })}
                    alt="Restaurant Image" />}
                </div>

              </div>
              <BusinessDetails
                infoClass="business-info__details"
                infoLabelClass="business-info__label"
                hoursDayLabelClass="business-hours__label"
              />
            </div>
          </div>
        </section>
      </div>

    )
  }


  return (
    <Layout>
      <SEO title="Home" />
      {HomePageJSX}
    </Layout >
  )
}

export default Home;
