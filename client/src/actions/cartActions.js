import { INCREMENT_CART_ITEMS, UPDATE_CART_ITEMS } from './types';

export const incrementCartItems = () => {
  return { type: INCREMENT_CART_ITEMS };
};

export const updateCartItems = payload => {
  return {
    type: UPDATE_CART_ITEMS,
    payload
  };
};
