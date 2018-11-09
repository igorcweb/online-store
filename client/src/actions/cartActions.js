import {
  RESET_CART_ITEMS,
  UPDATE_CART_ITEMS,
  TOGGLE_CART,
  UPDATE_CART
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
