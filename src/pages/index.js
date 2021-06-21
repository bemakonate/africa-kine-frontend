import Layout from '../components/layout';
import MenuProducts from '../components/resuable/menuCategories/menuProducts';
import axios from '../constants/instances/backend';
import Link from '../components/resuable/link';
import BusinessDetails from '../components/resuable/businessDetails';
import SEO from '../components/resuable/SEO';



const Home = ({ homePage, businessInfo, err }) => {

  const restaurantImageURL = "https://cdn.vox-cdn.com/thumbor/dOajW3T9Jj9D6vUdNCxsiJAbTMA=/0x0:2048x1360/1200x0/filters:focal(0x0:2048x1360):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/15970304/ThreeGreat107KineExterior.jpg"

  let HomePageJSX = null;

  if (businessInfo && homePage) {
    HomePageJSX = (
      <div className="page-home">
        <div className="jumbotron">
          <div className="global__container">
            <h1>{businessInfo.companyName}</h1>
            <div className="jumbotron__btns">
              <Link href="/menu"><button className="jumbotron__btn">Menu</button></Link>
              <Link href="/ordering"><button className="jumbotron__btn">Order</button></Link>
              <Link href="/contact"><button className="jumbotron__btn">Contact Us</button></Link>
            </div>
          </div>
        </div>

        <section className="section__intro">
          <div className="global__container">
            <h2>Welcome</h2>
            <p>{homePage.introductionText}</p>
          </div>
        </section>

        <section className="section__popular-menu">
          <div className="global__container">
            <h2 className="popular-menu__title">Popular Menu</h2>
            <div className="popular-menu__container">
              {homePage.popularProducts && <MenuProducts products={homePage.popularProducts} />}
            </div>
            <Link href="/menu" className="popular-menu__link">View Full Menu</Link>
          </div>
        </section>

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
                  <img className="restaurant-image" src={restaurantImageURL} alt="Restaurant Image" />
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


Home.getInitialProps = async (ctx) => {
  const res = await Promise.all([
    axios.get('/home-page'),
    axios.get('/business-info')
  ]);

  const homePage = res[0].data;
  const businessInfo = res[1].data;

  return { homePage, businessInfo };
}
export default Home;
