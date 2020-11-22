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
query getProduct($id: ID, $pickUpTime:String){
  restaurantProduct(id: $id, pickUpTime: $pickUpTime) {
    id
    name
    price
    description
    sideProductsPerQuantity
    isOpenForPickUp
    sideProducts {
      id
      name
      additionalCost
    }
  }
}
`;

export const MENU_QUERY = gql`
query getMenu($pickUpTime:String) {
  restaurantCategories(pickUpTime:$pickUpTime) {
    id
    title
    description
    subCategories {
      id
      title
      products {
        id
        name
        price
        description
        isOpenForPickUp
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
      isOpenForPickUp
    }
  }
}



`;