import {
  RESET_CART_ITEMS,
  UPDATE_CART_ITEMS,
  TOGGLE_CART,
  UPDATE_CART,
  GET_FINAL_ORDER,
  GET_SUBTOTAL
} from '../actions/types';

const initialState = {
  cartItems: localStorage.getItem('cartItems') || 0,
  cartShowing: false,
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  order: [],
  subtotal: 0
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
    case GET_FINAL_ORDER:
      return { ...state, order: action.payload };
    case GET_SUBTOTAL:
      return { ...state, subtotal: action.payload };
    default:
      return state;
  }
};
