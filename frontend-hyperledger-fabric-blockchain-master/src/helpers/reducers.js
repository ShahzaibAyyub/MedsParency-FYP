import { combineReducers } from 'redux';

import { productsFetch } from '../pages/product/containers/productListingContainer/reducers/index';
import { addProduct } from '../pages/addProduct/containers/addProductContainer/reducer';
import { updateProduct } from '../pages/updateProduct/containers/updateProductContainer/reducer';
import { reviewProduct } from '../pages/reviewProduct/containers/reviewProductContainer/reducer';
import { userFetch } from '../pages/product/containers/productListingContainer/reducers/index';

export const rootReducer = combineReducers({
  USER: userFetch,
  PRODUCTS: productsFetch,
  ADD_PRODUCT: addProduct,
  UPDATE_PRODUCT: updateProduct,
  REVIEW_PRODUCT: reviewProduct
});
