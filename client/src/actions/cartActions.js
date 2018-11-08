import { RESET_CART_ITEMS, UPDATE_CART_ITEMS, TOGGLE_CART } from './types';

export const incrementCartItems = () => {
  return { type: RESET_CART_ITEMS };
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
