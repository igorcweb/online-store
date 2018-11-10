import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import productReducer from './productReducer';
import userReducer from './userReducer';
import cartReducer from './cartReducer';
import modalReducer from './modalReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  products: productReducer,
  user: userReducer,
  cart: cartReducer,
  modal: modalReducer
});
