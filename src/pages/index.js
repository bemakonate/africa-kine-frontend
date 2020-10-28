import Layout from '../components/layout';
import * as asyncActions from '../store/asyncActions'
import { connect } from 'react-redux';
import initApolloFetch from '../constants/helpers/initApolloFetch';
import { withApollo } from '../graphql/apollo';
import { PRODUCTS_QUERY } from '../graphql/queries';

const Home = (props) => {
  const { restaurantProducts: products } = props.data;

  return (
    <Layout>
      {products.map(product => (
        <div className="product" key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <div>${product.price}</div>
          <button onClick={() => props.openProductModal({ props: { product } })}>Order Now</button>
        </div>
      ))}

    </Layout>
  )
  return null;
}

Home.getInitialProps = async ctx => {
  const res = await initApolloFetch(ctx, { query: PRODUCTS_QUERY });
  return res;
};

const mapDispatchToProps = dispatch => {
  return {
    openProductModal: (data) => dispatch(asyncActions.openProductModal(data)),
  }
}

export default withApollo(connect(null, mapDispatchToProps)(Home));
