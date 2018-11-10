import { TOGGLE_CHECKOUT_MODAL, TOGGLE_PRIME_MODAL } from '../actions/types';

const initialState = {
  checkoutModal: false,
  primeModal: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_CHECKOUT_MODAL:
      return { ...state, checkoutModal: !state.checkoutModal };
    case TOGGLE_PRIME_MODAL:
      return { ...state, primeModal: !state.primeModal };
    default:
      return state;
  }
};
