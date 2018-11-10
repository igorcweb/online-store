import {
  RESET_CART_ITEMS,
  UPDATE_CART_ITEMS,
  TOGGLE_CART,
  UPDATE_CART,
  GET_FINAL_ORDER,
  GET_SUBTOTAL
} from './types';

export const resetCartItems = () => {
  return { type: RESET_CART_ITEMS };
};

export const updateCart = payload => {
  return {
    type: UPDATE_CART,
    payload
  };
};

export const updateCartItems = payload => {
  return {
    type: UPDATE_CART_ITEMS,
    payload
  };
};
export const toggleCart = () => {
  return {
    type: TOGGLE_CART
  };
};

export const getFinalOrder = payload => {
  return {
    type: GET_FINAL_ORDER,
    payload
  };
};
export const getSubtotal = payload => {
  return {
    type: GET_SUBTOTAL,
    payload
  };
};
