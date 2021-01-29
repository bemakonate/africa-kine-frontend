import Layout from '../components/layout';
import MenuProducts from '../components/resuable/menuCategories/menuProducts';
import styled from 'styled-components';


const data = [
  {
    "id": 1,
    "name": "Beacon, Egg, and Cheese",
    "price": 3,
    "sideProductsPerQuantity": 2,
    "description": "How it used to be",
  },
  {
    "id": 2,
    "name": "Beacon, Egg, and Cheese",
    "price": 3,
    "sideProductsPerQuantity": 2,
    "description": "How it used to be",
  }
]

const Home = (props) => {

  return (
    <Layout>
      <HomePageStyles>
        <header className="jumbotron">
          <div className="jumbo-container">
            <h1>African Kine</h1>
            <div>
              <a className="jumbo__contact-btn" href="#">Contact</a>
              <a className="jumbo__order-btn" href="#">Order Online</a>
            </div>
          </div>
        </header>

        <section className="intro">
          <div className="container">
            <h2>Welcome</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, laboriosam. Optio iure quaerat architecto sit non nulla quia neque? Laudantium esse pariatur reiciendis nisi? Eius explicabo quasi beatae dignissimos assumenda laudantium quo blanditiis, porro, maiores eos non laborum cum, sed veritatis quaerat sequi distinctio? Qui dicta quasi asperiores pariatur et, suscipit non iure accusantium nesciunt amet a dolor</p>
          </div>
        </section>

        <section className="menu">
          <div className="container">
            <h2 className="menu-title">Popular Products</h2>
            <div className="popular-products">
              <MenuProducts products={data} />
            </div>
            <div className="menu-link-container">
              <a className="menu-link" href="#">View Full Menu</a>
            </div>

          </div>
        </section>

        <section className="contact-link">
          <h2>Contact Us?</h2>
          <span>Give us a call?</span>
          <a href="#">Contact</a>
        </section>

        <section className="order-link">
          <h2>Order Online</h2>
          <span>Use our flexible ordering platforms</span>
          <a href="#">Order Online</a>
        </section>

        <section>
          <div className="container">
            <h2>Business Info</h2>
            <div>-----------Insert Resturant Image--------</div>
            <div>
              <h4>Address</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, fugit.</p>
            </div>

            <div>
              <h2>Hours</h2>
              <ul className="week-hours">
                <li className="day-hours">
                  <span>Mon:</span>
                  <ul className="day-hours_list">
                    <li className="day-hours-list_item">8:00am - 10am</li>
                    <li className="day-hours-list_item">8:00am - 10am</li>
                  </ul>
                </li>
                <li className="day-hours">
                  <span>Tues:</span>
                  <ul className="day-hours_list">
                    <li className="day-hours-list_item">closed</li>

                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </HomePageStyles>
    </Layout>
  )
}


const HomePageStyles = styled.div`
  .week-hours{
    padding-left:0;
    list-style:none;
  }

  .day-hours_list{
    padding-left:0;
    list-style:none;
  }

  .day-hours{
    margin-bottom:10px;
  }

  .day-hours{
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap:10px;
  }

  .jumbotron{
    height:50vh;
    display:flex;
    align-items:center;
    justify-content:center;
    text-align:center;
  }

  .jumbo__contact-btn,
  .jumbo__order-btn{
    text-align: center;
    text-decoration: none;
    padding: 5px 20px;
    border-radius: 2px;
    font-size: 20px;
    color: white;
    background: gray;

  }


  .jumbo__contact-btn{
    margin-right:10px;
  }

  .intro{
    text-align:center;
  }

  .menu-title{
    text-align:center;
  }

  .menu-link{
    text-decoration: none;
    text-align:center;
    padding: 5px 20px;
    border-radius: 2px;
    font-size: 20px;
    color:white;
    background:green;
    display:inline-block;
    margin-top:30px;
  }

  .menu-link-container{
    display:flex;
    justify-content:center;
  }

  .contact-link,
  .order-link{
    display:flex;
    flex-direction:column;
    align-items:center;
  }
`;


export default Home;
