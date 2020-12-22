import { productConstants } from '../constants';

const initialState = {
  max_id: 0,
  products_listing: [],
  reviewed_products_ids: []
};

const initialUserState = {
  user_id: 'f.sh@ymail.com',
  email: 'f.sh@ymail.com',
  firstName: 'Asad',
  lastName: 'Manzoor',
  balance: 35000,
  puchased_products_ids: [],
  puchasedProducts: []
};

export function productsFetch(state = initialState, action) {
  switch (action.type) {
    case productConstants.FETCH_SUCCESS:
      let reviewed_ids = [];
      let maximum_id = 3;
      if (action.payload.data) {
        action.payload.data.forEach((product) => {
          let product_id = product.Record.id.replace('ID', '');
          product_id = parseInt(product_id);
          if (product_id > maximum_id) {
            maximum_id = product_id;
          }
          product.Record.reviews.forEach((review) => {
            if (review.userId === initialUserState.user_id) {
              reviewed_ids.push(product.Record.id);
            }
          });
        });
      }

      return {
        ...state,
        max_id: parseInt(maximum_id) + 1,
        products_listing: action.payload.data ? action.payload.data : [],
        reviewed_products_ids: reviewed_ids
      };
    case productConstants.FETCH_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case productConstants.PURCHASE_PRODUCT_SUCCESS:
      return {
        ...state,
        error: action.payload
      };
    case productConstants.PURCHASE_PRODUCT_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

export function userFetch(state = initialUserState, action) {
  switch (action.type) {
    case productConstants.FETCH_USER_SUCCESS:
      let puchased_products_ids = [];
      action.payload.data.puchasedProducts.forEach((puchased_product) => {
        puchased_products_ids.push(puchased_product.productId);
      });

      return {
        ...state,
        user_id: action.payload.data.id,
        email: action.payload.data.email,
        firstName: action.payload.data.firstName,
        lastName: action.payload.data.lastName,
        balance: action.payload.data.balance,
        puchased_products_ids: puchased_products_ids,
        puchasedProducts: action.payload.data.puchasedProducts
      };
    case productConstants.FETCH_USER_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
