import gql from 'graphql-tag';

export const PRODUCTS_QUERY = gql`
query getProducts {
  restaurantProducts {
    id
    name
    price
    description
    sideProductsPerQuantity
    sideProducts {
      id
      name
      additionalCost
    }
  }
}
`;