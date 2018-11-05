import { INCREMENT_CART_ITEMS, DECREMENT_CART_ITEMS } from '../actions/types';

const initialState = {
  cartItems: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_CART_ITEMS:
      return { ...state, cartItems: state.cartItems + 1 };
    case DECREMENT_CART_ITEMS:
      return { ...state, cartItems: state.cartItems - 1 };
    default:
      return state;
  }
};
