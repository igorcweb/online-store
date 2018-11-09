import {
  RESET_CART_ITEMS,
  UPDATE_CART_ITEMS,
  TOGGLE_CART,
  UPDATE_CART
} from '../actions/types';

const initialState = {
  cartItems: localStorage.getItem('cartItems') || 0,
  cartShowing: false,
  cart: JSON.parse(localStorage.getItem('cart')) || []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_CART_ITEMS:
      return { ...state, cartItems: 0 };
    case UPDATE_CART_ITEMS:
      return { ...state, cartItems: action.payload };
    case UPDATE_CART:
      return { ...state, cart: action.payload };
    case TOGGLE_CART:
      return { ...state, cartShowing: !state.cartShowing };
    default:
      return state;
  }
};
