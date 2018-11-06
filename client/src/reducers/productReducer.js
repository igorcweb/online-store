import {
  GET_PRODUCTS_BY_CATEGORY,
  GET_PRODUCTS,
  SEARCH_PRODUCTS
} from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_BY_CATEGORY:
      return action.payload;
    case GET_PRODUCTS:
      return action.payload;
    case SEARCH_PRODUCTS:
      return action.payload;
    default:
      return state;
  }
}
