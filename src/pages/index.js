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
          title="Menu | Order | West African | Harlem"
          jsonLD={restaurantStructuredData}
          desc="View Africa Kine Restaurant menu, Order Online and Pick up, Call Africa Kine Phone Number, and Best Senegalese in Harlem" />
        <div className="page-home" >
          <header className="jumbotron">
            {homePage.jumbotronBackground && <div className="jumbotron-bg">
              <Image className="jumbotron-bg-img mobile-img" src={homePage.jumbotronBackground.formats.small.url} alt="Africa Kine Restaurant" layout="fill" />
              <Image className="jumbotron-bg-img desktop-img" src={homePage.jumbotronBackground.formats.large.url} alt="Africa Kine Restaurant" layout="fill" />
              <div className="jumbotron-bg-img-overlay"></div>
            </div>}


            <div className="jumbotron-content global__container">
              <h1 className="jumbotron-title">Africa Kine <br />Restaurant</h1>
              <div className="jumbotron__btns">
                <Link href="/menu"><button className="jumbotron__btn">Vist Menu</button></Link>
                <Link href="/ordering"><button className="jumbotron__btn">Order Now</button></Link>
                <Link href="/contact"><button className="jumbotron__btn">Contact Now</button></Link>
              </div>
            </div>

          </header>

          <section className="section__intro">
            <div className="global__container">
              <h2>Welcome!!</h2>
              <p>Enter into the spirit of the <strong>Africa Kine Restaurant </strong>located in the center of Harlem. Here at Africa Kine in Harlem we can confidently say you will experience some of the best senegalese and west african food New York City has to offer. Publications from the <a className="embedded-link" href="https://www.nytimes.com/2016/02/03/dining/hungry-city-africa-kine-harlem.html" target="__blank">New York Times</a> and <a className="embedded-link" href="https://ny.eater.com/venue/65804/africa-kine-restaurant" target="__blank">Eater NY</a> will support the fact that we are a highly respected restaurant. Other than the fact that we are well respected, we are also well loved by our customers. Thanks to our dedicated staff members who will not only try to deliver your food in an orderly fashion, but build relationships with our costumers. Thus, creating the spirit and vibe of community while our customers bond over delicious food. Order and pick up to experience the vibe or simply use our website to make the experience easier.</p>
            </div>
          </section>

          {homePage.popularProducts.length > 0 && <section className="section__popular-menu" >
            <div className="global__container">
              <h2 className="popular-menu__title">Menu</h2>
              <div className="popular-menu__container">
                {homePage.popularProducts && <MenuProducts products={homePage.popularProducts} />}
              </div>
              <Link href="/menu" className="popular-menu__link">View Full Menu</Link>
            </div>
          </section>}

          <div className="contact-order-group global__section-padding">
            <section className="section__contact">
              <h2 className="section__contact-title">Contact Us</h2>
              <span>Don't be afraid to give us a phone call. We have reception ready to answer your phone call. Sometimes we are very business due to high demand so please be patient and wait your turn, we will do our best to recieve your call.</span>
              <Link href="/contact" className="contact-link__btn">Go to contact</Link>
            </section>

            <section className="section__order">
              <h2 className="section__contact-title">Order Online</h2>
              <span>We at Africa Kine give our customer the option to order online and have delivery from a wide variety of platforms that they think is the best fit for them.To order you give a phone call &#40;Contact page&#41; or go our ordering page &#40;link below&#41; </span>
              <Link href="/ordering" className="order-link__btn">Go order online</Link>
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
                    alt="Africa Kine Restaurant"
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
