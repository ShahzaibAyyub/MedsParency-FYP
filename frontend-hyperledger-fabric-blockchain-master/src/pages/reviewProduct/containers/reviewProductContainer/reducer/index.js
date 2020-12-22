import { reviewProductConstants } from '../constants';

const initialState = {
  id: '',
  user_id: '',
  description: ''
};

export function reviewProduct(state = initialState, action) {
  switch (action.type) {
    case reviewProductConstants.UPDATE_REVIEW:
      return {
        ...state,
        ...action.payload
      };
    case reviewProductConstants.ADD_REVIEW:
      return {
        ...state,
        id: action.payload.id ? action.payload.id : '',
        user_id: action.payload.user_id ? action.payload.user_id : '',
        description: action.payload.description ? action.payload.description : ''
      };
    default:
      return state;
  }
}
