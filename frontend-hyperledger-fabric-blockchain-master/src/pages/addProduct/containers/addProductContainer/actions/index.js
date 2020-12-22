import { store } from 'react-notifications-component';

import { addProductConstants } from '../constants';
import { productService } from '../../../../../services';
import { history } from '../../../../../helpers';

const addProduct = (payload) => {
  return (dispatch) => {
    store.addNotification({
      title: '',
      message: 'New Product Added in progress',
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
      .addProduct(payload)
      .then((productData) => {
        dispatch({
          type: addProductConstants.ADD_PRODUCT,
          payload: productData.data
        });

        // dispatch(productService.fetchProducts());
        history.push('/');
        store.addNotification({
          title: 'New Product Addition',
          message: 'New Product Added Successfully',
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
        if (error.message) {
          store.addNotification({
            title: 'New Product Addition Failed',
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
};

export const addProductActions = {
  addProduct
};
