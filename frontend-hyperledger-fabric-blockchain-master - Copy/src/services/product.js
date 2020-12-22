import config from '../config';

const axios = require('axios');

export const productService = {
  fetchProducts,
  reviewProduct,
  fetchUser,
  addProduct,
  updateProduct,
  purchaseProduct
};
function fetchProducts() {
  const url = config.BASE_URL + config.API_ENDPOINTS.FETCH_PRODUCTS;
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    url
  };
  return axios(requestOptions);
}

function fetchUser() {
  const url = config.BASE_URL + config.API_ENDPOINTS.FETCH_USER + 'f.sh@ymail.com';
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    url
  };
  return axios(requestOptions);
}

function addProduct(product) {
  const { id, name, description, image, color, docType, make, price, quantity } = product;
  const url = config.BASE_URL + config.API_ENDPOINTS.STORE_PRODUCTS;

  let bodyFormData = new FormData();
  bodyFormData.set('id', id);
  bodyFormData.set('image', image);
  bodyFormData.set('name', name);
  bodyFormData.set('description', description);
  bodyFormData.set('color', color);
  bodyFormData.set('type', docType);
  bodyFormData.set('make', make);
  bodyFormData.set('price', price);
  bodyFormData.set('quantity', quantity);

  const requestOptions = {
    method: 'POST',
    withCredentials: false,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest'
    },
    data: bodyFormData,
    url
  };
  return axios(requestOptions);
}

function updateProduct(product) {
  const url = config.BASE_URL + config.API_ENDPOINTS.STORE_PRODUCTS;
  let { id, name, description, image, color, docType, make, price, quantity } = product;

  let bodyFormData = new FormData();
  bodyFormData.set('id', id);
  bodyFormData.set('name', name);
  bodyFormData.set('description', description);
  bodyFormData.set('image', image);
  bodyFormData.set('color', color);
  bodyFormData.set('type', docType);
  bodyFormData.set('make', make);
  bodyFormData.set('price', price);
  bodyFormData.set('quantity', quantity);

  const requestOptions = {
    method: 'POST',
    withCredentials: false,
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest'
    },
    data: bodyFormData,
    url
  };
  return axios(requestOptions);
}

function purchaseProduct(product_id, user_id) {
  const url = config.BASE_URL + config.API_ENDPOINTS.PURCHASE_PRODUCT;

  let bodyFormData = new FormData();
  bodyFormData.set('product_id', product_id);
  bodyFormData.set('user_id', user_id);

  const requestOptions = {
    method: 'POST',
    withCredentials: false,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest'
    },
    data: bodyFormData,
    url
  };
  return axios(requestOptions);
}

function reviewProduct(productData) {
  let { product_id, user_id, description, token } = productData;
  const url = config.BASE_URL + config.API_ENDPOINTS.REVIEW_PRODUCT;

  product_id = product_id.replace('ID', '');

  let bodyFormData = new FormData();
  bodyFormData.set('product_id', 'ID' + product_id);
  bodyFormData.set('user_id', user_id);
  bodyFormData.set('description', description);
  bodyFormData.set('token', token);

  const requestOptions = {
    method: 'POST',
    withCredentials: false,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest'
    },
    data: bodyFormData,
    url
  };
  return axios(requestOptions);
}
