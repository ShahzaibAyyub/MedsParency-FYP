import { updateProductConstants } from '../constants';

const initialState = {
  id: '',
  name: '',
  description: '',
  image: '',
  color: '',
  docType: '',
  quantity: 0,
  make: '',
  owner: '',
  price: 0
};

export function updateProduct(state = initialState, action) {
  switch (action.type) {
    case updateProductConstants.UPDATE_PRODUCT:
      return {
        ...state,
        ...action.payload
      };
    case updateProductConstants.EDIT_PRODUCT:
      let product = action.product;

      return {
        ...state,
        id: product.Record.id ? product.Record.id : '',
        name: product.Record.name ? product.Record.name : '',
        description: product.Record.description ? product.Record.description : '',
        image: product.Record.image ? product.Record.image : '',
        color: product.Record.color ? product.Record.color : '',
        docType: product.Record.docType ? product.Record.docType : '',
        quantity: product.Record.quantity ? product.Record.quantity : 0,
        make: product.Record.make ? product.Record.make : '',
        owner: product.Record.owner ? product.Record.owner : '',
        price: product.Record.price ? product.Record.price : 0,
        reviews: product.Record.reviews ? product.Record.reviews : []
      };
    default:
      return state;
  }
}
