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
  categories: restaurantCategories {
    id
    title
    tagline
    subCategories {
      id
      title
      products {
        id
        name
        price
        description
        image {
          formats
        }
      }
    }
    products {
      id
      name
      price
      description
      image {
        formats
      }
    }
  }
}
`;
