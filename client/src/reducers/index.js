import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import productReducer from './productReducer';
import userReducer from './userReducer';
import cartItemReducer from './cartItemReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  products: productReducer,
  user: userReducer,
  cart: cartItemReducer
});
