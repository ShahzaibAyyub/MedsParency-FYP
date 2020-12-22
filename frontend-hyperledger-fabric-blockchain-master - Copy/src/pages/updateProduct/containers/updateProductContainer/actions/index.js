import { store } from 'react-notifications-component';

import { updateProductConstants } from '../constants';
import { productService } from '../../../../../services';
import { history } from '../../../../../helpers';

const updateProduct = (payload) => {
  return (dispatch) => {
    store.addNotification({
      title: '',
      message: 'Product update in progress',
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
      .updateProduct(payload)
      .then((productData) => {
        dispatch({
          type: updateProductConstants.UPDATE_PRODUCT,
          payload: productData.data
        });

        // dispatch(productService.fetchProducts());

        history.push('/');
        store.addNotification({
          title: 'Product Update',
          message: 'New Product Updated Successfully',
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
            title: 'Product Update Failed',
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

export const updateProductActions = {
  updateProduct
};
