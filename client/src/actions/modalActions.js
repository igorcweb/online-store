import {
  TOGGLE_CHECKOUT_MODAL,
  TOGGLE_PRIME_MODAL,
  TOGGLE_ADDRESS_MODAL
} from './types';

export const toggleCheckoutModal = () => {
  return {
    type: TOGGLE_CHECKOUT_MODAL
  };
};
export const togglePrimeModal = () => {
  return {
    type: TOGGLE_PRIME_MODAL
  };
};
export const toggleAddressModal = payload => {
  return {
    type: TOGGLE_ADDRESS_MODAL,
    payload
  };
};
