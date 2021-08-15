import React from 'react';
import Layout from '../components/layout';
import MenuProducts from '../components/resuable/menuCategories/menuProducts';
import axios from '../constants/instances/backend';
import Link from '../components/resuable/link';
import BusinessDetails from '../components/resuable/businessDetails';
import SEO from '../components/resuable/SEO';
import ErrorPage from '../pages/_error';
import Image from '../components/resuable/image';
import { getRestaurantStructuredData } from '../constants/helpers';


const Home = ({ businessInfo, error, homePage, businessHours }) => {
  let HomePageJSX = null;

  if (error) {
    return <ErrorPage />
  }

  if (businessInfo && homePage) {
    const restaurantStructuredData = getRestaurantStructuredData({ businessInfo, businessHours });


    HomePageJSX = (
      <React.Fragment>
        <SEO
          title="The best sengalese food in Harlem, New York City"
          jsonLD={restaurantStructuredData}
          desc="The Africa Kine restaurant is the place where you will find the best sengalese and west african food in Harlem, New York. Make sure to visit the Africa Kine website for more information." />
        <div className="page-home" >
          <header className="jumbotron">
            {homePage.jumbotronBackground && <div className="jumbotron-bg">
              <Image className="jumbotron-bg-img mobile-img" src={homePage.jumbotronBackground.formats.small.url} alt="Business jumbtron image" layout="fill" />
              <Image className="jumbotron-bg-img desktop-img" src={homePage.jumbotronBackground.formats.large.url} alt="Business jumbtron image" layout="fill" />
              <div className="jumbotron-bg-img-overlay"></div>
            </div>}


            <div className="jumbotron-content global__container">
              <h1 className="jumbotron-title">The Best <br /> Sengalese <br /> Food in Harlem </h1>
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

          {homePage.popularProducts.length > 0 && <section className="section__popular-menu" >
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
                  {homePage.restaurantImage && <Image
                    className="restaurant-image"
                    src={homePage.restaurantImage.formats.medium.url}
                    alt="Restaurant Image"
                    layout="fill" />}
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
      </React.Fragment>

    )
  }


  return (
    <Layout>

      {HomePageJSX}
    </Layout >
  )
}


export const getStaticProps = async (ctx) => {
  try {

    const res = await Promise.all([
      axios.get(`/home-page`),
      axios.get(`/business-info`),
      axios.get('/restaurant-settings/business'),
    ]);

    const homePage = res[0].data;
    const businessInfo = res[1].data;
    const businessHours = res[2].data.business.hours;
    return { props: { homePage, businessInfo, businessHours } };
  } catch (error) {
    return { props: { error } };
  }

}

export default Home;
