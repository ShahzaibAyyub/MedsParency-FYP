import { productConstants } from '../constants';
import { productService } from '../../../../../services';
import { store } from 'react-notifications-component';

export const productActions = {
  fetchUser,
  fetchProducts,
  purchaseProduct
};

function fetchUser() {
  return (dispatch) => {
    productService
      .fetchUser()
      .then((user) => {
        Promise.resolve(
          dispatch({
            type: productConstants.FETCH_USER_SUCCESS,
            payload: user.data
          })
        );
      })
      .catch((error) => {
        dispatch({
          type: productConstants.FETCH_USER_FAILURE,
          payload: error
        });
        if (error.message) {
          store.addNotification({
            title: 'There is an error fetching user information',
            message: error.message,
            type: 'danger',
            insert: 'top',
            container: 'top-right',
            animationIn: ['animated', 'fadeIn'],
            animationOut: ['animated', 'fadeOut'],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });
        }
      });
  };
}

function fetchProducts() {
  return (dispatch) => {
    store.addNotification({
      title: '',
      message: 'Fetching Products in progress',
      type: 'info',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: {
        duration: 3000,
        onScreen: true
      }
    });

    productService
      .fetchProducts()
      .then((products) => {
        Promise.resolve(
          dispatch({
            type: productConstants.FETCH_SUCCESS,
            payload: products.data
          })
        );
      })
      .catch((error) => {
        dispatch({
          type: productConstants.FETCH_FAILURE,
          payload: error
        });
        if (error.message) {
          store.addNotification({
            title: 'There is an error fetching products listing!',
            message: error.message,
            type: 'danger',
            insert: 'top',
            container: 'top-right',
            animationIn: ['animated', 'fadeIn'],
            animationOut: ['animated', 'fadeOut'],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });
        }
      });
  };
}

function purchaseProduct(product_id, user_id) {
  return (dispatch) => {
    store.addNotification({
      title: '',
      message: 'Product purchase in progress',
      type: 'info',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: {
        duration: 3000,
        onScreen: true
      }
    });

    productService
      .purchaseProduct(product_id, user_id)
      .then((products) => {
        Promise.resolve(
          dispatch({
            type: productConstants.PURCHASE_PRODUCT_SUCCESS,
            payload: products.data
          })
        );

        // dispatch(productService.fetchProducts());
        store.addNotification({
          title: 'Product Purchase',
          message: 'Product Purchased Successfully',
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animated', 'fadeIn'],
          animationOut: ['animated', 'fadeOut'],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
      })
      .catch((error) => {
        dispatch({
          type: productConstants.PURCHASE_PRODUCT_FAILURE,
          payload: error
        });
        if (error.message) {
          store.addNotification({
            title: 'There is an error purchasing product',
            message: error.message,
            type: 'danger',
            insert: 'top',
            container: 'top-right',
            animationIn: ['animated', 'fadeIn'],
            animationOut: ['animated', 'fadeOut'],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });
        }
      });
  };
}
