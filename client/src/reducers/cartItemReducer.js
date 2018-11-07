import { INCREMENT_CART_ITEMS, UPDATE_CART_ITEMS } from '../actions/types';

const initialState = {
  cartItems: localStorage.getItem('cartItems') || 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_CART_ITEMS:
      return { ...state, cartItems: state.cartItems + 1 };
    case UPDATE_CART_ITEMS:
      return { ...state, cartItems: action.payload };
    default:
      return state;
  }
};
