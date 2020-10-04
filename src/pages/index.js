import Layout from '../components/layout';
import testProducts from '../constants/products';
import * as asyncActions from '../store/asyncActions'
import { connect } from 'react-redux';


const index = (props) => {

  const products = testProducts;
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
}

const mapDispatchToProps = dispatch => {
  return {
    openProductModal: (data) => dispatch(asyncActions.openProductModal(data)),
  }
}

export default connect(null, mapDispatchToProps)(index);
