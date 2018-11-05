import { GET_PRODUCTS_BY_CATEGORY } from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_BY_CATEGORY:
      return action.payload;
    default:
      return state;
  }
}
