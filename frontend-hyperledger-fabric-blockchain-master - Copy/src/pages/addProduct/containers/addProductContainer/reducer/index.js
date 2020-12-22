import { addProductConstants } from '../constants';

const initialState = {
  id: '',
  name: '',
  description: '',
  image: '',
  color: 'white',
  docType: '',
  quantity: 0,
  make: '2020',
  owner: '',
  price: 0
};

export function addProduct(state = initialState, action) {
  if (action.type === addProductConstants.ADD_PRODUCT) {
    return {
      ...state,
      ...action.payload
    };
  }
  return state;
}
