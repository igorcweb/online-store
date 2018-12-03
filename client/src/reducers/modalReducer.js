import {
  TOGGLE_CHECKOUT_MODAL,
  TOGGLE_PRIME_MODAL,
  TOGGLE_ADDRESS_MODAL,
  TOGGLE_SIZE_MODAL
} from '../actions/types';

const initialState = {
  checkoutModal: false,
  primeModal: false,
  addressModal: false,
  sizeModal: false,
  checkout: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_CHECKOUT_MODAL:
      return { ...state, checkoutModal: !state.checkoutModal };
    case TOGGLE_PRIME_MODAL:
      return { ...state, primeModal: !state.primeModal };
    case TOGGLE_SIZE_MODAL:
      return { ...state, sizeModal: !state.sizeModal };
    case TOGGLE_ADDRESS_MODAL:
      return {
        ...state,
        addressModal: !state.addressModal,
        checkout: action.payload
      };
    default:
      return state;
  }
};
