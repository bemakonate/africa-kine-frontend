import Layout from '../components/layout';
import MenuProducts from '../components/resuable/menuCategories/menuProducts';
import { formatPhoneNum } from '../constants/helpers';
import { Container, Button } from '../styles/base';
import axios from 'axios';
import Link from '../components/resuable/link';
import moment from 'moment';
import classes from "../styles/modules/workingHoursContainer.module.scss";



const Home = ({ homePage, businessHours, businessInfo }) => {
  const restuarantImgURL = "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG5ldyUyMHlvcmt8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60";
  return (
    <Layout>
      <div className="page-home">
        <div className="jumbotron">
          <div className="global__container">
            <h1>{businessInfo.companyName}</h1>
            <div className="jumbotron__btns">
              <Link href="/contact"><button className="jumbotron__btn">Contact Us</button></Link>
              <Link href="/menu"><button className="jumbotron__btn">Menu</button></Link>
              <Link href="/ordering"><button className="jumbotron__btn">Order</button></Link>
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
              <MenuProducts products={homePage.popularProducts.products} />
            </div>
            <Link href="/menu" className="popular-menu__link">View Full Menu</Link>
          </div>
        </section>

        <div className="contact-order-group global__section-padding">
          <section className="section__contact">
            <h2>Contact Us</h2>
            <span>Give us a call ?</span>
            <Link href="/contact" className="contact-link__btn">Contact Us</Link>
          </section>

          <section className="section__order">
            <h2>Order Online</h2>
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
                  <img src={restuarantImgURL} alt="Resturant Image" />
                </div>
              </div>

              <div className="business-info-group">
                <div className="business-info__details">
                  <div className="business-info__row">
                    <h4 className="business-info__label">Address</h4>
                    <p className="business-info__detail">{businessInfo.location}</p>
                  </div>

                  <div className="business-info__row">
                    <h4 className="business-info__label">Phone</h4>
                    <p className="business-info__detail">{formatPhoneNum(businessInfo.phone)}</p>
                  </div>
                  <div className="business-info__row">
                    <h4 className="business-info__label">Email</h4>
                    <p className="business-info__detail">{businessInfo.email}</p>
                  </div>
                </div>


                <div className="business-info__hours">
                  <h3 className="business-info__hours-title">Hours</h3>
                  <WorkingHours businessHours={businessHours} />
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
    </Layout >
  )
}

// ========================================================================
// ========================================================================
// WORKING HOURS
// ========================================================================
// ========================================================================

const WorkingHours = ({ businessHours }) => {

  //Business Hours JSX
  const openHours = JSON.parse(businessHours.open);
  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
  const businessHoursJSX = [];

  for (const prop in openHours) {
    const dayHours = openHours[prop];
    let dayHoursJSX = <li className="day-hours-list_item">closed</li>;

    if (dayHours) {
      const dayHoursArr = [];
      for (let i = 0; i < dayHours.length; i += 2) {
        dayHoursArr.push(
          <li className="day-hours-list_item" key={i}>
            {moment(dayHours[i], "HH:mm").format('hh:mm a')} - {moment(dayHours[i + 1], "HH:mm").format('hh:mm a')}
          </li>
        );
      }
      dayHoursJSX = dayHoursArr;
    }


    businessHoursJSX.push((
      <li className={classes.weekHoursDayRow} key={prop}>
        <span className={classes.daySlotsLabel}>{days[prop]}</span>
        <ul className={classes.daySlotsRows}> {dayHoursJSX}</ul>
      </li>
    ))

  }

  return (
    <div className={classes.workingHoursContainer}>
      <ul className={classes.weekHours}>
        {businessHoursJSX}
      </ul>
    </div>

  )
}

Home.getInitialProps = async (ctx) => {

  const res = await Promise.all([
    axios.get('http://localhost:1337/home-page'),
    axios.get('http://localhost:1337/business-info'),
    axios.get('http://localhost:1337/restaurant-settings/business'),
  ]);

  const homePage = res[0].data;
  const businessInfo = res[1].data;
  const businessHours = res[2].data.business.hours;

  return { homePage, businessInfo, businessHours };
}
export default Home;
