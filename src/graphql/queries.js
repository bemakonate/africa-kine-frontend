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

export const PRODUCT_QUERY = gql`
query getProduct{
  restaurantProduct {
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

export const MENU_QUERY = gql`
query getMenu {
  restaurantCategories {
    id
    title
    tagline
    description
    subCategories {
      id
      title
      products {
        id
        name
        price
        description
        sideProducts {
          id
          name
          additionalCost
          description
        }
      }
    }
    products {
      id
      name
      price
      description
    }
  }
}



`;