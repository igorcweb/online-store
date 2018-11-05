import { INCREMENT_CART_ITEMS, DECREMENT_CART_ITEMS } from './types';

export const incrementCartItems = () => {
  return { type: INCREMENT_CART_ITEMS };
};

export const decrementCartItems = () => {
  return {
    type: DECREMENT_CART_ITEMS
  };
};
